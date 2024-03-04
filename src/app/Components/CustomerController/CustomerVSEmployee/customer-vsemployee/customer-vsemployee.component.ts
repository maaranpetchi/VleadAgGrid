
import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { CustomerVSEmployeeService } from 'src/app/Services/CustomerVSEmployee/customer-vsemployee.service';
import { AddEditCustomerVSEmployeeComponent } from '../add-edit-customer-vsemployee/add-edit-customer-vsemployee.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import FileSaver from 'file-saver';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { customernormsrenderingcomponent } from 'src/app/Components/CustomerNorms/customernormsindex/customerNormsRendering.component';
import { environment } from 'src/Environments/environment';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
@Component({
  selector: 'app-customer-vsemployee',
  templateUrl: './customer-vsemployee.component.html',
  styleUrls: ['./customer-vsemployee.component.scss']
})
export class CustomerVSEmployeeComponent implements OnInit {

  displayedColumns: string[] = [
    'customerClassification',
    'employeeNameCode',
    'name',
    'shortName',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isDeletedInclude = false;
  isResignInclude = false;
context: any="customervsemployee";

  constructor(private _dialog: MatDialog,
    private spinnerService: SpinnerService,
    private _empService: CustomerVSEmployeeService,
    private _coreService: CoreService,
    private router: Router,
    private sharedDataService:SharedService,
    private http: HttpClient) {

      this.sharedDataService.refreshData$.subscribe(() => {
        // Update your data or call the necessary methods to refresh the data
        this.getEmployeeList();
      });
     }

  ngOnInit(): void {
    this.getEmployeeList();
  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditCustomerVSEmployeeComponent, {
      height: '70vh',
      width: '140vw'
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

    this._empService.getEmployeeList().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({

      next: (res) => {
        this.rowData = res;
        this.spinnerService.requestEnded();
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
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
    { headerName: 'customer Classification', field: 'customerClassification', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Employee', field: 'employeeName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Customer Name', field: 'name', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Short Name', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: customernormsrenderingcomponent, // JS comp by Direct Reference
      autoHeight: true,
    }
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[]=[];
  public themeClass: string =
    "ag-theme-quartz";

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this._empService.getEmployeeList().subscribe((response) => (this.rowData = response));
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