import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { GoogleDriveService } from '../../services/google-drive.service';
import { AuthService } from '../../services/auth.service';
import { Apartment } from '../../models/data.models';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-listings',
  imports: [AgGridAngular, FormsModule, CommonModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.scss'
})
export class ListingsComponent implements OnInit {
  rowData: Apartment[] = [];
  private gridApi: any;
  googleDriveFolderUrl: string | null = null;
  
  // Edit modal properties
  showEditModal = false;
  editingApartment: Apartment | null = null;
  activeTab: 'basic' | 'details' | 'features' | 'images' = 'basic';
  availableToggles: string[] = [];
  availableAreas: string[] = [];
  availableUnitTypes: string[] = [];
  newImageUrl = '';
  newFeatureFr = '';
  newFeatureEn = '';
  selectedFiles: FileList | null = null;
  
  // Check if current user is daniel.seguin
  get isDanielSeguin(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.userId?.toLowerCase() === 'daniel.seguin';
  }
  
  colDefs: ColDef[] = [
    { 
      headerName: '#', 
      width: 60, 
      cellRenderer: (params: any) => {
        return params.node.rowIndex + 1;
      },
      editable: false,
      filter: false,
      sortable: false,
      pinned: 'left'
    },
    { 
      headerName: 'Actions', 
      width: 300, 
      cellRenderer: (params: any) => {
        return '<button class="edit-btn">Edit</button> <button class="remove-btn">Remove</button>';
      },
      editable: false,
      filter: false,
      sortable: false
    },
    { field: 'id', headerName: 'ID', width: 100, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'title', headerName: 'Title (FR)', width: 900, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'titleEn', headerName: 'Title (EN)', width: 900, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'unit_type_name', headerName: 'Unit Type', width: 130, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'area', headerName: 'Area', width: 150, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'price', headerName: 'Price', width: 120, filter: 'agNumberColumnFilter', sortable: true, editable: true, valueFormatter: params => '$' + params.value, valueParser: params => Number(params.newValue) },
    { 
      field: 'available', 
      headerName: 'Available', 
      width: 110, 
      filter: 'agSetColumnFilter', 
      sortable: true, 
      editable: true,
      cellRenderer: (params: any) => {
        return `<input type="checkbox" ${params.value ? 'checked' : ''} onclick="return false;" style="pointer-events: none;" />`;
      },
      cellEditor: 'agSelectCellEditor', 
      cellEditorParams: { values: [true, false] } 
    },
    { field: 'squareFootage', headerName: 'Sq Ft', width: 100, filter: 'agNumberColumnFilter', sortable: true, editable: true },
    { field: 'bathrooms', headerName: 'Bathrooms', width: 120, filter: 'agNumberColumnFilter', sortable: true, editable: true },
    { 
      field: 'furnished', 
      headerName: 'Furnished', 
      width: 110, 
      filter: 'agSetColumnFilter', 
      sortable: true, 
      editable: true,
      cellRenderer: (params: any) => {
        return `<input type="checkbox" ${params.value ? 'checked' : ''} onclick="return false;" style="pointer-events: none;" />`;
      },
      cellEditor: 'agSelectCellEditor', 
      cellEditorParams: { values: [true, false] } 
    },
    { 
      field: 'roomtorent', 
      headerName: 'Room to Rent', 
      width: 130, 
      filter: 'agSetColumnFilter', 
      sortable: true, 
      editable: true,
      cellRenderer: (params: any) => {
        return `<input type="checkbox" ${params.value ? 'checked' : ''} onclick="return false;" style="pointer-events: none;" />`;
      },
      cellEditor: 'agSelectCellEditor', 
      cellEditorParams: { values: [true, false] } 
    },
    { 
      field: 'condorentals', 
      headerName: 'Condo Rental', 
      width: 130, 
      filter: 'agSetColumnFilter', 
      sortable: true, 
      editable: true,
      cellRenderer: (params: any) => {
        return `<input type="checkbox" ${params.value ? 'checked' : ''} onclick="return false;" style="pointer-events: none;" />`;
      },
      cellEditor: 'agSelectCellEditor', 
      cellEditorParams: { values: [true, false] } 
    },
    { field: 'description', headerName: 'Description', width: 250, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'descriptionEn', headerName: 'Description (EN)', width: 250, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { 
      field: 'features', 
      headerName: 'Features', 
      width: 200, 
      filter: 'agTextColumnFilter', 
      sortable: true, 
      editable: true,
      valueFormatter: params => params.value ? params.value.join(', ') : '',
      valueParser: params => params.newValue ? params.newValue.split(',').map((s: string) => s.trim()) : []
    },
    { 
      field: 'images', 
      headerName: 'Images', 
      width: 150, 
      filter: 'agTextColumnFilter', 
      sortable: true, 
      editable: true,
      valueFormatter: params => params.value ? params.value.length + ' images' : '0 images',
      valueParser: params => params.newValue ? params.newValue.split(',').map((s: string) => s.trim()) : []
    }
  ];
  
  public defaultColDef: ColDef = {
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
  };
  
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50
  };

