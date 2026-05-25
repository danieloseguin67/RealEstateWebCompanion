import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { EmailLoggerService } from './email-logger.service';

export interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  smtpDefaultCredentials: string;
  smtpSecure: string;
  contactemail?: string;
}

export interface EmailRequest {
  fromEmail: string;
  to: string;
  subject: string;
  body: string;
  isBodyHtml: boolean;
  formType?: string;
  senderName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private configUrl = 'assets/data/emailhostserver.json';
  private emailConfig: EmailConfig | null = null;

  constructor(
    private http: HttpClient,
    private emailLogger: EmailLoggerService
  ) {
    this.loadConfig();
  }

  /**
   * Load SMTP configuration from JSON file
   */
  private loadConfig(): void {
    this.http.get<EmailConfig>(this.configUrl).subscribe({
      next: (config) => {
        this.emailConfig = config;
      },
      error: (err) => {
        console.error('Failed to load email configuration', err);
      }
    });
  }

  /**
   * Get the current email configuration
   */
  public getConfig(): EmailConfig | null {
    return this.emailConfig;
  }

  /**
   * Get the contact email address from configuration
   */
  public getContactEmail(defaultEmail: string = 'info@montreal4rent.com'): string {
    return this.emailConfig?.contactemail?.trim() || defaultEmail;
  }

  /**
   * Send email via backend API
   * Translates the C# send_email function to Angular/TypeScript
   * 
   * Note: Browsers cannot send SMTP emails directly. This method prepares
   * the email data and sends it to a backend API endpoint that handles
   * the actual SMTP transmission.
   * 
   * @param strFromEmail - Sender email address
   * @param strTo - Recipient email address
   * @param strSubject - Email subject
   * @param strBody - Email body content
   * @param formType - Type of form (e.g., 'contact', 'book-tour', 'rental-inquiry')
   * @param senderName - Name of the sender
   * @returns Observable<boolean> - true if sent successfully, false otherwise
   */
  public sendEmail(
    strFromEmail: string,
    strTo: string,
    strSubject: string,
    strBody: string,
    formType: string = 'general',
    senderName?: string
  ): Observable<boolean> {
    // Prepare the email request payload
    const emailRequest: EmailRequest = {
      fromEmail: strFromEmail,
      to: strTo,
      subject: strSubject,
      body: strBody,
      isBodyHtml: true,
      formType,
      senderName
    };

    console.log('[EmailService] Sending email to php/contact.php', emailRequest);

    // Call PHP endpoint - uses relative path to work in both root and /test/ deployments
    return this.http.post<{ success: boolean; message?: string }>(
      'php/contact.php',
      emailRequest
    ).pipe(
      tap((resp) => {
        console.log('[EmailService] Response received:', resp);
        this.emailLogger.logEmail({
          formType,
          fromEmail: strFromEmail,
          toEmail: strTo,
          subject: strSubject,
          status: resp?.success ? 'success' : 'failed',
          senderName,
          errorMessage: resp?.success ? undefined : (resp?.message || 'Send failed')
        });
      }),
      catchError((ex) => {
        console.error('[EmailService] HTTP Error:', ex);
        console.error('[EmailService] Error status:', ex.status);
        console.error('[EmailService] Error body:', ex.error);
        this.emailLogger.logEmail({
          formType,
          fromEmail: strFromEmail,
          toEmail: strTo,
          subject: strSubject,
          status: 'failed',
          errorMessage: ex?.message || 'Unknown error',
          senderName
        });
        return of(false);
      }),
      // Map the response to a boolean
      // Using a minimal inline mapping to avoid extra imports
      // resp.success => true/false
      // In case of unexpected shape, default to false
      // We rely on tap/catchError for logging
      ((source$) => new Observable<boolean>((observer) => {
        const sub = source$.subscribe({
          next: (resp: any) => {
            observer.next(!!(resp && resp.success));
            observer.complete();
          },
          error: (err) => {
            observer.next(false);
            observer.complete();
          }
        });
        return () => sub.unsubscribe();
      }))
    );
  }

  /**
   * Alternative method that returns the prepared email data
   * Useful for testing or custom backend integration
   */
  public prepareEmailData(
    strFromEmail: string,
    strTo: string,
    strSubject: string,
    strBody: string
  ): any {
    if (!this.emailConfig) {
      throw new Error('Email configuration not loaded');
    }

    return {
      fromEmail: strFromEmail,
      to: strTo,
      subject: strSubject,
      body: strBody,
      isBodyHtml: true,
      smtpConfig: {
        host: this.emailConfig.smtpHost,
        port: this.emailConfig.smtpPort,
        useDefaultCredentials: this.emailConfig.smtpDefaultCredentials === 'Y',
        enableSsl: this.emailConfig.smtpSecure === 'Y'
      }
    };
  }

  /**
   * Send a simple test email to verify the email pipeline.
   * Note: This uses the current `sendEmail` implementation, which
   * logs and returns success unless a backend API is configured.
   */
  public sendTestEmail(): Observable<boolean> {
    const to = 'daniel@seguin.dev';
    const from = this.getContactEmail('info@montreal4rent.com');
    const subject = 'Montreal4Rent: Test Email';
    const body = `
      <div>
        <p>This is a test email generated from the Montreal4Rent site.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      </div>
    `;

    return this.sendEmail(
      from,
      to,
      subject,
      body,
      'test',
      'Montreal4Rent System'
    );
  }
}
