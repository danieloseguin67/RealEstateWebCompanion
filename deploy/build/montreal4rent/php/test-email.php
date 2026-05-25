<?php
// test-email.php - Diagnostic endpoint to verify server setup
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$info = [
  'php_version' => phpversion(),
  'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
  'mail_function_exists' => function_exists('mail'),
  'date_time' => gmdate('c'),
  'post_max_size' => ini_get('post_max_size'),
  'upload_max_filesize' => ini_get('upload_max_filesize'),
  'sendmail_path' => ini_get('sendmail_path'),
  'disable_functions' => ini_get('disable_functions'),
  'history_dir_exists' => is_dir(__DIR__ . '/../history/emails'),
  'history_dir_writable' => is_writable(__DIR__ . '/../history/emails'),
  'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'unknown',
  'script_filename' => __FILE__,
];

// Test sending a simple email if ?test=send is provided
if (isset($_GET['test']) && $_GET['test'] === 'send') {
  $to = 'info@montreal4rent.com';
  $subject = 'Test Email from montreal4rent.com';
  $message = 'This is a test email sent at ' . gmdate('Y-m-d H:i:s') . ' UTC';
  $headers = [
    'From: Montreal4Rent Test <info@montreal4rent.com>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
  ];
  
  $result = @mail($to, $subject, $message, implode("\r\n", $headers));
  $error = error_get_last();
  
  $info['test_send'] = [
    'success' => $result,
    'to' => $to,
    'subject' => $subject,
    'error' => $error
  ];
}

echo json_encode($info, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
