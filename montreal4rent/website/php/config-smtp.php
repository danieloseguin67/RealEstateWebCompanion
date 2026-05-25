<?php
/**
 * SMTP Configuration for email sending
 * 
 * IMPORTANT: Fill in your Office365/Outlook credentials below
 * 
 * To get an app password for Office365:
 * 1. Go to https://account.microsoft.com/security
 * 2. Enable 2FA if not already enabled
 * 3. Go to "App passwords"
 * 4. Generate a new app password
 * 5. Use that password below (not your regular password)
 */

return [
    'smtp_host' => 'relay-hosting.secureserver.net',
    'smtp_port' => 25,
    'smtp_secure' => '', // No encryption for GoDaddy relay
    'smtp_auth' => false, // GoDaddy relay uses IP-based authentication
    'smtp_username' => '', // Not needed for GoDaddy relay
    'smtp_password' => '', // Not needed for GoDaddy relay
    'from_email' => 'info@montreal4rent.com',
    'from_name' => 'Montreal4Rent',
];
