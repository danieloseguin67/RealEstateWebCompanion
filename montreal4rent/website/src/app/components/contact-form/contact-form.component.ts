import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  formData: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitted = false;
  sending = false;
  successMessage = '';
  errorMessage = '';

  constructor(private emailService: EmailService, private router: Router) {}

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Validate all fields are filled
    if (this.isFormValid()) {
      this.sending = true;

      // Prepare email body with HTML formatting
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${this.formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${this.formData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Subject:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${this.formData.subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #007bff;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; color: #555;">${this.formData.message}</p>
          </div>
        </div>
      `;
      
      // Send email via backend PHP service
      this.emailService.sendEmail(
        this.formData.email,
        'info@montreal4rent.com',
        this.formData.subject,
        emailBody,
        'contact',
        this.formData.name
      ).subscribe({
        next: (success) => {
          this.sending = false;
          if (success) {
            this.successMessage = 'Your message has been sent successfully! We will get back to you soon.';
            this.resetForm();
            setTimeout(() => this.router.navigate(['/']), 3000);
          } else {
            this.errorMessage = 'There was an error sending your message. Please try again later.';
          }
        },
        error: (err) => {
          this.sending = false;
          this.errorMessage = 'There was an error sending your message. Please try again later.';
          console.error('Email send error:', err);
        }
      });
    }
  }

  isFormValid(): boolean {
    return !!(
      this.formData.name.trim() &&
      this.formData.email.trim() &&
      this.formData.subject.trim() &&
      this.formData.message.trim() &&
      this.isEmailValid()
    );
  }

  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.formData.email);
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    this.submitted = false;
  }

  // Helper methods for validation display
  isFieldInvalid(field: keyof ContactFormData): boolean {
    return this.submitted && !this.formData[field].trim();
  }

  isEmailInvalid(): boolean {
    return this.submitted && (!this.formData.email.trim() || !this.isEmailValid());
  }
}
