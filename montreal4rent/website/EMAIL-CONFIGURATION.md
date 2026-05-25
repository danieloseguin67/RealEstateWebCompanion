# PHPMailer Email Configuration Guide

## Overview
All forms on montreal4rent.com now use PHPMailer to send emails to `info@montreal4rent.com`:
- Contact Us form
- Book a Tour modal
- Book Now buttons (from all listing pages)

## Current Setup

### Forms Updated
✅ Contact form (`contact-form.component.ts`)
✅ Book a Tour modal (`header.component.ts`)
✅ Furnished Suites booking
✅ Rooms for Rent booking
✅ Home page booking

### How It Works
1. User fills out a form
2. Angular `EmailService` sends data to `/contact.php`
3. `contact.php` uses PHPMailer to send via SMTP (Office365)
4. Email is delivered to `info@montreal4rent.com`
5. Email log is saved to `history/emails/` folder

## Required Configuration

### 1. SMTP Password Configuration

**CRITICAL**: You must add your Office365 app password to the SMTP config file.

Edit: `website/php/config-smtp.php`

```php
return [
    'smtp_host' => 'smtp.office365.com',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    'smtp_auth' => true,
    'smtp_username' => 'info@montreal4rent.com',
    'smtp_password' => 'YOUR-APP-PASSWORD-HERE', // ⚠️ ADD PASSWORD HERE
    'from_email' => 'info@montreal4rent.com',
    'from_name' => 'Montreal4Rent',
];
```

### 2. Get Office365 App Password

1. Go to https://account.microsoft.com/security
2. Sign in with `info@montreal4rent.com`
3. Enable 2-Factor Authentication (if not already enabled)
4. Go to "App passwords" section
5. Generate a new app password
6. Copy the password and paste it into `config-smtp.php`
7. Save the file

### 3. Deploy Files to GoDaddy

Upload these files to your GoDaddy hosting:

```
/contact.php
/php/
  ├── PHPMailer.php
  ├── config-smtp.php
  └── email-history.php
/history/emails/ (create this folder with write permissions)
```

### 4. Set Folder Permissions

On GoDaddy, ensure the `history/emails/` folder has write permissions:

```bash
chmod 775 history/emails
```

## Testing the Setup

### Test 1: Check PHP Configuration
Visit: `https://montreal4rent.com/php/test-email.php`

This will show:
- PHP version
- Whether mail() function is available
- Whether SMTP configuration is loaded
- Directory permissions

### Test 2: Send a Test Email

Use the Contact Form on your website or call the EmailService directly from Angular DevTools:

```javascript
// In browser console
angular.element(document.querySelector('app-root')).injector.get('EmailService').sendTestEmail().subscribe(result => console.log(result));
```

### Test 3: Check Email History

Visit: `https://montreal4rent.com/php/email-history.php`

This will show all sent emails with:
- Timestamp
- Form type
- Sender email
- Status (success/failed)
- Error messages (if any)

## Email Configuration Files

### emailhostserver.json
Location: `website/dist/montreal4rent/assets/data/emailhostserver.json`

```json
{
  "smtpHost": "smtp.office365.com",
  "smtpPort": 587,
  "smtpDefaultCredentials": "N",
  "smtpSecure": "Y",
  "contactemail": "info@montreal4rent.com"
}
```

This file is used by the Angular `EmailService` to know where to send emails.

## Email Templates

### Contact Form Email
- **Subject**: User-provided subject
- **From**: User's email
- **Reply-To**: User's email
- **To**: info@montreal4rent.com
- **Format**: HTML with styled table

### Book a Tour Email
- **Subject**: "Book a Tour - Montreal4Rent" (or "Demande de visite - Montreal4Rent")
- **From**: User's email
- **Reply-To**: User's email
- **To**: info@montreal4rent.com
- **Format**: HTML with styled table
- **Form Type**: `book-tour`

### Book Now Email
- **Subject**: "Book Now - Montreal4Rent"
- **From**: User's email
- **Reply-To**: User's email
- **To**: info@montreal4rent.com
- **Format**: HTML with styled table
- **Form Type**: `book-now`

## Troubleshooting

### Error: "SMTP not configured"
- Make sure `config-smtp.php` has your app password
- Verify the file is uploaded to GoDaddy

### Error: "Authentication failed"
- Double-check the app password in `config-smtp.php`
- Make sure you're using an app password, not your regular password
- Verify 2FA is enabled on the Office365 account

### Error: "Could not connect to SMTP host"
- Check that port 587 is not blocked by firewall
- Verify `smtp.office365.com` is reachable from your server
- Try using port 25 or 465 as alternative

### Emails not being received
- Check spam folder
- Verify `info@montreal4rent.com` is a valid mailbox
- Check email history at `/php/email-history.php`

### Permission denied errors
- Ensure `history/emails/` folder exists
- Set proper permissions: `chmod 775 history/emails`

## Security Notes

1. **Never commit** `config-smtp.php` with the password to Git
2. Keep the app password secure
3. The `contact.php` script locks emails to `info@montreal4rent.com` to prevent abuse
4. CORS is configured to allow requests from your domain only
5. Email logs are stored server-side only, not accessible to users

## Next Steps After Configuration

1. ✅ Add app password to `config-smtp.php`
2. ✅ Upload all PHP files to GoDaddy
3. ✅ Create `history/emails` folder with write permissions
4. ✅ Test with `/php/test-email.php`
5. ✅ Send test email from contact form
6. ✅ Verify email received at `info@montreal4rent.com`
7. ✅ Check email logs at `/php/email-history.php`
8. ✅ Remove test emails from inbox

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check `/php/email-history.php` for server-side logs
3. Verify all files are uploaded correctly
4. Ensure the SMTP password is correct
5. Contact GoDaddy support if server-related issues persist
