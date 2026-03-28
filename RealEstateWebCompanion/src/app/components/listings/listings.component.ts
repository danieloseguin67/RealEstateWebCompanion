import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { GoogleDriveService } from '../../services/google-drive.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Apartment, ApartmentImage } from '../../models/data.models';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, finalize, from, of, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-listings',
  imports: [AgGridAngular, FormsModule, CommonModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.scss'
})
export class ListingsComponent implements OnInit {
  rowData: Apartment[] = [];
  private gridApi: any;
  
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
  editingImageIndex: number | null = null;
  editingImageName = '';
  apartmentImages: ApartmentImage[] = [];
  loadingImages = false;
  creatingImage = false;
  updatingImage = false;
  deletingImageId: number | null = null;
  
  // Apartment features properties
  newFeatureName = '';
  newFeatureNameEn = '';
  editingFeatureId: number | null = null;
  editFeatureName = '';
  editFeatureNameEn = '';
  
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
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataService.apartments$.subscribe(data => {
      this.rowData = data;
    });
    
    // Load available toggles for amenities checkboxes
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
    
    if (this.editingApartment?.id) {
      this.loadApartmentImages(this.editingApartment.id);
    }
  }
  
  closeEditModal(): void {
    this.showEditModal = false;
    this.editingApartment = null;
    this.activeTab = 'basic';
    this.cancelEditingImageName();
  }
  
  saveEdit(): void {
    if (this.editingApartment) {
      const updated = { ...this.editingApartment };
      const index = this.rowData.findIndex(r => r.id === updated.id);
      if (index !== -1) {
        this.rowData[index] = updated;
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.saveData();
      }
      this.apiService.updateApartment(updated.id, updated).subscribe({
        error: (err) => console.error('Failed to save apartment to API:', err)
      });
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
  
  updateFeatures(value: string): void {
    if (!this.editingApartment) return;
    // Split by newlines and filter out empty lines
    this.editingApartment.features = value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
  
  updateFeaturesEn(value: string): void {
    if (!this.editingApartment) return;
    // Split by newlines and filter out empty lines
    this.editingApartment.featuresEn = value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
  
  loadApartmentImages(apartmentId: string): void {
    this.loadingImages = true;
    this.apiService.getApartmentImages(apartmentId).subscribe({
      next: (images) => {
        this.apartmentImages = images;
        if (this.editingApartment?.id === apartmentId) {
          this.editingApartment.images = images.map(i => i.fileName);
        }
        this.loadingImages = false;
      },
      error: (error) => {
        console.error('Error loading apartment images:', error);
        this.apartmentImages = [];
        if (this.editingApartment?.id === apartmentId) {
          this.editingApartment.images = [];
        }
        this.loadingImages = false;
      }
    });
  }
  
  addApartmentFeature(): void {
    if (this.editingFeatureId !== null) return;
    if (!this.editingApartment || !this.newFeatureName.trim() || !this.newFeatureNameEn.trim()) return;

    if (!this.editingApartment.features) this.editingApartment.features = [];
    if (!this.editingApartment.featuresEn) this.editingApartment.featuresEn = [];

    this.editingApartment.features.push(this.newFeatureName.trim());
    this.editingApartment.featuresEn.push(this.newFeatureNameEn.trim());
    this.clearFeatureForm();
  }

  private ensureApartmentExistsInApi(apartment: Apartment) {
    return this.apiService.getApartmentById(apartment.id).pipe(
      catchError((error) => {
        if (error?.status === 404) {
          return this.apiService.createApartment(apartment).pipe(
            catchError((createError) => {
              // If another client created it between GET and POST.
              if (createError?.status === 409) {
                return of(apartment);
              }
              return throwError(() => createError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
  
  removeApartmentFeature(index: number): void {
    if (!this.editingApartment) return;
    if (!confirm('Are you sure you want to remove this feature?')) return;
    this.editingApartment.features.splice(index, 1);
    this.editingApartment.featuresEn.splice(index, 1);
  }
  
  clearFeatureForm(): void {
    this.newFeatureName = '';
    this.newFeatureNameEn = '';
  }
  
  startEditFeature(index: number): void {
    this.editingFeatureId = index;
    this.editFeatureName = this.editingApartment!.features[index];
    this.editFeatureNameEn = this.editingApartment!.featuresEn[index];
  }
  
  saveFeature(index: number): void {
    if (!this.editFeatureName.trim() || !this.editFeatureNameEn.trim()) return;
    this.editingApartment!.features[index] = this.editFeatureName.trim();
    this.editingApartment!.featuresEn[index] = this.editFeatureNameEn.trim();
    this.cancelEdit();
  }
  
  cancelEdit(): void {
    this.editingFeatureId = null;
    this.editFeatureName = '';
    this.editFeatureNameEn = '';
  }
  
  addImage(): void {
    if (this.creatingImage) return;
    if (!this.editingApartment || !this.newImageUrl.trim()) return;

    const fileName = this.newImageUrl.trim();
    this.creatingImage = true;

    this.ensureApartmentExistsInApi(this.editingApartment).pipe(
      switchMap(() => this.apiService.createApartmentImage({
        apartmentId: this.editingApartment!.id,
        fileName
      })),
      finalize(() => {
        this.creatingImage = false;
      })
    ).subscribe({
      next: (created) => {
        this.apartmentImages.push(created);
        this.editingApartment!.images = this.apartmentImages.map(i => i.fileName);
        this.newImageUrl = '';
      },
      error: (error) => {
        console.error('Error creating apartment image:', error);
        alert('Failed to add image name. Please try again.');
      }
    });
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = input.files;
      this.uploadSelectedImages();
    }
  }
  
  uploadSelectedImages(): void {
    if (this.creatingImage) return;
    if (!this.editingApartment || !this.selectedFiles) return;

    const files = this.selectedFiles;
    this.selectedFiles = null;

    const fileNames = Array.from(files).map(f => f.name).filter(Boolean);
    if (fileNames.length === 0) return;

    this.creatingImage = true;
    this.ensureApartmentExistsInApi(this.editingApartment).pipe(
      switchMap(() => from(fileNames).pipe(
        concatMap((fileName) => this.apiService.createApartmentImage({
          apartmentId: this.editingApartment!.id,
          fileName
        }))
      )),
      finalize(() => {
        this.creatingImage = false;
      })
    ).subscribe({
      next: (created) => {
        this.apartmentImages.push(created);
        this.editingApartment!.images = this.apartmentImages.map(i => i.fileName);
      },
      error: (error) => {
        console.error('Error creating apartment images:', error);
        alert('Failed to add one or more image names. Please try again.');
      }
    });
  }
  
  removeImage(index: number): void {
    const image = this.apartmentImages[index];
    if (!image) return;

    if (!confirm('Are you sure you want to remove this image?')) {
      return;
    }

    this.deletingImageId = image.id;
    this.apiService.deleteApartmentImage(image.id).pipe(
      finalize(() => {
        this.deletingImageId = null;
      })
    ).subscribe({
      next: () => {
        this.apartmentImages = this.apartmentImages.filter(i => i.id !== image.id);
        if (this.editingApartment) {
          this.editingApartment.images = this.apartmentImages.map(i => i.fileName);
        }
        if (this.editingImageIndex === index) {
          this.cancelEditingImageName();
        }
      },
      error: (error) => {
        console.error('Error deleting apartment image:', error);
        alert('Failed to remove image. Please try again.');
      }
    });
  }

  startEditingImageName(index: number): void {
    if (this.updatingImage) return;
    this.editingImageIndex = index;
    this.editingImageName = this.apartmentImages[index]?.fileName ?? '';
  }

  saveImageName(index: number): void {
    if (this.updatingImage || !this.editingImageName.trim()) {
      this.cancelEditingImageName();
      return;
    }

    const image = this.apartmentImages[index];
    if (!image) {
      this.cancelEditingImageName();
      return;
    }

    const newName = this.editingImageName.trim();
    this.updatingImage = true;

    this.apiService.updateApartmentImage(image.id, {
      apartmentId: image.apartmentId,
      fileName: newName
    }).pipe(
      finalize(() => {
        this.updatingImage = false;
      })
    ).subscribe({
      next: () => {
        const idx = this.apartmentImages.findIndex(i => i.id === image.id);
        if (idx !== -1) {
          this.apartmentImages[idx].fileName = newName;
        }
        if (this.editingApartment) {
          this.editingApartment.images = this.apartmentImages.map(i => i.fileName);
        }
        this.cancelEditingImageName();
      },
      error: (error) => {
        console.error('Error renaming apartment image:', error);
        alert('Failed to rename image. Please try again.');
      }
    });
  }

  cancelEditingImageName(): void {
    this.editingImageIndex = null;
    this.editingImageName = '';
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

  resetToDefault(): void {
    this.dataService.resetApartmentsToDefault();
    alert('Apartments reset to default data.');
  }
}
