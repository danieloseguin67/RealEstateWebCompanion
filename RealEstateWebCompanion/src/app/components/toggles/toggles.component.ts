import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
import { GoogleDriveService } from '../../services/google-drive.service';
import { Toggle } from '../../models/data.models';

@Component({
  selector: 'app-toggles',
  imports: [AgGridAngular],
  templateUrl: './toggles.component.html',
  styleUrl: './toggles.component.scss'
})
export class TogglesComponent implements OnInit {
  rowData: Toggle[] = [];
  private gridApi: any;
  
  colDefs: ColDef[] = [
    { 
      headerName: 'Actions', 
      width: 100, 
      cellRenderer: (params: any) => {
        return '<button class="delete-btn">Delete</button>';
      },
      editable: false,
      filter: false,
      sortable: false
    },
    { field: 'toggle_name', headerName: 'Feature Name', width: 300, filter: 'agTextColumnFilter', sortable: true, editable: true },
    { field: 'toggle_image', headerName: 'Icon', width: 100, filter: 'agTextColumnFilter', sortable: true, editable: true }
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
    private googleDriveService: GoogleDriveService
  ) {}

  ngOnInit(): void {
    this.dataService.toggles$.subscribe(data => {
      this.rowData = data;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('delete-btn')) {
        this.deleteRow(event.node);
      }
    });
  }

  onCellValueChanged(event: any): void {
    this.saveData();
  }

  addRow(): void {
    const newRow: Toggle = {
      toggle_name: '',
      toggle_image: ''
    };
    this.rowData = [newRow, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.saveData();
  }

  deleteRow(node: any): void {
    if (confirm('Are you sure you want to delete this feature?')) {
      this.rowData = this.rowData.filter(row => row.toggle_name !== node.data.toggle_name);
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.saveData();
    }
  }

  saveData(): void {
    this.dataService.updateToggles(this.rowData);
  }

  exportData(): void {
    this.googleDriveService.exportData({ toggles: this.rowData });
  }

  async importData(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      try {
        const data = await this.googleDriveService.importDataFromFile(input.files[0]);
        if (data.toggles) {
          this.dataService.updateToggles(data.toggles);
          alert('Features imported successfully!');
        } else if (Array.isArray(data)) {
          this.dataService.updateToggles(data);
          alert('Features imported successfully!');
        } else {
          alert('Invalid file format. Expected toggles array.');
        }
      } catch (error) {
        alert('Error importing data: ' + error);
      }
    }
  }
}
