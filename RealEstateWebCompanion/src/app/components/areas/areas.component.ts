import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Area } from '../../models/data.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { from } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';

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
  loading = false;
  savingChanges = false;
  private dirtyAreaIds = new Set<string>();
  
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
    { field: 'id', headerName: 'ID', width: 150, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'name', headerName: 'Name', width: 180, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'nameFr', headerName: 'Name (FR)', width: 180, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'nameEn', headerName: 'Name (EN)', width: 180, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'description', headerName: 'Description (FR)', width: 300, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'descriptionEn', headerName: 'Description (EN)', width: 300, filter: 'agTextColumnFilter', sortable: true, editable: true },
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
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadAreas();
  }

  loadAreas(): void {
    this.loading = true;
    this.apiService.getAreas().subscribe({
      next: (areas) => {
        this.rowData = areas;
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.dirtyAreaIds.clear();
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load areas from API:', error);
        this.rowData = [];
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.dirtyAreaIds.clear();
        this.loading = false;
        alert('Failed to load Areas from API. Please ensure the web API is running.');
      }
    });
  }

  get hasPendingChanges(): boolean {
    return this.dirtyAreaIds.size > 0;
  }

  get pendingChangesCount(): number {
    return this.dirtyAreaIds.size;
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
    const area = event.data as Area;
    if (!area?.id) return;
    this.dirtyAreaIds.add(area.id);
  }

  saveAllChanges(): void {
    if (this.savingChanges || !this.hasPendingChanges) return;

    const areasToSave = this.rowData.filter(a => a?.id && this.dirtyAreaIds.has(a.id));
    if (areasToSave.length === 0) {
      this.dirtyAreaIds.clear();
      return;
    }

    this.savingChanges = true;
    from(areasToSave).pipe(
      concatMap((area) => this.apiService.updateArea(area.id, area)),
      finalize(() => {
        this.savingChanges = false;
      })
    ).subscribe({
      next: () => {},
      complete: () => {
        this.dirtyAreaIds.clear();
      },
      error: (error) => {
        console.error('Failed to save area changes:', error);
        alert('Failed to save one or more changes. Reloading latest data from API.');
        this.loadAreas();
      }
    });
  }

  addRow(): void {
    const timestamp = Date.now();
    const newId = `area-${timestamp}`;
    const newRow: Area = {
      id: newId,
      name: '',
      nameFr: '',
      nameEn: '',
      description: '',
      descriptionEn: '',
      link: ''
    };

    // Optimistic UI insert; rollback on failure.
    this.rowData = [newRow, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);

    this.apiService.createArea(newRow).subscribe({
      next: (created) => {
        const index = this.rowData.findIndex(r => r.id === newId);
        if (index !== -1) {
          this.rowData[index] = created;
          this.gridApi?.setGridOption('rowData', this.rowData);
        }
      },
      error: (error) => {
        console.error('Failed to create area:', error);
        this.rowData = this.rowData.filter(r => r.id !== newId);
        this.gridApi?.setGridOption('rowData', this.rowData);
        alert('Failed to add Area. Please try again.');
      }
    });
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
        const updated = { ...this.editingArea };
        this.rowData[index] = updated;
        this.gridApi?.setGridOption('rowData', this.rowData);

        this.apiService.updateArea(updated.id, updated).subscribe({
          next: () => {
            this.dirtyAreaIds.delete(updated.id);
          },
          error: (error) => {
            console.error('Failed to update area:', error);
            alert('Failed to save Area changes. Reloading latest data from API.');
            this.loadAreas();
          }
        });
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
    const id = node?.data?.id as string;
    if (!id) return;

    if (!confirm('Are you sure you want to delete this area?')) {
      return;
    }

    const previous = [...this.rowData];
    this.rowData = this.rowData.filter(row => row.id !== id);
    this.gridApi?.setGridOption('rowData', this.rowData);

    this.apiService.deleteArea(id).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Failed to delete area:', error);
        this.rowData = previous;
        this.gridApi?.setGridOption('rowData', this.rowData);
        alert('Failed to delete Area. Please try again.');
      }
    });
  }
}
