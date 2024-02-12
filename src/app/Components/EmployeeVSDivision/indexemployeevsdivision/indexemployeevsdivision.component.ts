
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmpvsdivService } from 'src/app/Services/EmployeeVSDivision/empvsdiv.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/Services/EmployeeVSDivision/Core/core.service';
import { AddeditemployeevsdivisionComponent } from '../addeditemployeevsdivision/addeditemployeevsdivision.component';
import { SpinnerService } from '../../Spinner/spinner.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { EmpskillactionrenderingComponent } from '../../EmployeeVSSkillset/empskillactionrendering/empskillactionrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import { DeleteActionRenderingComponent } from '../delete-action-rendering/delete-action-rendering.component';
@Component({
  selector: 'app-indexemployeevsdivision',
  templateUrl: './indexemployeevsdivision.component.html',
  styleUrls: ['./indexemployeevsdivision.component.scss']
})
export class indexemployeevsdivisionComponent implements OnInit {
  displayedColumns: string[] = [
    'employeeCode',
    'employeeName',
    'divisionName',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  context: any = "EmployeeVsDivision";

  constructor(
    private spinnerService: SpinnerService,
    private _dialog: MatDialog,
    private _empService: EmpvsdivService,
    private _coreService: CoreService,
    private sharedDataService: SharedService
  ) {
    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.getEmployeeList();
    });

  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddeditemployeevsdivisionComponent, {
      //height: '80vh',
      //width: '80vw'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this.spinnerService.requestStarted();

    this._empService.getEmployeeList().pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();
        this.rowData = res.gEvDList;
      },
      error: console.log,
    });
  }


  deleteEmployee(id: number) {
    this.spinnerService.requestStarted();
    this._empService.deleteEmployee(id).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        Swal.fire('Done!', 'Division deleted successfully', 'success').then((response) => {
          if (response.isConfirmed) {
            this.getEmployeeList();
          }
        });
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddeditemployeevsdivisionComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
  /////////////////////////Ag-grid module///////////////////////////////
  @ViewChild('agGrid') agGrid: any;

  private gridApi!: GridApi<any>;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };

  columnDefs: ColDef[] = [
    { headerName: 'EmployeeCode ', field: 'employeeCode', filter: true, },
    { headerName: 'EmployeeName ', field: 'employeeName', filter: true, },
    { headerName: 'Division', field: 'divisionName', filter: true, },

    {
      headerName: 'Actions',
      cellStyle: { innerWidth: 20 },

      field: 'action',
      cellRenderer: DeleteActionRenderingComponent, // JS comp by Direct Reference
      autoHeight: true,
    }
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: any[];
  public themeClass: string =
    "ag-theme-quartz";

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this._empService.getEmployeeList().subscribe((response) => (this.rowData = response.gEvDList));
  }

  handleCellValueChanged(params: { colDef: ColDef, newValue: any, data: any }) {
    console.log(params, "Parameter");
    console.log(params.data, "ParameterData");
    let parameterData = params.data
    if (params.colDef.field === 'filecount') { // Check if the changed column is 'price'

    }
  }


  handlePress(newvalue, parameterData) {
    console.log(newvalue, "HandlepressNewValue");
    console.log(parameterData, "ParameterValue");

  }


}

function isFirstColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}
