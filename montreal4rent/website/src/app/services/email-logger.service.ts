import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface EmailLogEntry {
  timestamp: string;
  formType: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  status: 'success' | 'failed';
  errorMessage?: string;
  senderName?: string;
}

export interface ServerEmailHistoryEntry {
  file: string;
  size: number;
  mtime: string;
  subject?: string;
  toEmail?: string;
  fromEmail?: string;
  formType?: string;
  status?: 'success' | 'failed';
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailLoggerService {
  private logEntries: EmailLogEntry[] = [];
  private readonly LOG_STORAGE_KEY = 'montreal4rent_email_logs';
  private readonly MAX_LOG_ENTRIES = 1000; // Prevent unlimited growth
  private readonly HISTORY_ENDPOINT = environment.production ? '/email-history.php' : '/api/email-history';

  constructor(private http: HttpClient) {
    this.loadLogsFromStorage();
  }

  /**
   * Log an email activity
   */
  logEmail(entry: Omit<EmailLogEntry, 'timestamp'>): void {
    const logEntry: EmailLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };

    this.logEntries.push(logEntry);

    // Trim old logs if exceeding max entries
    if (this.logEntries.length > this.MAX_LOG_ENTRIES) {
      this.logEntries = this.logEntries.slice(-this.MAX_LOG_ENTRIES);
    }

    // Save to localStorage
    this.saveLogsToStorage();

    // Also log to console for debugging
    console.log('[Email Log]', {
      time: new Date(logEntry.timestamp).toLocaleString(),
      form: logEntry.formType,
      from: logEntry.fromEmail,
      to: logEntry.toEmail,
      subject: logEntry.subject,
      status: logEntry.status
    });

    // Persist each email log as an individual history file (best-effort)
    // Dev: hits local Node /api/email-history; Prod: PHP /email-history.php
    this.http.post(this.HISTORY_ENDPOINT, logEntry, { responseType: 'text' as 'json' })
      .subscribe({
        error: (err) => {
          // Silently ignore to avoid breaking UX
        }
      });
  }

  /**
   * Fetch server-side email history list (most recent first)
   */
  fetchServerEmailHistory(limit: number = 200) {
    const clamped = Math.max(1, Math.min(1000, limit));
    return this.http.get<ServerEmailHistoryEntry[]>(`${this.HISTORY_ENDPOINT}?limit=${clamped}`);
  }

  /**
   * Download a specific server-side email history file
   */
  downloadServerEmailHistoryFile(fileName: string): void {
    const base = environment.production ? '/email-history.php' : '/api/email-history/file';
    const url = environment.production ? `${base}?file=${encodeURIComponent(fileName)}` : `${base}/${encodeURIComponent(fileName)}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }

  /**
   * Get all log entries
   */
  getAllLogs(): EmailLogEntry[] {
    return [...this.logEntries];
  }

  /**
   * Get logs filtered by criteria
   */
  getFilteredLogs(filter: {
    formType?: string;
    status?: 'success' | 'failed';
    startDate?: Date;
    endDate?: Date;
  }): EmailLogEntry[] {
    return this.logEntries.filter(entry => {
      if (filter.formType && entry.formType !== filter.formType) {
        return false;
      }
      if (filter.status && entry.status !== filter.status) {
        return false;
      }
      if (filter.startDate) {
        const entryDate = new Date(entry.timestamp);
        if (entryDate < filter.startDate) {
          return false;
        }
      }
      if (filter.endDate) {
        const entryDate = new Date(entry.timestamp);
        if (entryDate > filter.endDate) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Export logs as JSON string
   */
  exportLogsAsJSON(): string {
    return JSON.stringify(this.logEntries, null, 2);
  }

  /**
   * Export logs as CSV string
   */
  exportLogsAsCSV(): string {
    if (this.logEntries.length === 0) {
      return 'No logs available';
    }

    const headers = ['Timestamp', 'Form Type', 'From Email', 'To Email', 'Subject', 'Status', 'Sender Name', 'Error Message'];
    const rows = this.logEntries.map(entry => [
      entry.timestamp,
      entry.formType,
      entry.fromEmail,
      entry.toEmail,
      entry.subject,
      entry.status,
      entry.senderName || '',
      entry.errorMessage || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    return csvContent;
  }

  /**
   * Download logs as a file
   */
  downloadLogs(format: 'json' | 'csv' = 'json'): void {
    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'csv') {
      content = this.exportLogsAsCSV();
      filename = `email-logs-${this.getFormattedDate()}.csv`;
      mimeType = 'text/csv';
    } else {
      content = this.exportLogsAsJSON();
      filename = `email-logs-${this.getFormattedDate()}.json`;
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logEntries = [];
    this.saveLogsToStorage();
  }

  /**
   * Get statistics about email logs
   */
  getStatistics(): {
    total: number;
    successful: number;
    failed: number;
    byFormType: { [key: string]: number };
  } {
    const stats = {
      total: this.logEntries.length,
      successful: 0,
      failed: 0,
      byFormType: {} as { [key: string]: number }
    };

    this.logEntries.forEach(entry => {
      if (entry.status === 'success') {
        stats.successful++;
      } else {
        stats.failed++;
      }

      stats.byFormType[entry.formType] = (stats.byFormType[entry.formType] || 0) + 1;
    });

    return stats;
  }

  /**
   * Save logs to localStorage
   */
  private saveLogsToStorage(): void {
    try {
      localStorage.setItem(this.LOG_STORAGE_KEY, JSON.stringify(this.logEntries));
    } catch (error) {
      console.error('Failed to save email logs to localStorage:', error);
    }
  }

  /**
   * Load logs from localStorage
   */
  private loadLogsFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.LOG_STORAGE_KEY);
      if (stored) {
        this.logEntries = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load email logs from localStorage:', error);
      this.logEntries = [];
    }
  }

  /**
   * Get formatted date for filenames
   */
  private getFormattedDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }
}
