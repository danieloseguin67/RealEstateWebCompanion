import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailLoggerService, EmailLogEntry } from '../../services/email-logger.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="email-logs-container">
      <div class="logs-header">
        <h2>Email Activity Logs</h2>
        <div class="header-actions">
          <button class="btn btn-primary" (click)="refreshLogs()">
            🔄 Refresh
          </button>
          <button class="btn btn-success" (click)="downloadLogs('json')">
            📥 Download JSON
          </button>
          <button class="btn btn-success" (click)="downloadLogs('csv')">
            📥 Download CSV
          </button>
          <button class="btn btn-danger" (click)="clearLogs()" *ngIf="logs.length > 0">
            🗑️ Clear All Logs
          </button>
        </div>
      </div>

      <!-- Statistics -->
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-value">{{ statistics.total }}</div>
          <div class="stat-label">Total Emails</div>
        </div>
        <div class="stat-card success">
          <div class="stat-value">{{ statistics.successful }}</div>
          <div class="stat-label">Successful</div>
        </div>
        <div class="stat-card danger">
          <div class="stat-value">{{ statistics.failed }}</div>
          <div class="stat-label">Failed</div>
        </div>
      </div>

      <!-- By Form Type -->
      <div class="form-type-stats" *ngIf="Object.keys(statistics.byFormType).length > 0">
        <h3>Emails by Form Type</h3>
        <div class="form-stats-grid">
          <div class="form-stat" *ngFor="let formType of Object.keys(statistics.byFormType)">
            <span class="form-type-name">{{ formType }}</span>
            <span class="form-type-count">{{ statistics.byFormType[formType] }}</span>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters-container">
        <h3>Filters</h3>
        <div class="filters-grid">
          <div class="filter-group">
            <label>Form Type:</label>
            <select [(ngModel)]="filterFormType" (change)="applyFilters()">
              <option value="">All</option>
              <option value="contact-form">Contact Form</option>
              <option value="book-tour">Book Tour</option>
              <option value="rental-inquiry">Rental Inquiry</option>
              <option value="share">Share Listing</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Status:</label>
            <select [(ngModel)]="filterStatus" (change)="applyFilters()">
              <option value="">All</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Logs Table -->
      <div class="logs-table-container">
        <table class="logs-table" *ngIf="filteredLogs.length > 0">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Form Type</th>
              <th>Sender Name</th>
              <th>From Email</th>
              <th>To Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let log of filteredLogs" [class.failed]="log.status === 'failed'">
              <td>{{ formatDate(log.timestamp) }}</td>
              <td><span class="badge">{{ log.formType }}</span></td>
              <td>{{ log.senderName || '-' }}</td>
              <td>{{ log.fromEmail }}</td>
              <td>{{ log.toEmail }}</td>
              <td class="subject-cell">{{ log.subject }}</td>
              <td>
                <span class="status-badge" [class.success]="log.status === 'success'" [class.failed]="log.status === 'failed'">
                  {{ log.status }}
                </span>
              </td>
              <td class="error-cell">{{ log.errorMessage || '-' }}</td>
            </tr>
          </tbody>
        </table>
        <div class="no-logs" *ngIf="filteredLogs.length === 0">
          <p>No email logs found{{ filterFormType || filterStatus ? ' matching the selected filters' : '' }}.</p>
        </div>
      </div>

      <!-- Server Email History -->
      <div class="history-container">
        <div class="history-header">
          <h3>Server Email History</h3>
          <div class="header-actions">
            <button class="btn btn-primary" (click)="loadServerHistory()">🔄 Load History</button>
          </div>
        </div>

        <div *ngIf="historyLoading" class="loading">Loading server history…</div>

        <table class="logs-table" *ngIf="serverHistory.length > 0">
          <thead>
            <tr>
              <th>Saved</th>
              <th>Form</th>
              <th>Sender</th>
              <th>To</th>
              <th>Subject</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let h of serverHistory">
              <td>{{ formatDate(h.mtime) }}</td>
              <td><span class="badge">{{ h.formType || '-' }}</span></td>
              <td>{{ h.fromEmail || '-' }}</td>
              <td>{{ h.toEmail || '-' }}</td>
              <td class="subject-cell">{{ h.subject || h.file }}</td>
              <td>{{ h.size | number }} B</td>
              <td>
                <button class="btn btn-success" (click)="downloadHistory(h.file)">📥 Download</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="no-logs" *ngIf="!historyLoading && serverHistory.length === 0">
          <p>No server history files found. Click Load History to refresh.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .email-logs-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .logs-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      flex-wrap: wrap;
      gap: 15px;
    }

    .logs-header h2 {
      margin: 0;
      color: #333;
    }

    .header-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .btn-success {
      background-color: #28a745;
      color: white;
    }

    .btn-success:hover {
      background-color: #218838;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }

    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }

    .stat-card.success {
      border-left: 4px solid #28a745;
    }

    .stat-card.danger {
      border-left: 4px solid #dc3545;
    }

    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .stat-label {
      color: #666;
      font-size: 14px;
    }

    .form-type-stats {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .form-type-stats h3 {
      margin-top: 0;
      color: #333;
    }

    .form-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .form-stat {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
    }

    .form-type-name {
      font-weight: 500;
      color: #333;
    }

    .form-type-count {
      background: #007bff;
      color: white;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }

    .filters-container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }

    .filters-container h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #333;
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
    }

    .filter-group label {
      margin-bottom: 5px;
      font-weight: 500;
      color: #555;
    }

    .filter-group select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .logs-table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow-x: auto;
    }

    .logs-table {
      width: 100%;
      border-collapse: collapse;
    }

    .logs-table thead {
      background-color: #f8f9fa;
    }

    .logs-table th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #dee2e6;
    }

    .logs-table td {
      padding: 12px;
      border-bottom: 1px solid #dee2e6;
      color: #555;
    }

    .logs-table tbody tr:hover {
      background-color: #f8f9fa;
    }

    .logs-table tbody tr.failed {
      background-color: #fff5f5;
    }

    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      background-color: #e9ecef;
      color: #495057;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.success {
      background-color: #d4edda;
      color: #155724;
    }

    .status-badge.failed {
      background-color: #f8d7da;
      color: #721c24;
    }

    .subject-cell {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .error-cell {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #dc3545;
      font-size: 12px;
    }

    .no-logs {
      padding: 40px;
      text-align: center;
      color: #666;
    }

    .no-logs p {
      margin: 0;
      font-size: 16px;
    }

    .history-container {
      margin-top: 30px;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .loading {
      padding: 10px;
      color: #555;
    }
  `]
})
export class EmailLogsComponent implements OnInit {
  logs: EmailLogEntry[] = [];
  filteredLogs: EmailLogEntry[] = [];
  statistics: any = {};
  filterFormType = '';
  filterStatus = '';
  serverHistory: any[] = [];
  historyLoading = false;

  // Make Object available in template
  Object = Object;

  constructor(private emailLogger: EmailLoggerService) {}

  ngOnInit(): void {
    this.refreshLogs();
    this.loadServerHistory();
  }

  refreshLogs(): void {
    this.logs = this.emailLogger.getAllLogs();
    this.statistics = this.emailLogger.getStatistics();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredLogs = this.emailLogger.getFilteredLogs({
      formType: this.filterFormType || undefined,
      status: this.filterStatus as 'success' | 'failed' | undefined
    });
  }

  downloadLogs(format: 'json' | 'csv'): void {
    this.emailLogger.downloadLogs(format);
  }

  clearLogs(): void {
    if (confirm('Are you sure you want to clear all email logs? This action cannot be undone.')) {
      this.emailLogger.clearLogs();
      this.refreshLogs();
    }
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Server history helpers
  loadServerHistory(): void {
    this.historyLoading = true;
    this.emailLogger.fetchServerEmailHistory(200).subscribe({
      next: (items) => {
        this.serverHistory = items || [];
        this.historyLoading = false;
      },
      error: () => {
        this.serverHistory = [];
        this.historyLoading = false;
      }
    });
  }

  downloadHistory(fileName: string): void {
    this.emailLogger.downloadServerEmailHistoryFile(fileName);
  }
}
