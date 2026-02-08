import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface AppVersion {
  version: string;
  appName: string;
  author: string;
  company: string;
  copyright: string;
}

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
  
  supportForm: SupportForm = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<AppVersion>('assets/data/appversion.json').subscribe({
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

    const subject = encodeURIComponent(`Support Request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    
    window.location.href = `mailto:daniel@seguin.dev?subject=${subject}&body=${body}`;
    
    // Reset form after sending
    this.supportForm = {
      name: '',
      phone: '',
      email: '',
      message: ''
    };
  }
}
