import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Apartment, Toggle } from '../../models/data.models';
import { from } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';

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
  savingChanges = false;
  private dirtyApartmentIds = new Set<string>();
  editingApartment: Apartment | null = null;
  activeTab: 'basic' | 'details' | 'images' = 'basic';
  availableFeatures: Toggle[] = [];
  availableAreas: string[] = [];
  availableUnitTypes: string[] = [];
  newImageUrl = '';
  editingImageIndex: number | null = null;
  editingImageName = '';
  isDragOver = false;
  
  get hasPendingChanges(): boolean {
    return this.dirtyApartmentIds.size > 0;
  }

  get pendingChangesCount(): number {
    return this.dirtyApartmentIds.size;
  }

  // Check if current user is daniel.seguin
  get isDanielSeguin(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.userId?.toLowerCase() === 'daniel.seguin';
  }

  // Features resolved from feature_ids in the apartment DTO + loaded availableFeatures list
  get selectedFeatures(): Toggle[] {
    if (!this.editingApartment) return [];
    const ids = this.editingApartment.feature_ids ?? [];
    return this.availableFeatures.filter(f => ids.includes(f.id));
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
      width: 200,
      suppressSizeToFit: true,
      cellRenderer: (params: any) => {
        const container = document.createElement('span');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', () => this.editRow(params.node));

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', () => this.removeRow(params.node));

        container.appendChild(editBtn);
        container.appendChild(document.createTextNode(' '));
        container.appendChild(removeBtn);
        return container;
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
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    // Always load fresh data from the API (cache is bypassed in DataService)
    this.dataService.loadApartments();

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
      this.availableUnitTypes = types.map(t => t.unitTypeNameEn);
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  onCellValueChanged(event: any): void {
    const apt = event.data as Apartment;
    if (apt?.id) this.dirtyApartmentIds.add(apt.id);
  }

  saveAllChanges(): void {
    if (this.savingChanges || !this.hasPendingChanges) return;

    const aptsToSave = this.rowData.filter(a => a?.id && this.dirtyApartmentIds.has(a.id));
    if (aptsToSave.length === 0) {
      this.dirtyApartmentIds.clear();
      return;
    }

    this.savingChanges = true;
    from(aptsToSave).pipe(
      concatMap(apt => this.apiService.updateApartment(apt.id, apt)),
      finalize(() => { this.savingChanges = false; })
    ).subscribe({
      next: () => {},
      complete: () => { this.dirtyApartmentIds.clear(); },
      error: (err) => {
        console.error('Failed to save listing changes:', err);
        alert('Failed to save one or more changes. Please try again.');
      }
    });
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
    this.apiService.createApartment(newRow).subscribe({
      next: (created) => {
        const idx = this.rowData.findIndex(r => r.id === newRow.id);
        if (idx !== -1) this.rowData[idx] = created;
        this.gridApi?.setGridOption('rowData', this.rowData);
      },
      error: (err) => {
        console.error('Failed to create apartment:', err);
        this.rowData = this.rowData.filter(r => r.id !== newRow.id);
        this.gridApi?.setGridOption('rowData', this.rowData);
      }
    });
  }

  editRow(node: any): void {
    // Deep-copy mutable arrays so edits don't mutate the grid row data
    this.editingApartment = {
      ...node.data,
      feature_ids: [...(node.data.feature_ids ?? [])],
      images: [...(node.data.images ?? [])]
    };
    this.showEditModal = true;
    this.activeTab = 'basic';
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
  
  toggleFeature(featureId: number): void {
    if (!this.editingApartment) return;
    const ids = this.editingApartment.feature_ids;
    const index = ids.indexOf(featureId);
    if (index > -1) {
      ids.splice(index, 1);
    } else {
      ids.push(featureId);
    }
    // selectedFeatures getter recomputes automatically from feature_ids + availableFeatures
  }
  
  isFeatureSelected(featureId: number): boolean {
    return this.editingApartment?.feature_ids.includes(featureId) || false;
  }
  addImage(): void {
    if (!this.editingApartment || !this.newImageUrl.trim()) return;
    if (!this.editingApartment.images) this.editingApartment.images = [];
    this.editingApartment.images.push(this.newImageUrl.trim());
    this.newImageUrl = '';
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.addFilesToImages(Array.from(input.files));
      input.value = '';
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
      this.addFilesToImages(Array.from(files).filter(f => f.type.startsWith('image/')));
    }
  }

  private addFilesToImages(files: File[]): void {
    if (!this.editingApartment) return;
    if (!this.editingApartment.images) this.editingApartment.images = [];
    for (const file of files) {
      this.editingApartment.images.push(file.name);
    }
  }

  removeImage(index: number): void {
    if (!this.editingApartment) return;
    if (!confirm('Are you sure you want to remove this image?')) return;
    this.editingApartment.images.splice(index, 1);
    if (this.editingImageIndex === index) {
      this.cancelEditingImageName();
    }
  }

  startEditingImageName(index: number): void {
    this.editingImageIndex = index;
    this.editingImageName = this.editingApartment?.images[index] ?? '';
  }

  saveImageName(index: number): void {
    if (!this.editingImageName.trim() || !this.editingApartment) {
      this.cancelEditingImageName();
      return;
    }
    this.editingApartment.images[index] = this.editingImageName.trim();
    this.cancelEditingImageName();
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
      const removed = node.data as Apartment;
      this.rowData = this.rowData.filter(row => row.id !== removed.id);
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.apiService.deleteApartment(removed.id).subscribe({
        error: (err) => {
          console.error('Failed to delete apartment:', err);
          this.rowData = [removed, ...this.rowData];
          this.gridApi?.setGridOption('rowData', this.rowData);
        }
      });
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
