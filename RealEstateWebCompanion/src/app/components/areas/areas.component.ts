import { Component, NgZone, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Area } from '../../models/data.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { from } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

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
  errorMessage: string | null = null;
  private dirtyAreaIds = new Set<number>();
  private newAreaIds = new Set<number>();
  private nextTempId = 0;
  
  colDefs: ColDef[] = [
    {
      headerName: 'Actions',
      width: 200,
      suppressSizeToFit: true,
      cellRenderer: (params: any) => {
        const container = document.createElement('span');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', () => this.ngZone.run(() => this.editRow(params.node)));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => this.ngZone.run(() => this.deleteRow(params.node)));

        container.appendChild(editBtn);
        container.appendChild(document.createTextNode(' '));
        container.appendChild(deleteBtn);
        return container;
      },
      editable: false,
      filter: false,
      sortable: false
    },
    { field: 'id', headerName: 'ID', width: 150, filter: 'agTextColumnFilter', sortable: true, editable: false,
      valueFormatter: (p: any) => p.value != null && p.value < 0 ? 'New' : p.value },
    { field: 'name', headerName: 'Name', width: 180, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'nameFr', headerName: 'Name (FR)', width: 180, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'nameEn', headerName: 'Name (EN)', width: 180, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'descriptionFr', headerName: 'Description (FR)', width: 300, filter: 'agTextColumnFilter', sortable: true, editable: true },
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
    private apiService: ApiService,
    private ngZone: NgZone
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
        this.newAreaIds.clear();
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load areas from API:', error);
        this.rowData = [];
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.dirtyAreaIds.clear();
        this.newAreaIds.clear();
        this.loading = false;
        this.errorMessage = 'Failed to load Areas from API. Please ensure the web API is running - ' + error.message;
      }
    });
  }

  clearError(): void {
    this.errorMessage = null;
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
  }

  onCellValueChanged(event: any): void {
    const area = event.data as Area;
    if (area?.id == null) return;
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
      concatMap((area) => {
        if (this.newAreaIds.has(area.id)) {
          return this.apiService.createArea(area).pipe(
            tap((created) => {
              const idx = this.rowData.findIndex(r => r.id === area.id);
              if (idx !== -1) this.rowData[idx] = created;
              this.newAreaIds.delete(area.id);
            })
          );
        }
        return this.apiService.updateArea(area.id, area);
      }),
      finalize(() => {
        this.savingChanges = false;
      })
    ).subscribe({
      next: () => {},
      complete: () => {
        this.dirtyAreaIds.clear();
        this.gridApi?.setGridOption('rowData', this.rowData);
      },
      error: (error) => {
        console.error('Failed to save area changes:', error);
        this.errorMessage = 'Failed to save one or more changes. Reloading latest data from API.';
        this.loadAreas();
      }
    });
  }

  addRow(): void {
    const tempId = --this.nextTempId;
    const newRow: Area = {
      id: tempId,
      name: '',
      nameFr: '',
      nameEn: '',
      descriptionFr: '',
      descriptionEn: '',
      link: ''
    };

    this.rowData = [newRow, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.newAreaIds.add(tempId);
    this.dirtyAreaIds.add(tempId);

    // Navigate to first page and begin editing the Name cell
    this.gridApi?.paginationGoToFirstPage();
    setTimeout(() => {
      this.gridApi?.startEditingCell({ rowIndex: 0, colKey: 'name' });
    }, 50);
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
            this.errorMessage = 'Failed to save Area changes. Reloading latest data from API.';
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
    const id = node?.data?.id as number;
    if (id == null) return;

    // New unsaved row — remove locally without API call
    if (this.newAreaIds.has(id)) {
      this.rowData = this.rowData.filter(row => row.id !== id);
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.newAreaIds.delete(id);
      this.dirtyAreaIds.delete(id);
      return;
    }

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
        this.errorMessage = 'Failed to delete Area. Please try again.';
      }
    });
  }
}
