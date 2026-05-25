# Email Activity Logging

This document explains the email activity logging feature implemented for the Montreal4Rent website.

## Overview

The email logging system automatically tracks all email activities from the following forms:
- **Contact Form** (`/contact`)
- **Book a Tour Form** (Header modal)
- **Rental Inquiry Form** (`/contact`)

All email activities are logged with detailed information and can be viewed, filtered, exported, and managed through a dedicated admin interface.

## Features

### 1. Automatic Logging
Every email sent through the website is automatically logged with the following information:
- **Timestamp**: Exact date and time of the email
- **Form Type**: Which form sent the email (contact-form, book-tour, rental-inquiry)
- **Sender Name**: Name of the person who filled the form
- **From Email**: Email address of the sender
- **To Email**: Recipient email (info@montreal4rent.com)
- **Subject**: Email subject line
- **Status**: Success or Failed
- **Error Message**: If the email failed, the error details are recorded

### 2. Persistent Storage
- Logs are stored in the browser's localStorage
- Logs persist across browser sessions
- Maximum of 1000 log entries to prevent unlimited growth
- Older logs are automatically removed when the limit is reached

### 3. Admin Interface

Access the email logs at: **`http://localhost:4200/email-logs`** (or your domain + `/email-logs`)

The admin interface provides:

#### Statistics Dashboard
- Total number of emails sent
- Number of successful emails
- Number of failed emails
- Breakdown by form type

#### Filters
- Filter by form type (Contact Form, Book Tour, Rental Inquiry)
- Filter by status (Success, Failed)

#### Export Options
- **Download as JSON**: Complete log data in JSON format
- **Download as CSV**: Spreadsheet-compatible format for Excel/Google Sheets

#### Log Management
- View all email logs in a detailed table
- Refresh logs to see latest activities
- Clear all logs (with confirmation)

### 4. Real-time Logging
All email activities are logged in real-time to the browser console with formatted output:
```javascript
[Email Log] {
  time: "Feb 3, 2026, 10:30:45 AM",
  form: "contact-form",
  from: "user@example.com",
  to: "info@montreal4rent.com",
  subject: "Contact Form: Question about rentals",
  status: "success"
}
```

## Implementation Details

### Services

#### EmailLoggerService
Located at: `src/app/services/email-logger.service.ts`

Key methods:
- `logEmail()`: Log a new email activity
- `getAllLogs()`: Retrieve all logs
- `getFilteredLogs()`: Get logs with filters
- `exportLogsAsJSON()`: Export as JSON string
- `exportLogsAsCSV()`: Export as CSV string
- `downloadLogs()`: Trigger file download
- `clearLogs()`: Clear all logs
- `getStatistics()`: Get aggregated statistics

#### EmailService (Updated)
Located at: `src/app/services/email.service.ts`

Updated to:
- Accept `formType` and `senderName` parameters
- Automatically log all email activities
- Log both successful and failed email attempts

### Components Updated

1. **ContactFormComponent** (`contact-form.component.ts`)
   - Logs with formType: `'contact-form'`

2. **HeaderComponent** (`header.component.ts`)
   - Logs with formType: `'book-tour'`

3. **ContactComponent** (`contact.component.ts`)
   - Logs with formType: `'rental-inquiry'`

### New Component

**EmailLogsComponent** (`email-logs/email-logs.component.ts`)
- Standalone component for viewing and managing email logs
- Accessible at route: `/email-logs`

## Usage Examples

### Viewing Email Logs

1. Navigate to `http://localhost:4200/email-logs`
2. View statistics and all email activities
3. Use filters to narrow down specific emails
4. Export logs for record-keeping

### Exporting Logs

**JSON Export**:
```json
[
  {
    "timestamp": "2026-02-03T15:30:45.123Z",
    "formType": "contact-form",
    "fromEmail": "john@example.com",
    "toEmail": "info@montreal4rent.com",
    "subject": "Contact Form: Rental Inquiry",
    "status": "success",
    "senderName": "John Doe"
  }
]
```

**CSV Export**:
```csv
Timestamp,Form Type,From Email,To Email,Subject,Status,Sender Name,Error Message
"2026-02-03T15:30:45.123Z","contact-form","john@example.com","info@montreal4rent.com","Contact Form: Rental Inquiry","success","John Doe",""
```

### Programmatic Access

Developers can access the logging service programmatically:

```typescript
import { EmailLoggerService } from './services/email-logger.service';

constructor(private emailLogger: EmailLoggerService) {}

// Get all logs
const allLogs = this.emailLogger.getAllLogs();

// Get filtered logs
const failedEmails = this.emailLogger.getFilteredLogs({ 
  status: 'failed' 
});

// Get statistics
const stats = this.emailLogger.getStatistics();
console.log(`Total emails: ${stats.total}`);
console.log(`Success rate: ${(stats.successful / stats.total * 100).toFixed(2)}%`);
```

## Security Considerations

1. **Access Control**: The `/email-logs` route is publicly accessible. In production, you should:
   - Add authentication/authorization
   - Restrict access to admin users only
   - Consider server-side logging instead of client-side

2. **Data Privacy**: Email logs contain personal information:
   - Implement data retention policies
   - Consider GDPR compliance
   - Avoid logging sensitive content

3. **Storage Limits**: 
   - Current limit: 1000 entries
   - Adjust based on your needs
   - Consider moving to server-side storage for larger volumes

## Future Enhancements

Potential improvements:
1. Server-side logging with database storage
2. Authentication for accessing logs
3. Email notifications for failed emails
4. Advanced analytics and reporting
5. Date range filters
6. Search functionality
7. Automatic log rotation and archival

## Troubleshooting

### Logs Not Appearing
- Check browser console for errors
- Ensure localStorage is enabled
- Verify email service is being called

### Export Not Working
- Check browser's download settings
- Ensure pop-ups are not blocked
- Try different file format (JSON vs CSV)

### Logs Disappearing
- Check if browser is in private/incognito mode
- Verify localStorage quota hasn't been exceeded
- Check if logs were manually cleared

## Files Modified/Created

**Created:**
- `src/app/services/email-logger.service.ts`
- `src/app/components/email-logs/email-logs.component.ts`

**Modified:**
- `src/app/services/email.service.ts`
- `src/app/components/contact-form/contact-form.component.ts`
- `src/app/components/header/header.component.ts`
- `src/app/components/contact/contact.component.ts`
- `src/app/app.routes.ts`

## Support

For questions or issues with the email logging feature, please check:
1. Browser console for error messages
2. Email logs page for failed email attempts
3. This documentation for usage examples