  constructor(
    private dataService: DataService,
    private googleDriveService: GoogleDriveService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataService.apartments$.subscribe(data => {
      this.rowData = data;
    });
    
    // Load available toggles for features selection
    this.dataService.toggles$.subscribe(toggles => {
      this.availableToggles = toggles.map(t => t.toggle_name);
    });
    
    // Load available areas
    this.dataService.areas$.subscribe(areas => {
      this.availableAreas = areas.map(a => a.nameEn);
    });
    
    // Load available unit types
    this.dataService.unitTypes$.subscribe(types => {
      this.availableUnitTypes = types.map(t => t.unit_type_name);
    });
    
    // Load Google Drive folder URL from preferences
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
    
    // Add click event listener for edit and remove buttons
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('edit-btn')) {
        this.editRow(event.node);
      } else if (event.event.target.classList.contains('remove-btn')) {
        this.removeRow(event.node);
      }
    });
  }

  onCellValueChanged(event: any): void {
    this.saveData();
  }

  addRow(): void {
    const newId = 'apt_' + String(this.rowData.length + 1).padStart(3, '0');
    const newRow: Apartment = {
      id: newId,
      title: '',
      titleEn: '',
      unit_type_name: '',
      bathrooms: 0,
      squareFootage: 0,
      price: 0,
      area: '',
      furnished: false,
      roomtorent: false,
      condorentals: false,
      available: true,
      description: '',
      descriptionEn: '',
      features: [],
      featuresEn: [],
      images: [],
      toggle_names: []
    };
    this.rowData = [newRow, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.saveData();
  }

  editRow(node: any): void {
    this.editingApartment = { ...node.data };
    this.showEditModal = true;
    this.activeTab = 'basic';
  }
  
  closeEditModal(): void {
    this.showEditModal = false;
    this.editingApartment = null;
    this.activeTab = 'basic';
  }
  
  saveEdit(): void {
    if (this.editingApartment) {
      const index = this.rowData.findIndex(r => r.id === this.editingApartment!.id);
      if (index !== -1) {
        this.rowData[index] = { ...this.editingApartment };
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.saveData();
      }
    }
    this.closeEditModal();
  }
  
  setActiveTab(tab: 'basic' | 'details' | 'features' | 'images'): void {
    this.activeTab = tab;
  }
  
  addFeature(language: 'fr' | 'en'): void {
    if (!this.editingApartment) return;
    
    if (language === 'fr') {
      const feature = this.newFeatureFr.trim();
      if (!feature) return;
      
      if (!this.editingApartment.features) {
        this.editingApartment.features = [];
      }
      this.editingApartment.features.push(feature);
      this.newFeatureFr = '';
    } else {
      const feature = this.newFeatureEn.trim();
      if (!feature) return;
      
      if (!this.editingApartment.featuresEn) {
        this.editingApartment.featuresEn = [];
      }
      this.editingApartment.featuresEn.push(feature);
      this.newFeatureEn = '';
    }
  }
  
  editFeature(index: number, language: 'fr' | 'en'): void {
    // Feature is edited inline via ngModel binding
    // This method is a placeholder in case additional logic is needed
  }
  
  removeFeature(index: number, language: 'fr' | 'en'): void {
    if (!this.editingApartment) return;
    
    if (language === 'fr') {
      this.editingApartment.features.splice(index, 1);
    } else {
      this.editingApartment.featuresEn.splice(index, 1);
    }
  }
  
  toggleFeature(featureName: string): void {
    if (!this.editingApartment) return;
    
    const index = this.editingApartment.toggle_names.indexOf(featureName);
    if (index > -1) {
      this.editingApartment.toggle_names.splice(index, 1);
    } else {
      this.editingApartment.toggle_names.push(featureName);
    }
  }
  
  isFeatureSelected(featureName: string): boolean {
    return this.editingApartment?.toggle_names.includes(featureName) || false;
  }
  
  addImage(): void {
    if (!this.editingApartment || !this.newImageUrl.trim()) return;
    
    if (!this.editingApartment.images) {
      this.editingApartment.images = [];
    }
    this.editingApartment.images.push(this.newImageUrl.trim());
    this.newImageUrl = '';
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = input.files;
      this.uploadSelectedImages();
    }
  }
  
  uploadSelectedImages(): void {
    if (!this.editingApartment || !this.selectedFiles) return;
    
    if (!this.editingApartment.images) {
      this.editingApartment.images = [];
    }
    
    // Simply add filenames to the images array
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      this.editingApartment.images.push(file.name);
    }
    
    this.selectedFiles = null;
  }
  
  removeImage(index: number): void {
    if (!this.editingApartment) return;
    this.editingApartment.images.splice(index, 1);
  }
  
  getImageUrl(filename: string): string {
    return `/assets/images/${filename}`;
  }

  removeRow(node: any): void {
    if (confirm('Are you sure you want to remove this listing?')) {
      this.rowData = this.rowData.filter(row => row.id !== node.data.id);
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.saveData();
    }
  }

  saveData(): void {
    this.dataService.updateApartments(this.rowData);
  }

  exportData(): void {
    this.googleDriveService.exportData({ apartments: this.rowData });
  }

  resetToDefault(): void {
    this.dataService.resetApartmentsToDefault();
    alert('Apartments reset to default data.');
  }

  async importData(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      try {
        const data = await this.googleDriveService.importDataFromFile(input.files[0]);
        if (data.apartments) {
          this.dataService.updateApartments(data.apartments);
          alert('Apartments imported successfully!');
        } else if (Array.isArray(data)) {
          this.dataService.updateApartments(data);
          alert('Apartments imported successfully!');
        } else {
          alert('Invalid file format. Expected apartments array.');
        }
      } catch (error) {
        alert('Error importing data: ' + error);
      }
    }
  }

  // Features Data Management Methods
  exportFeaturesData(): void {
    this.googleDriveService.exportData({ apartments: this.rowData });
  }

  openGoogleDriveToUpload(): void {
    if (this.googleDriveFolderUrl) {
      alert('🚀 Upload to SeguinDev Drive\n\nThe Google Drive folder will open in a new tab.\n\nTo upload your exported file:\n1. Locate the exported "apartments.json" in your Downloads\n2. Drag and drop it into the Google Drive folder OR\n3. Right-click in the folder and select "File upload"');
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
      `   • Look for the "apartments.json" file\n\n` +
      `2️⃣ Download the file to your computer\n` +
      `   • Right-click on "apartments.json"\n` +
      `   • Select "Download"\n` +
      `   • File will save to your Downloads folder\n\n` +
      `3️⃣ Click the "📋 Import to Features Manager" button\n` +
      `   • Use the button next to this one\n` +
      `   • Select the downloaded file from your Downloads\n` +
      `   • Data will import automatically!\n\n` +
      `Click OK to open SeguinDev Google Drive`;

    if (confirm(message)) {
      window.open(this.googleDriveFolderUrl, '_blank');
    }
  }

  async importFeaturesData(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        // Handle both formats: { apartments: [...] } or just [...]
        if (data.apartments && Array.isArray(data.apartments)) {
          this.rowData = data.apartments;
          this.gridApi?.setGridOption('rowData', this.rowData);
          this.saveData();
          alert(`Successfully imported ${data.apartments.length} apartment listing(s) from local file.`);
        } else if (Array.isArray(data)) {
          this.rowData = data;
          this.gridApi?.setGridOption('rowData', this.rowData);
          this.saveData();
          alert(`Successfully imported ${data.length} apartment listing(s) from local file.`);
        } else {
          alert('Invalid JSON file: Must be an array of apartments or an object with apartments property');
        }
      } catch (error) {
        alert('Invalid JSON file: Unable to parse');
      }
      // Reset the file input
      input.value = '';
    }
  }
}
