import { Component, NgZone, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Toggle } from '../../models/data.models';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-toggles',
  imports: [AgGridAngular, CommonModule, FormsModule],
  templateUrl: './toggles.component.html',
  styleUrl: './toggles.component.scss'
})
export class TogglesComponent implements OnInit {
  rowData: Toggle[] = [];
  private gridApi: any;
  isEditing = false;
  editingToggle: Toggle | null = null;
  loading = false;
  savingChanges = false;
  errorMessage: string | null = null;
  private dirtyIds = new Set<number>();

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
    { field: 'french_name', headerName: 'French Name', width: 250, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'english_name', headerName: 'English Name', width: 250, filter: 'agTextColumnFilter', sortable: true, editable: true },
    {
      field: 'toggle_image',
      headerName: 'Icon',
      width: 80,
      editable: false,
      filter: false,
      sortable: false,
      cellRenderer: (params: any) => {
        const val: string = params.value ?? '';
        if (val.startsWith('data:')) {
          const img = document.createElement('img');
          img.src = val;
          img.style.cssText = 'height:28px;width:28px;object-fit:contain;vertical-align:middle;';
          return img;
        }
        const span = document.createElement('span');
        span.textContent = val;
        span.style.cssText = 'font-size:1.5rem;line-height:1;';
        return span;
      }
    }
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
  get editingIconIsImage(): boolean { return (this.editingToggle?.toggle_image ?? '').startsWith('data:'); }

  constructor(private apiService: ApiService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadFeatures();
  }

  clearError(): void {
    this.errorMessage = null;
  }

  loadFeatures(): void {
    this.loading = true;
    this.apiService.getFeatures().subscribe({
      next: (data) => {
        this.rowData = data;
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load features:', err);
        this.loading = false;
        this.errorMessage = 'Failed to load Features. Please ensure the web API is running.';
      }
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  onCellValueChanged(event: any): void {
    const toggle = event.data as Toggle;
    if (toggle?.id) this.dirtyIds.add(toggle.id);
  }

  saveAllChanges(): void {
    if (this.savingChanges || !this.hasPendingChanges) return;
    const toSave = this.rowData.filter(r => r?.id && this.dirtyIds.has(r.id));
    if (toSave.length === 0) { this.dirtyIds.clear(); return; }
    this.savingChanges = true;
    from(toSave).pipe(
      concatMap(r => this.apiService.updateFeature(r.id, r)),
      finalize(() => { this.savingChanges = false; })
    ).subscribe({
      next: () => {},
      complete: () => { this.dirtyIds.clear(); },
      error: (err) => {
        console.error('Failed to save feature changes:', err);
        this.errorMessage = 'Failed to save changes. Please try again.';
      }
    });
  }

  addRow(): void {
    const newRow: Toggle = { id: 0, french_name: '', english_name: '', toggle_image: '' };
    this.rowData = [newRow, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.apiService.createFeature(newRow).subscribe({
      next: (created) => {
        const idx = this.rowData.findIndex(r => r === newRow);
        if (idx !== -1) this.rowData[idx] = created;
        this.gridApi?.setGridOption('rowData', this.rowData);
      },
      error: (err) => {
        console.error('Failed to create feature:', err);
        this.rowData = this.rowData.filter(r => r !== newRow);
        this.gridApi?.setGridOption('rowData', this.rowData);
        this.errorMessage = 'Failed to add Feature. Please try again.';
      }
    });
  }

  editRow(node: any): void {
    this.editingToggle = { ...node.data };
    this.isEditing = true;
  }

  saveEdit(): void {
    if (!this.editingToggle) return;
    const updated = { ...this.editingToggle };
    const index = this.rowData.findIndex(r => r.id === updated.id);
    if (index !== -1) {
      this.rowData[index] = updated;
      this.gridApi?.setGridOption('rowData', this.rowData);
    }
    this.apiService.updateFeature(updated.id, updated).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Failed to update feature:', err);
        this.errorMessage = 'Failed to save Feature changes. Please try again. - Error details: ' + err.message;
        this.loadFeatures();
      }
    });
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingToggle = null;
  }

  onIconFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.editingToggle) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.ngZone.run(() => {
        if (this.editingToggle) {
          this.editingToggle.toggle_image = reader.result as string;
        }
      });
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  deleteRow(node: any): void {
    if (confirm('Are you sure you want to delete this feature?')) {
      const toggle = node.data as Toggle;
      const previous = [...this.rowData];
      this.rowData = this.rowData.filter(r => r.id !== toggle.id);
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.apiService.deleteFeature(toggle.id).subscribe({
        error: (err) => {
          console.error('Failed to delete feature:', err);
          this.rowData = previous;
          this.gridApi?.setGridOption('rowData', this.rowData);
          this.errorMessage = 'Failed to delete Feature. Please try again.';
        }
      });
    }
  }
}
