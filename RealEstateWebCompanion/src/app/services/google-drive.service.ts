import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private isInitialized = false;
  private isSignedIn = false;

  // Replace with your actual Google API credentials
  // To enable Google Drive features, obtain credentials from: https://console.cloud.google.com/
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
    // Determine the data type and filename
    let exportData: any;
    let filename: string;

    if (data.seoPages) {
      exportData = data.seoPages;
      filename = 'seomanager.json';
    } else if (data.areas) {
      exportData = data.areas;
      filename = 'areasmanager.json';
    } else if (data.unitTypes) {
      exportData = data.unitTypes;
      filename = 'unittypes.json';
    } else if (data.toggles) {
      exportData = data.toggles;
      filename = 'features.json';
    } else if (data.apartments) {
      exportData = data.apartments;
      filename = 'apartments_listings.json';
    } else {
      exportData = data;
      filename = 'export.json';
    }

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
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

  extractFolderIdFromUrl(url: string): string | null {
    try {
      const match = url.match(/[?&]id=([^&]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }

  async exportToGoogleDrive(data: any, folderId: string): Promise<void> {
    try {
      // Determine the data type and filename
      let exportData: any;
      let filename: string;

      if (data.seoPages) {
        exportData = data.seoPages;
        filename = 'seomanager.json';
      } else if (data.areas) {
        exportData = data.areas;
        filename = 'areasmanager.json';
      } else if (data.unitTypes) {
        exportData = data.unitTypes;
        filename = 'unittypes.json';
      } else if (data.toggles) {
        exportData = data.toggles;
        filename = 'features.json';
      } else if (data.apartments) {
        exportData = data.apartments;
        filename = 'apartments_listings.json';
      } else {
        exportData = data;
        filename = 'export.json';
      }

      const dataStr = JSON.stringify(exportData, null, 2);
      
      if (!this.isInitialized) {
        await this.initClient();
      }
      
      if (!this.isSignedIn) {
        await this.signIn();
      }

      // Check if file already exists in folder
      const existingFiles = await gapi.client.drive.files.list({
        q: `name='${filename}' and '${folderId}' in parents and trashed=false`,
        fields: 'files(id, name)'
      });

      let fileId = null;
      if (existingFiles.result.files && existingFiles.result.files.length > 0) {
        fileId = existingFiles.result.files[0].id;
      }

      if (fileId) {
        // Update existing file
        await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
          method: 'PATCH',
          headers: new Headers({ 
            'Authorization': 'Bearer ' + gapi.auth.getToken().access_token,
            'Content-Type': 'application/json'
          }),
          body: dataStr
        });
        alert(`Successfully updated ${filename} in Google Drive folder`);
      } else {
        // Create new file
        const file = new Blob([dataStr], { type: 'application/json' });
        const metadata = {
          name: filename,
          mimeType: 'application/json',
          parents: [folderId]
        };

        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', file);

        await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
          method: 'POST',
          headers: new Headers({ 'Authorization': 'Bearer ' + gapi.auth.getToken().access_token }),
          body: form
        });
        alert(`Successfully exported ${filename} to Google Drive folder`);
      }
    } catch (error: any) {
      console.error('Google Drive export error:', error);
      alert('Failed to export to Google Drive: ' + (error.message || 'Unknown error') + '.\n\nFalling back to local download.');
      // Fallback to local export
      this.exportData(data);
    }
  }

  async importFromGoogleDrive(filename: string, folderId: string): Promise<any> {
    try {
      if (!this.isInitialized) {
        await this.initClient();
      }
      
      if (!this.isSignedIn) {
        await this.signIn();
      }

      // Search for the file in the folder
      const response = await gapi.client.drive.files.list({
        q: `name='${filename}' and '${folderId}' in parents and trashed=false`,
        fields: 'files(id, name)',
        orderBy: 'modifiedTime desc'
      });

      if (!response.result.files || response.result.files.length === 0) {
        throw new Error(`File ${filename} not found in Google Drive folder`);
      }

      const fileId = response.result.files[0].id;

      // Download the file content
      const fileResponse = await gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
      });

      return fileResponse.result;
    } catch (error: any) {
      console.error('Google Drive import error:', error);
      throw error;
    }
  }
}
