import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private isInitialized = false;
  private isSignedIn = false;

  // Replace with your actual Google API credentials
  private CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
  private API_KEY = 'YOUR_API_KEY';
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
  private SCOPES = 'https://www.googleapis.com/auth/drive.file';

  constructor() { }

  async initClient(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof gapi === 'undefined') {
        reject('Google API not loaded');
        return;
      }

      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPES
          });
          this.isInitialized = true;
          this.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async signIn(): Promise<void> {
    if (!this.isInitialized) {
      await this.initClient();
    }
    return gapi.auth2.getAuthInstance().signIn();
  }

  async signOut(): Promise<void> {
    if (this.isInitialized) {
      return gapi.auth2.getAuthInstance().signOut();
    }
  }

  async uploadFile(fileName: string, content: string, mimeType = 'application/json'): Promise<any> {
    if (!this.isSignedIn) {
      await this.signIn();
    }

    const file = new Blob([content], { type: mimeType });
    const metadata = {
      name: fileName,
      mimeType: mimeType
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + gapi.auth.getToken().access_token }),
      body: form
    });

    return response.json();
  }

  async downloadFile(fileId: string): Promise<any> {
    if (!this.isSignedIn) {
      await this.signIn();
    }

    const response = await gapi.client.drive.files.get({
      fileId: fileId,
      alt: 'media'
    });

    return response.result;
  }

  async listFiles(query = "name contains '.json'"): Promise<any> {
    if (!this.isSignedIn) {
      await this.signIn();
    }

    const response = await gapi.client.drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, modifiedTime)',
      q: query
    });

    return response.result.files;
  }

  exportData(data: any): void {
    // Export only apartments array (without wrapper object)
    const exportData = data.apartments || data;
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `apartments_listings.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  importDataFromFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const data = JSON.parse(e.target.result);
          resolve(data);
        } catch (error) {
          reject('Invalid JSON file');
        }
      };
      reader.onerror = () => reject('Error reading file');
      reader.readAsText(file);
    });
  }
}
