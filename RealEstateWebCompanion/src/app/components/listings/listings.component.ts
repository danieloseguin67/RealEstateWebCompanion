import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { GoogleDriveService } from '../../services/google-drive.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Apartment, ApartmentImage, Toggle } from '../../models/data.models';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, forkJoin, of, switchMap, throwError } from 'rxjs';

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
  activeTab: 'basic' | 'details' | 'images' = 'basic';
  availableFeatures: Toggle[] = [];
  availableAreas: string[] = [];
  availableUnitTypes: string[] = [];
  newImageUrl = '';
  selectedFiles: FileList | null = null;
  editingImageIndex: number | null = null;
  editingImageName = '';
  apartmentImages: ApartmentImage[] = [];
  loadingImages = false;
  creatingImage = false;
  updatingImage = false;
  deletingImageId: number | null = null;
  isDragOver = false;
  apartmentFeatures: Toggle[] = [];
  loadingFeatures = false;
  
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
      field: 'feature_ids', 
      headerName: 'Features', 
      width: 200, 
      filter: 'agTextColumnFilter', 
      sortable: true, 
      editable: false,
      valueFormatter: (params: any) => params.value ? params.value.length + ' features' : '0 features'
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
    
    // Load available features for checkboxes
    this.dataService.toggles$.subscribe(toggles => {
      this.availableFeatures = toggles;
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
      feature_ids: [],
      images: []
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
      this.loadApartmentFeatures(this.editingApartment.feature_ids ?? []);
    }
  }
  
  closeEditModal(): void {
    this.showEditModal = false;
    this.editingApartment = null;
    this.activeTab = 'basic';
    this.apartmentFeatures = [];
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
  
  setActiveTab(tab: 'basic' | 'details' | 'images'): void {
    this.activeTab = tab;
  }
  
  loadApartmentFeatures(featureIds: number[]): void {
    if (!featureIds.length) {
      this.apartmentFeatures = [];
      return;
    }
    this.loadingFeatures = true;
    forkJoin(featureIds.map(id => this.apiService.getFeatureById(id))).subscribe({
      next: (features) => { this.apartmentFeatures = features; this.loadingFeatures = false; },
      error: () => { this.apartmentFeatures = []; this.loadingFeatures = false; }
    });
  }

  toggleFeature(featureId: number): void {
    if (!this.editingApartment) return;
    
    const index = this.editingApartment.feature_ids.indexOf(featureId);
    if (index > -1) {
      this.editingApartment.feature_ids.splice(index, 1);
      this.apartmentFeatures = this.apartmentFeatures.filter(f => f.id !== featureId);
    } else {
      this.editingApartment.feature_ids.push(featureId);
      this.apiService.getFeatureById(featureId).subscribe({
        next: (f) => { this.apartmentFeatures = [...this.apartmentFeatures, f]; }
      });
    }
  }
  
  isFeatureSelected(featureId: number): boolean {
    return this.editingApartment?.feature_ids.includes(featureId) || false;
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

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFiles = files;
      this.uploadSelectedImages();
    }
  }
  
  uploadSelectedImages(): void {
    if (this.creatingImage) return;
    if (!this.editingApartment || !this.selectedFiles) return;

    const files = this.selectedFiles;
    this.selectedFiles = null;
    if (files.length === 0) return;

    this.creatingImage = true;
    this.ensureApartmentExistsInApi(this.editingApartment).pipe(
      switchMap(() => this.apiService.uploadApartmentImageFiles(this.editingApartment!.id, files)),
      finalize(() => {
        this.creatingImage = false;
      })
    ).subscribe({
      next: (created) => {
        this.apartmentImages.push(...created);
        this.editingApartment!.images = this.apartmentImages.map(i => i.fileName);
      },
      error: (error) => {
        console.error('Error uploading apartment images:', error);
        alert('Failed to upload one or more images. Please try again.');
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
