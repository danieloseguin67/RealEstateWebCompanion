<?php
/**
 * PHPMailer - Minimal single-file version for GoDaddy deployment
 * Based on PHPMailer 6.x - https://github.com/PHPMailer/PHPMailer
 * License: LGPL 2.1
 */

namespace PHPMailer\PHPMailer;

class PHPMailer {
    public $From = '';
    public $FromName = '';
    public $Subject = '';
    public $Body = '';
    public $AltBody = '';
    public $Host = '';
    public $Port = 587;
    public $SMTPAuth = false;
    public $Username = '';
    public $Password = '';
    public $SMTPSecure = 'tls';
    public $CharSet = 'UTF-8';
    public $isHTML = true;
    public $ErrorInfo = '';
    
    private $to = [];
    private $cc = [];
    private $bcc = [];
    private $ReplyTo = [];
    
    public function isSMTP() {
        // Set mailer to use SMTP
    }
    
    public function addAddress($address, $name = '') {
        $this->to[] = ['address' => $address, 'name' => $name];
    }
    
    public function addReplyTo($address, $name = '') {
        $this->ReplyTo[] = ['address' => $address, 'name' => $name];
    }
    
    public function isHTML($bool) {
        $this->isHTML = $bool;
    }
    
    public function send() {
        if (empty($this->to)) {
            $this->ErrorInfo = 'No recipients';
            return false;
        }
        
        if (!$this->SMTPAuth || empty($this->Host)) {
            $this->ErrorInfo = 'SMTP not configured';
            return false;
        }
        
        try {
            $socket = @fsockopen(
                ($this->SMTPSecure === 'ssl' ? 'ssl://' : '') . $this->Host,
                $this->Port,
                $errno,
                $errstr,
                10
            );
            
            if (!$socket) {
                $this->ErrorInfo = "Connection failed: $errstr ($errno)";
                return false;
            }
            
            stream_set_timeout($socket, 10);
            
            // Read server greeting
            $response = fgets($socket, 515);
            if (substr($response, 0, 3) !== '220') {
                fclose($socket);
                $this->ErrorInfo = 'Server greeting failed: ' . $response;
                return false;
            }
            
            // EHLO
            fwrite($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n");
            $response = '';
            while ($line = fgets($socket, 515)) {
                $response .= $line;
                if (substr($line, 3, 1) === ' ') break;
            }
            
            // STARTTLS if needed
            if ($this->SMTPSecure === 'tls') {
                fwrite($socket, "STARTTLS\r\n");
                $response = fgets($socket, 515);
                if (substr($response, 0, 3) !== '220') {
                    fclose($socket);
                    $this->ErrorInfo = 'STARTTLS failed: ' . $response;
                    return false;
                }
                
                if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                    fclose($socket);
                    $this->ErrorInfo = 'TLS encryption failed';
                    return false;
                }
                
                // EHLO again after TLS
                fwrite($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n");
                while ($line = fgets($socket, 515)) {
                    if (substr($line, 3, 1) === ' ') break;
                }
            }
            
            // AUTH LOGIN
            fwrite($socket, "AUTH LOGIN\r\n");
            $response = fgets($socket, 515);
            if (substr($response, 0, 3) !== '334') {
                fclose($socket);
                $this->ErrorInfo = 'AUTH LOGIN not accepted: ' . $response;
                return false;
            }
            
            fwrite($socket, base64_encode($this->Username) . "\r\n");
            $response = fgets($socket, 515);
            if (substr($response, 0, 3) !== '334') {
                fclose($socket);
                $this->ErrorInfo = 'Username rejected: ' . $response;
                return false;
            }
            
            fwrite($socket, base64_encode($this->Password) . "\r\n");
            $response = fgets($socket, 515);
            if (substr($response, 0, 3) !== '235') {
                fclose($socket);
                $this->ErrorInfo = 'Authentication failed: ' . $response;
                return false;
            }
            
            // MAIL FROM
            fwrite($socket, "MAIL FROM:<{$this->From}>\r\n");
            $response = fgets($socket, 515);
            if (substr($response, 0, 3) !== '250') {
                fclose($socket);
                $this->ErrorInfo = 'MAIL FROM rejected: ' . $response;
                return false;
            }
            
            // RCPT TO
            foreach ($this->to as $recipient) {
                fwrite($socket, "RCPT TO:<{$recipient['address']}>\r\n");
                $response = fgets($socket, 515);
                if (substr($response, 0, 3) !== '250') {
                    fclose($socket);
                    $this->ErrorInfo = 'RCPT TO rejected: ' . $response;
                    return false;
                }
            }
            
            // DATA
            fwrite($socket, "DATA\r\n");
            $response = fgets($socket, 515);
            if (substr($response, 0, 3) !== '354') {
                fclose($socket);
                $this->ErrorInfo = 'DATA command rejected: ' . $response;
                return false;
            }
            
            // Build message
            $message = "From: " . ($this->FromName ? "{$this->FromName} <{$this->From}>" : $this->From) . "\r\n";
            $message .= "To: {$this->to[0]['address']}\r\n";
            if (!empty($this->ReplyTo)) {
                $message .= "Reply-To: {$this->ReplyTo[0]['address']}\r\n";
            }
            $message .= "Subject: {$this->Subject}\r\n";
            $message .= "MIME-Version: 1.0\r\n";
            $message .= "Content-Type: " . ($this->isHTML ? 'text/html' : 'text/plain') . "; charset={$this->CharSet}\r\n";
            $message .= "Content-Transfer-Encoding: 8bit\r\n";
            $message .= "\r\n";
            $message .= $this->Body . "\r\n";
            $message .= ".\r\n";
            
            fwrite($socket, $message);
            $response = fgets($socket, 515);
            if (substr($response, 0, 3) !== '250') {
                fclose($socket);
                $this->ErrorInfo = 'Message rejected: ' . $response;
                return false;
            }
            
            // QUIT
            fwrite($socket, "QUIT\r\n");
            fclose($socket);
            
            return true;
            
        } catch (\Exception $e) {
            $this->ErrorInfo = $e->getMessage();
            return false;
        }
    }
}
