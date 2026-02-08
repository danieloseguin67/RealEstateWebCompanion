import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
import { GoogleDriveService } from '../../services/google-drive.service';
import { UnitType } from '../../models/data.models';

@Component({
  selector: 'app-unit-types',
  imports: [AgGridAngular],
  templateUrl: './unit-types.component.html',
  styleUrl: './unit-types.component.scss'
})
export class UnitTypesComponent implements OnInit {
  rowData: UnitType[] = [];
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
    { field: 'unit_type_name', headerName: 'Unit Type', width: 300, filter: 'agTextColumnFilter', sortable: true, editable: true }
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
    this.dataService.unitTypes$.subscribe(data => {
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
    const newRow: UnitType = {
      unit_type_name: ''
    };
    this.rowData = [newRow, ...this.rowData];
    this.gridApi?.setGridOption('rowData', this.rowData);
    this.saveData();
  }

  deleteRow(node: any): void {
    if (confirm('Are you sure you want to delete this unit type?')) {
      this.rowData = this.rowData.filter(row => row.unit_type_name !== node.data.unit_type_name);
      this.gridApi?.setGridOption('rowData', this.rowData);
      this.saveData();
    }
  }

  saveData(): void {
    this.dataService.updateUnitTypes(this.rowData);
  }

  exportData(): void {
    this.googleDriveService.exportData({ unitTypes: this.rowData });
  }

  async importData(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      try {
        const data = await this.googleDriveService.importDataFromFile(input.files[0]);
        if (data.unitTypes) {
          this.dataService.updateUnitTypes(data.unitTypes);
          alert('Unit Types imported successfully!');
        } else if (Array.isArray(data)) {
          this.dataService.updateUnitTypes(data);
          alert('Unit Types imported successfully!');
        } else {
          alert('Invalid file format. Expected unitTypes array.');
        }
      } catch (error) {
        alert('Error importing data: ' + error);
      }
    }
  }
}
