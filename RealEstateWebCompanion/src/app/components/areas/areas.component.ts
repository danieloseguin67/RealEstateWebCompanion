import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
import { GoogleDriveService } from '../../services/google-drive.service';
import { Area } from '../../models/data.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-areas',
  imports: [AgGridAngular, FormsModule, CommonModule],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.scss'
})
export class AreasComponent implements OnInit {
  rowData: Area[] = [];
  private gridApi: any;
  isEditing: boolean = false;
  editingArea: Area | null = null;
  originalArea: Area | null = null;
  googleDriveFolderUrl: string | null = null;
  
  colDefs: ColDef[] = [
    { 
      headerName: 'Actions', 
      width: 180, 
      cellRenderer: (params: any) => {
        return '<button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>';
      },
      editable: false,
      filter: false,
      sortable: false
    },
    { field: 'id', headerName: 'ID', width: 80, filter: 'agNumberColumnFilter', sortable: true, editable: true },
    { field: 'nameFr', headerName: 'Name (FR)', width: 200, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'nameEn', headerName: 'Name (EN)', width: 200, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'descriptionEn', headerName: 'Description (EN)', width: 350, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'link', headerName: 'Link', width: 200, filter: 'agTextColumnFilter', sortable: true, editable: true }
  ];
  
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
  };
  
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    domLayout: 'autoHeight'
  };

  constructor(
    private dataService: DataService,
    private googleDriveService: GoogleDriveService,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataService.areas$.subscribe(data => {
      this.rowData = data;
    });
    
    try {
      const preferences = await firstValueFrom(this.http.get<any>('assets/data/preferences.json'));
      if (preferences?.googledrive) {
        this.googleDriveFolderUrl = preferences.googledrive;
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('delete-btn')) {
        this.deleteRow(event.node);
      } else if (event.event.target.classList.contains('edit-btn')) {
        this.editRow(event.node);
      }
    });
  }

  onCellValueChanged(event: any): void {
    this.saveData();
  }

  addRow(): void {
    const newId = this.rowData.length > 0 ? Math.max(...this.rowData.map(r => r.id)) + 1 : 1;
    const newRow: Area = {
      id: newId,
      nameFr: '',
      nameEn: '',
      descriptionEn: '',
      link: ''
    };
    this.rowData = [newRow, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.saveData();
  }

  editRow(node: any): void {
    this.editingArea = { ...node.data };
    this.originalArea = { ...node.data };
    this.isEditing = true;
  }

  saveEdit(): void {
    if (this.editingArea) {
      const index = this.rowData.findIndex(row => row.id === this.editingArea!.id);
      if (index !== -1) {
        this.rowData[index] = { ...this.editingArea };
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.saveData();
      }
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingArea = null;
    this.originalArea = null;
  }

  deleteRow(node: any): void {
    if (confirm('Are you sure you want to delete this area?')) {
      this.rowData = this.rowData.filter(row => row.id !== node.data.id);
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.saveData();
    }
  }

  saveData(): void {
    this.dataService.updateAreas(this.rowData);
  }

  exportData(): void {
    this.googleDriveService.exportData({ areas: this.rowData });
  }

  openGoogleDriveToUpload(): void {
    if (this.googleDriveFolderUrl) {
      alert('🚀 Upload to SeguinDev Drive\n\nThe Google Drive folder will open in a new tab.\n\nTo upload your exported file:\n1. Locate the exported "areas.json" in your Downloads\n2. Drag and drop it into the Google Drive folder OR\n3. Right-click in the folder and select "File upload"');
      window.open(this.googleDriveFolderUrl, '_blank');
    } else {
      alert('Google Drive folder not configured in preferences.json');
    }
  }

  quickImportFromSeguinDev(): void {
    if (!this.googleDriveFolderUrl) {
      alert('Google Drive folder not configured in preferences.json');
      return;
    }

    const message = `📥 Get File from SeguinDev Drive\n\n` +
      `Follow these 3 simple steps:\n\n` +
      `1️⃣ SeguinDev Google Drive will open in a new tab\n` +
      `   • Look for the "areas.json" file\n\n` +
      `2️⃣ Download the file to your computer\n` +
      `   • Right-click on "areas.json"\n` +
      `   • Select "Download"\n` +
      `   • File will save to your Downloads folder\n\n` +
      `3️⃣ Click the "📋 Import to Areas Manager" button\n` +
      `   • Use the button next to this one\n` +
      `   • Select the downloaded file from your Downloads\n` +
      `   • Data will import automatically!\n\n` +
      `Click OK to open SeguinDev Google Drive`;

    if (confirm(message)) {
      window.open(this.googleDriveFolderUrl, '_blank');
    }
  }

  async importData(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      try {
        const data = await this.googleDriveService.importDataFromFile(input.files[0]);
        if (data.areas) {
          this.dataService.updateAreas(data.areas);
          alert('Areas imported successfully!');
        } else if (Array.isArray(data)) {
          this.dataService.updateAreas(data);
          alert('Areas imported successfully!');
        } else {
          alert('Invalid file format. Expected areas array.');
        }
      } catch (error) {
        alert('Error importing data: ' + error);
      }
    }
  }
}
