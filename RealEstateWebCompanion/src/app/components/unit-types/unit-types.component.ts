import { Component, NgZone, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { UnitType } from '../../models/data.models';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-unit-types',
  imports: [AgGridAngular, CommonModule, FormsModule],
  templateUrl: './unit-types.component.html',
  styleUrl: './unit-types.component.scss'
})
export class UnitTypesComponent implements OnInit {
  rowData: UnitType[] = [];
  private gridApi: any;
  isEditing = false;
  editingUnitType: UnitType | null = null;
  loading = false;
  savingChanges = false;
  errorMessage: string | null = null;
  private dirtyIds = new Set<number>();
  private newIds = new Set<number>();
  private nextTempId = 0;

  colDefs: ColDef[] = [
    {
      headerName: 'Actions',
      width: 160,
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
    {
      field: 'id', headerName: 'ID', width: 100, filter: 'agTextColumnFilter', sortable: true, editable: false,
      valueFormatter: (p: any) => p.value != null && p.value < 0 ? 'New' : p.value
    },
    { field: 'unitTypeNameEn', headerName: 'Unit Type (EN)', width: 250, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'unitTypeNameFr', headerName: 'Unit Type (FR)', width: 250, filter: 'agTextColumnFilter', sortable: true, editable: true },
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

  get hasPendingChanges(): boolean { return this.dirtyIds.size > 0; }
  get pendingChangesCount(): number { return this.dirtyIds.size; }

  constructor(private apiService: ApiService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadUnitTypes();
  }

  clearError(): void {
    this.errorMessage = null;
  }

  loadUnitTypes(): void {
    this.loading = true;
    this.apiService.getUnitTypes().subscribe({
      next: (types) => {
        this.rowData = types;
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.dirtyIds.clear();
        this.newIds.clear();
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load unit types from API:', error);
        this.rowData = [];
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.dirtyIds.clear();
        this.newIds.clear();
        this.loading = false;
        this.errorMessage = 'Failed to load Unit Types from API. Please ensure the web API is running - ' + error.message;
      }
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  onCellValueChanged(event: any): void {
    const unitType = event.data as UnitType;
    if (unitType?.id == null) return;
    this.dirtyIds.add(unitType.id);
  }

  saveAllChanges(): void {
    if (this.savingChanges || !this.hasPendingChanges) return;
    const toSave = this.rowData.filter(r => r?.id != null && this.dirtyIds.has(r.id));
    if (toSave.length === 0) { this.dirtyIds.clear(); return; }

    this.savingChanges = true;
    from(toSave).pipe(
      concatMap((unitType) => {
        if (this.newIds.has(unitType.id)) {
          const { id: _tempId, ...newUnitType } = unitType;
          return this.apiService.createUnitType(newUnitType as UnitType).pipe(
            tap((created) => {
              const idx = this.rowData.findIndex(r => r.id === unitType.id);
              if (idx !== -1) this.rowData[idx] = created;
              this.newIds.delete(unitType.id);
            })
          );
        }
        return this.apiService.updateUnitType(unitType.id, unitType);
      }),
      finalize(() => { this.savingChanges = false; })
    ).subscribe({
      next: () => {},
      complete: () => {
        this.dirtyIds.clear();
        this.gridApi?.setGridOption('rowData', this.rowData);
      },
      error: (err) => {
        console.error('Failed to save unit type changes:', err);
        this.errorMessage = 'Failed to save one or more changes. Reloading latest data from API.';
        this.loadUnitTypes();
      }
    });
  }

  addRow(): void {
    const tempId = --this.nextTempId;
    const newRow: UnitType = { id: tempId, unitTypeNameEn: '', unitTypeNameFr: '' };
    this.rowData = [newRow, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.newIds.add(tempId);
    this.dirtyIds.add(tempId);

    this.gridApi?.paginationGoToFirstPage();
    setTimeout(() => {
      this.gridApi?.startEditingCell({ rowIndex: 0, colKey: 'unitTypeNameEn' });
    }, 50);
  }

  editRow(node: any): void {
    this.editingUnitType = { ...node.data };
    this.isEditing = true;
  }

  saveEdit(): void {
    if (!this.editingUnitType) return;
    const updated = { ...this.editingUnitType };
    const index = this.rowData.findIndex(r => r.id === updated.id);
    if (index !== -1) {
      this.rowData[index] = updated;
      this.gridApi?.setGridOption('rowData', this.rowData);
    }
    this.apiService.updateUnitType(updated.id, updated).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Failed to update unit type:', error);
        this.errorMessage = 'Failed to save Unit Type changes. Reloading latest data from API.';
        this.loadUnitTypes();
      }
    });
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingUnitType = null;
  }

  deleteRow(node: any): void {
    const id = node?.data?.id as number;
    if (id == null) return;

    if (this.newIds.has(id)) {
      this.rowData = this.rowData.filter(r => r.id !== id);
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.newIds.delete(id);
      this.dirtyIds.delete(id);
      return;
    }

    if (!confirm('Are you sure you want to delete this unit type?')) return;

    const previous = [...this.rowData];
    this.rowData = this.rowData.filter(r => r.id !== id);
    this.gridApi?.setGridOption('rowData', this.rowData);

    this.apiService.deleteUnitType(id).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Failed to delete unit type:', error);
        this.rowData = previous;
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.errorMessage = 'Failed to delete Unit Type. Please try again.';
      }
    });
  }
}
