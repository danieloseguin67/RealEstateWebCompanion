<?php
// share-listing.php — Send a listing share email to a friend, CC the agent
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

require_once __DIR__ . '/PHPMailer.php';

use PHPMailer\PHPMailer\PHPMailer;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

function respond($success, $message = '', $status = 200) {
    http_response_code($success ? 200 : ($status ?: 500));
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed', 405);
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}
if (empty($data)) {
    respond(false, 'No data received', 400);
}

$friendEmail  = trim($data['friendEmail']  ?? '');
$subject      = trim($data['subject']      ?? 'Recommended listing on Montreal4Rent');
$body         = $data['body']              ?? '';
$listingTitle = trim($data['listingTitle'] ?? 'Listing');
$listingUrl   = trim($data['listingUrl']   ?? '');

$agentEmail = 'info@montreal4rent.com';

if (!filter_var($friendEmail, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Invalid email address', 400);
}

// Try to load SMTP configuration
$smtpConfigFile = __DIR__ . '/config-smtp.php';
$useSMTP   = false;
$smtpConfig = null;

if (file_exists($smtpConfigFile)) {
    $smtpConfig = require $smtpConfigFile;
    if (!empty($smtpConfig['smtp_password'])) {
        $useSMTP = true;
    }
}

$ok        = false;
$mailError = null;

if ($useSMTP) {
    $mail = new PHPMailer(false);
    try {
        $mail->isSMTP();
        $mail->Host       = $smtpConfig['smtp_host'];
        $mail->SMTPAuth   = $smtpConfig['smtp_auth'];
        $mail->Username   = $smtpConfig['smtp_username'];
        $mail->Password   = $smtpConfig['smtp_password'];
        $mail->SMTPSecure = $smtpConfig['smtp_secure'];
        $mail->Port       = $smtpConfig['smtp_port'];
        $mail->CharSet    = 'UTF-8';

        $mail->From     = $smtpConfig['from_email'];
        $mail->FromName = $smtpConfig['from_name'] ?? 'Montreal4Rent';

        $mail->addAddress($friendEmail);
        $mail->addCC($agentEmail);   // Keep agent in the loop

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->AltBody = "Listing shared: {$listingTitle}\n{$listingUrl}";

        $ok = $mail->send();
        if (!$ok) {
            throw new \Exception($mail->ErrorInfo);
        }
    } catch (\Exception $e) {
        $ok        = false;
        $mailError = $e->getMessage();
    }
} else {
    // Fallback to PHP mail()
    $headers   = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    $headers[] = 'From: Montreal4Rent <' . $agentEmail . '>';
    $headers[] = 'Cc: ' . $agentEmail;
    $headers[] = 'X-Mailer: PHP/' . phpversion();

    $ok = @mail($friendEmail, $subject, $body, implode("\r\n", $headers));
    if (!$ok) {
        $error     = error_get_last();
        $mailError = $error ? $error['message'] : 'mail() returned false';
    }
}

if ($ok) {
    respond(true, 'Email sent successfully');
} else {
    respond(false, 'Failed to send email: ' . ($mailError ?: 'Unknown error'));
}
