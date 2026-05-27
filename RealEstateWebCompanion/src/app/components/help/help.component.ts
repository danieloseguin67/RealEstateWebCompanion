import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService, AppVersion } from '../../services/api.service';

interface SupportForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-help',
  imports: [CommonModule, FormsModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent implements OnInit {
  activeTab: 'about' | 'support' = 'about';
  appVersion: AppVersion | null = null;
  isSubmittingSupport = false;
  supportSubmitMessage = '';
  supportSubmitState: 'success' | 'error' | null = null;
  
  supportForm: SupportForm = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAppVersion().subscribe({
      next: (data) => this.appVersion = data,
      error: (err) => console.error('Failed to load version info:', err)
    });
  }

  setActiveTab(tab: 'about' | 'support'): void {
    this.activeTab = tab;
  }

  submitSupport(): void {
    const { name, phone, email, message } = this.supportForm;
    
    if (!name || !email || !message) {
      alert('Please fill in all required fields (Name, Email, and Message)');
      return;
    }

    if (this.isSubmittingSupport) {
      return;
    }

    this.isSubmittingSupport = true;
    this.supportSubmitMessage = '';
    this.supportSubmitState = null;

    this.apiService.sendSupportEmail({
      name: name.trim(),
      phone: phone?.trim() ?? '',
      email: email.trim(),
      message: message.trim()
    }).subscribe({
      next: () => {
        this.supportSubmitState = 'success';
        this.supportSubmitMessage = 'Support request sent successfully.';
        this.supportForm = {
          name: '',
          phone: '',
          email: '',
          message: ''
        };
        this.isSubmittingSupport = false;
      },
      error: (err) => {
        this.supportSubmitState = 'error';
        this.supportSubmitMessage = this.getSupportErrorMessage(err);
        this.isSubmittingSupport = false;
      }
    });
  }

  private getSupportErrorMessage(err: unknown): string {
    const defaultMessage = 'Failed to send support request. Please try again.';

    if (!(err instanceof HttpErrorResponse)) {
      return defaultMessage;
    }

    if (err.status === 0) {
      return 'Could not reach the API server. Make sure the Web API is running locally.';
    }

    if (typeof err.error === 'string' && err.error.trim()) {
      return err.error;
    }

    if (err.error && typeof err.error === 'object') {
      const title = (err.error as { title?: string }).title;
      if (title) {
        return title;
      }

      const errors = (err.error as { errors?: Record<string, string[]> }).errors;
      if (errors) {
        const messages = Object.values(errors).flat();
        if (messages.length > 0) {
          return messages.join(' ');
        }
      }
    }

    if (err.message) {
      return err.message;
    }

    return defaultMessage;
  }
}
