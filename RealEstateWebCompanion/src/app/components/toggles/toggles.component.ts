import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
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
      field: 'toggle_image',
      headerName: 'Icon',
      width: 110,
      filter: 'agTextColumnFilter',
      sortable: true,
      editable: false
    },
    {
      headerName: 'Feature Name (FR)',
      width: 350,
      valueGetter: params => params.data?.toggle_name_fr ?? params.data?.toggle_name ?? '',
      filter: 'agTextColumnFilter',
      sortable: true,
      editable: false
    },
    {
      headerName: 'Feature Name (EN)',
      width: 350,
      valueGetter: params => params.data?.toggle_name_en ?? params.data?.toggle_name ?? '',
      filter: 'agTextColumnFilter',
      sortable: true,
      editable: false
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

  constructor(
    private dataService: DataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataService.toggles$.subscribe(data => {
      this.rowData = data;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }
}
