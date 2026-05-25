<?php
// contact.php - Email sender using PHPMailer + Office365 SMTP
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to user
ini_set('log_errors', 1);

require_once __DIR__ . '/PHPMailer.php';

use PHPMailer\PHPMailer\PHPMailer;

// Add CORS headers for Angular app (especially from subfolders)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

function respond($success, $message = '', $status = 200, $debug = null) {
  http_response_code($success ? 200 : ($status ?: 500));
  $response = ['success' => $success, 'message' => $message];
  if ($debug !== null && !$success) {
    $response['debug'] = $debug;
  }
  echo json_encode($response, JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(false, 'Method not allowed', 405);
}

// Try to load SMTP configuration
$smtpConfigFile = __DIR__ . '/config-smtp.php';
$useSMTP = false;
$smtpConfig = null;

if (file_exists($smtpConfigFile)) {
  $smtpConfig = require $smtpConfigFile;
  // Only use SMTP if password is configured
  if (!empty($smtpConfig['smtp_password'])) {
    $useSMTP = true;
  }
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  // Fallback to form-encoded
  $data = $_POST;
}

// Validate we received data
if (empty($data)) {
  respond(false, 'No data received', 400, ['raw_input_length' => strlen($raw)]);
}

$fromEmail = trim($data['fromEmail'] ?? '');
$to = trim($data['to'] ?? '');
$subject = trim($data['subject'] ?? '');
$body = $data['body'] ?? '';
$isHtml = !!($data['isBodyHtml'] ?? true);
$formType = trim($data['formType'] ?? 'general');
$senderName = trim($data['senderName'] ?? '');
$shareTo = trim($data['shareTo'] ?? '');   // friend's email for share-listing flow

// Lock recipient to the site inbox to avoid abuse.
// Exception: share-listing sends to the friend (shareTo) and CCs the agent.
$allowedRecipient = 'info@montreal4rent.com';
$isShare = ($formType === 'share') && filter_var($shareTo, FILTER_VALIDATE_EMAIL);
if (!$isShare && strcasecmp($to, $allowedRecipient) !== 0) {
  $to = $allowedRecipient;
}

if ($subject === '') {
  $subject = 'Montreal4Rent - New Contact Form Submission';
}

// Basic validation
if ($fromEmail === '' || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
  // We still allow sending, but set reply-to omitted; do not expose raw errors
  $fromEmail = '';
}

// Build headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: ' . ($isHtml ? 'text/html' : 'text/plain') . '; charset=UTF-8';
$headers[] = 'From: Montreal4Rent <'.$allowedRecipient.'>';
if ($fromEmail !== '') {
  $headers[] = 'Reply-To: '.$fromEmail;
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Ensure body is safe-ish
$bodyToSend = $isHtml ? $body : htmlspecialchars($body, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

$ok = false;
$mailError = null;
$method = 'unknown';

if ($useSMTP) {
  // Try SMTP via PHPMailer
  $mail = new PHPMailer(false);
  
  try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = $smtpConfig['smtp_host'];
    $mail->SMTPAuth = $smtpConfig['smtp_auth'];
    $mail->Username = $smtpConfig['smtp_username'];
    $mail->Password = $smtpConfig['smtp_password'];
    $mail->SMTPSecure = $smtpConfig['smtp_secure'];
    $mail->Port = $smtpConfig['smtp_port'];
    $mail->CharSet = 'UTF-8';

    // Recipients
    $mail->From = $smtpConfig['from_email'];
    $mail->FromName = $smtpConfig['from_name'];
    if ($isShare) {
      $mail->addAddress($shareTo);          // Friend receives the email
      $mail->addCC($allowedRecipient);      // Agent stays in the loop
    } else {
      $mail->addAddress($to);
    }
    
    if ($fromEmail !== '') {
      $mail->addReplyTo($fromEmail, $senderName ?: '');
    }

    // Content
    $mail->isHTML($isHtml);
    $mail->Subject = $subject;
    $mail->Body = $bodyToSend;

    $ok = $mail->send();
    $method = 'SMTP';
    
    if (!$ok) {
      throw new \Exception($mail->ErrorInfo);
    }

  } catch (\Exception $e) {
    $ok = false;
    $mailError = $e->getMessage();
    $method = 'SMTP (failed)';
  }
} else {
  // Fallback to PHP mail() function
  $headers = [];
  $headers[] = 'MIME-Version: 1.0';
  $headers[] = 'Content-type: ' . ($isHtml ? 'text/html' : 'text/plain') . '; charset=UTF-8';
  $headers[] = 'From: Montreal4Rent <'.$allowedRecipient.'>';
  if ($fromEmail !== '') {
    $headers[] = 'Reply-To: '.$fromEmail;
  }
  if ($isShare) {
    $headers[] = 'Cc: ' . $allowedRecipient;   // Agent CC on share emails
  }
  $headers[] = 'X-Mailer: PHP/' . phpversion();

  $mailTo = $isShare ? $shareTo : $to;
  $ok = @mail($mailTo, $subject, $bodyToSend, implode("\r\n", $headers));
  $method = 'PHP mail()';
  
  if (!$ok) {
    $error = error_get_last();
    $mailError = $error ? $error['message'] : 'mail() returned false';
  }
}

// Best-effort server-side log
try {
  $log = [
    'timestamp' => gmdate('c'),
    'formType' => $formType,
    'fromEmail' => $fromEmail,
    'toEmail' => $isShare ? $shareTo : $to,
    'subject' => $subject,
    'status' => $ok ? 'success' : 'failed',
    'senderName' => $senderName,
    'mailError' => $ok ? null : ($mailError ?? 'Unknown error')
  ];
  $dir = realpath(__DIR__ . '/../history/emails');
  if ($dir === false) {
    $dir = __DIR__ . '/../history/emails';
    @mkdir($dir, 0775, true);
  }
  $fname = $dir . '/' . gmdate('Ymd_His') . '_' . substr(bin2hex(random_bytes(4)), 0, 8) . '.json';
  @file_put_contents($fname, json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
} catch (Throwable $e) {
  // Ignore logging failures
}

if ($ok) {
  respond(true, "Email sent via $method");
} else {
  $errorMsg = "Email send failed via $method";
  if (isset($mailError)) {
    $errorMsg .= ': ' . $mailError;
  }
  
  $debugInfo = [
    'method' => $method,
    'from' => $fromEmail,
    'to' => $to,
    'subject' => $subject
  ];
  
  if (!$useSMTP) {
    $debugInfo['hint'] = 'SMTP not configured. Upload config-smtp.php with credentials for better reliability.';
  } else if ($smtpConfig) {
    $debugInfo['smtp_host'] = $smtpConfig['smtp_host'];
    $debugInfo['smtp_port'] = $smtpConfig['smtp_port'];
  }
  
  respond(false, $errorMsg, 500, $debugInfo);
}
