import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, catchError } from 'rxjs';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';

@Component({
  selector: 'app-customer-salesmapping',
  templateUrl: './customer-salesmapping.component.html',
  styleUrls: ['./customer-salesmapping.component.scss'],
})
export class CustomerSalesmappingComponent implements OnInit {
  dropdownValues: any[] = [];
  selectedValue: string = '';
  selectedJobs: any;
  selectedCustomers: any;
  context: any = 'customersalesmapping';
  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private loginservice: LoginService,
  ) { }

  ngOnInit(): void {
    this.GetAllddlList();
  }
  selectedQuery: any[] = [];
  selectedEmployee: any[] = [];

  displayedColumns: string[] = [
    'selected',
    'customerName',
    'shortname',
    'classification',
    'salesemployee',
  ];
  displayedEmployeeColumns: string[] = [
    'selected',
    'employeecode',
    'salesemployee',
  ];


  // employee

  filterValue: any
  filterValue1: any

  checkAdmin(): Observable<any> {
    return this.http.get(
      environment.apiURL +
      `Account/checkIsAdmin/${this.loginservice.getUsername()}`
    );
  }
  checkUserName(): Observable<any> {
    return this.http.get(
      environment.apiURL +
      `Account/getEmployeeProcess/${this.loginservice.getUsername()}`
    );
  }

  setAll(item: any) {
    console.log(item)
    if (item.allocatedEstimatedTime == null) item.allocatedEstimatedTime = 0;
    if (item.employeeId == null) item.employeeId = 0;
    if (item.estimatedTime == null) item.estimatedTime = 0;
    this.selectedQuery.push({
      ...item,
      CategoryDesc: '',
      Comments: '',
      CommentsToClient: '',
      Remarks: '',
      SelectedEmployees: [],
      SelectedRows: [],
      customerId: [item.id],
      EmployeeName: "",
      EmployeeCode: item.employeeCode ? item.employeeCode : '',
      CustomerName: item.employeeName ? item.employeeName : '',
      ShortName: item.shortName ? item.shortName : '',
      isActive: false,
      isDeleted: false,
    });
  }

  setEmployeeAll(item: any) {
    this.selectedEmployee.push({
      ...item,
      // CategoryDesc: '',
      // Comments: '',
      // CommentsToClient: '',
      // FileInwardType: '',
      // JobId: 0,
      // Remarks: '',
      SelectedEmployees: [],
      SelectedRows: [],
      CustomerId: [0],
      CustomerName: item.employeeName ? item.employeeName : '',
      Description: item.employeeName ? item.employeeName : '',
      Name: item.employeeName ? item.employeeName : '',
      ShortName: item.employeeCode ? item.employeeCode : '',
      TimeStamp: '',
    });
  }
  onDropdownChange(): void {
    this.spinner.requestStarted();
    this.http
      .get<any[]>(
        environment.apiURL +
        `CustomerMapping/GetAllCustomerEmployee?Id=${this.selectedValue}`
      ).pipe(catchError((error) => {
        this.spinner.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      }))
      .subscribe({
        next: (response: any) => {
          this.spinner.requestEnded();
          this.rowData = response;

          this.GetAllddlList();
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log('Error loading table values:', err);
        },
      });
  }

  GetAllddlList() {
    this.spinner.requestStarted();
    this.http
      .get(environment.apiURL + 'CustomerMapping/GetAllddlList').pipe(catchError((error) => {
        this.spinner.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      }))
      .subscribe({
        next: (response: any) => {
          this.spinner.requestEnded();
          this.table2rowData = response.employeeList;

        },
        error(err) {
          console.log(err);
        },
      });
  }
  onSubmit() {
    this.spinner.requestStarted();
    this.gridApi1.getSelectedRows().forEach(x => this.setAll(x));
    this.gridApi2.getSelectedRows().forEach(x => this.setEmployeeAll(x));
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
    let selectedCustomerCount = this.selectedQuery.length;
    let selectedEmployeeCount = this.selectedEmployee.length;
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
    if (selectedCustomerCount != 0 && selectedEmployeeCount != 0) {
      // if (selectedCustomerCount > 1) {
      if (selectedEmployeeCount > 1) {
        alert('Please select one Employee!');
      } else {
        var savecustomervsSalesemp = {
          selectedCustomers: this.selectedJobs,
          selectedEmployee: this.selectedEmployee,
          // customerId: this.selectedCustomers.customerId,
          createdBy: this.loginservice.getUsername(),
        };
        this.http
          .post(
            environment.apiURL +
            `CustomerMapping/CreateCustomerVsSalesEmployee`,
            savecustomervsSalesemp
          ).pipe(catchError((error) => {
            this.spinner.requestEnded();
            return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
          }))
          .subscribe((response: any) => {
            if (response.message === "Salesperson assigned successfully") {
              // alert('added');
              this.spinner.requestEnded();

              Swal.fire(
                'Done!',
                'Salesperson assigned successfully!',
                'success'
              ).then((response) => {
                if (response.isConfirmed) {
                  this.rowData = [];
                  this.GetAllddlList();

                }
              })
            } else {
              Swal.fire(
                'Done!',
                'Salesperson assigned Failed!',
                'error'
              )
              this.spinner.resetSpinner()
            }
          });
        // }
      }
    } else {
      alert('Please select Customer and Employee');
    }
  }
  selection = new SelectionModel<Element>(true, []);
  selection1 = new SelectionModel<Element>(true, []);


  /////////////////////////Ag-grid module///////////////////////////////
  @ViewChild('agGrid1') agGrid1: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;

  private gridApi1!: GridApi;
  private gridApi2!: GridApi;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  public table2defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isSecondColumn,
    checkboxSelection: isSecondColumn,
  };

  table1def: ColDef[] = [
    { headerName: 'Customer Name ', field: 'name', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Short Name ', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Classification ', field: 'description', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Employee Code ', field: 'employeeNameCode', filter: 'agTextColumnFilter',
      floatingFilter: true, },

  ];
  table2def: ColDef[] = [

    { headerName: 'Employee code', field: 'employeeCode', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Sales Employee', field: 'employeeName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  ];






  public rowSelection: 'single' | 'multiple' = 'multiple';
  public table2rowSelection: 'single' | 'multiple' = 'multiple';

  public rowData: any[] = [];
  public table2rowData: any[] = [];

  public themeClass: string =
    "ag-theme-quartz";

  onGridReady1(params: GridReadyEvent) {
    this.gridApi1 = params.api;
  }

  onGridReady2(params: GridReadyEvent) {
    this.gridApi2 = params.api;
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
  selectedRows1: any;
  selectedRows2: any;


}
function isFirstColumn(
  params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

function isSecondColumn(
  params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsSecondColumn = displayedColumns[0] === params.column;
  return thisIsSecondColumn;
}