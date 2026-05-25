<?php
// test-php-config.php - Diagnostic script
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$result = [
    'phpVersion' => phpversion(),
    'tests' => []
];

// Test 1: Can we load PHPMailer?
try {
    require_once __DIR__ . '/PHPMailer.php';
    $result['tests']['phpmailer_load'] = 'OK - PHPMailer.php loaded';
} catch (Exception $e) {
    $result['tests']['phpmailer_load'] = 'FAILED: ' . $e->getMessage();
}

// Test 2: Does config-smtp.php exist and is readable?
$configPath = __DIR__ . '/config-smtp.php';
if (file_exists($configPath)) {
    $result['tests']['config_exists'] = 'OK - config-smtp.php found';
    
    try {
        $smtpConfig = require $configPath;
        $result['tests']['config_readable'] = 'OK - Config loaded';
        $result['tests']['smtp_password_set'] = empty($smtpConfig['smtp_password']) ? 'FAILED: Password is empty!' : 'OK - Password is set';
        $result['smtpConfig'] = [
            'host' => $smtpConfig['smtp_host'] ?? 'NOT SET',
            'port' => $smtpConfig['smtp_port'] ?? 'NOT SET',
            'username' => $smtpConfig['smtp_username'] ?? 'NOT SET',
            'password_length' => strlen($smtpConfig['smtp_password'] ?? ''),
            'from_email' => $smtpConfig['from_email'] ?? 'NOT SET'
        ];
    } catch (Exception $e) {
        $result['tests']['config_readable'] = 'FAILED: ' . $e->getMessage();
    }
} else {
    $result['tests']['config_exists'] = 'FAILED: config-smtp.php not found at ' . $configPath;
}

// Test 3: Check if we can create PHPMailer instance
try {
    $mail = new \PHPMailer\PHPMailer\PHPMailer(false);
    $result['tests']['phpmailer_instance'] = 'OK - PHPMailer instance created';
} catch (Exception $e) {
    $result['tests']['phpmailer_instance'] = 'FAILED: ' . $e->getMessage();
}

// Test 4: Check directory permissions
$result['tests']['directory'] = __DIR__;
$result['tests']['writable'] = is_writable(__DIR__) ? 'YES' : 'NO';

echo json_encode($result, JSON_PRETTY_PRINT);
