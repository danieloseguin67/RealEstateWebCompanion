# Email Setup Instructions

## Files to Upload to GoDaddy

Upload these PHP files to `public_html/` (domain root):

```
website/php/contact.php → public_html/contact.php
website/php/email-history.php → public_html/email-history.php
website/php/PHPMailer.php → public_html/PHPMailer.php
website/php/config-smtp.php → public_html/config-smtp.php
website/php/test-email.php → public_html/test-email.php
```

## Configure Office365 SMTP Credentials

**Edit `public_html/config-smtp.php` on the server:**

1. Log into GoDaddy cPanel File Manager
2. Navigate to `public_html/config-smtp.php`
3. Click Edit
4. Find the line: `'smtp_password' => '',`
5. Get your Office365 app password:
   - Go to https://account.microsoft.com/security
   - Enable 2-factor authentication (required for app passwords)
   - Under "Advanced security options" → "App passwords"
   - Create new app password
   - Copy the generated password
6. Paste between the quotes: `'smtp_password' => 'your-app-password-here',`
7. Verify username is: `'smtp_username' => 'info@montreal4rent.com',`
8. Save the file

**IMPORTANT:** Keep `config-smtp.php` secure - it contains your email password!

## Alternative: Gmail SMTP

If you prefer using Gmail instead of Office365:

1. Edit `config-smtp.php`:
   ```php
   'smtp_host' => 'smtp.gmail.com',
   'smtp_port' => 587,
   'smtp_username' => 'yourgmail@gmail.com',
   'smtp_password' => 'your-app-password',
   ```

2. Get Gmail app password:
   - Go to https://myaccount.google.com/security
   - Enable 2FA
   - Search "App passwords"
   - Generate for "Mail"
   - Use that password in config

## Test Email Sending

After uploading and configuring:

Visit: `https://montreal4rent.com/test-email.php?test=send`

Should show:
```json
{
  "test_send": {
    "success": true,
    "to": "info@montreal4rent.com",
    "subject": "Test Email from montreal4rent.com"
  }
}
```

If successful, check `info@montreal4rent.com` inbox for the test email.

## Troubleshooting

**"SMTP credentials not configured" error:**
- Edit `config-smtp.php` and add your password

**"Authentication failed" error:**
- Wrong username/password
- Use app password, not regular password
- Enable 2FA on Microsoft/Google account first

**"Connection failed" error:**
- GoDaddy might block outbound SMTP on port 587
- Try port 465 with `'smtp_secure' => 'ssl'`
- Contact GoDaddy support to enable SMTP

**Still not working:**
- Check `public_html/history/emails/` for error logs
- Verify all 5 PHP files uploaded correctly
- Ensure PHPMailer.php is in same folder as contact.php
