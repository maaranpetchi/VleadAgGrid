

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { EmployeevsprocessService } from 'src/app/Services/CustomerVSProcess/employeevsprocess.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { DeleteActionRenderingComponent } from 'src/app/Components/EmployeeVSDivision/delete-action-rendering/delete-action-rendering.component';
@Component({
  selector: 'app-customervsprocess',
  templateUrl: './customervsprocess.component.html',
  styleUrls: ['./customervsprocess.component.scss']
})
export class CustomervsprocessComponent implements OnInit {
  customerClassification: any;
  submitted: boolean = false;
  displayedColumns: string[] = [
    'description',
    'shortName',
    'currentProcess',
    'statusDescription',
    'nextProcess',
    'jobStatusDescription',
    'scope',
    'customJobType',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isDeletedInclude = false;
  isResignInclude = false;

  selecteddepartmentOption: any = '';
  selectedcustomerOption: any = '';
  selectedCustomerScopeStatus: any = '';

  Departmentdropdownvalues: any[] = [];
  Customerdropdownvalues: any[] = [];
  customerscopedropdownvalues: any[] = [];

  options = [
    { value: 'Live', viewValue: 'Live' },
    { value: 'Trial', viewValue: 'Trial' }

  ];
context: any="customervsprocess";

  constructor(private _dialog: MatDialog,
    private spinnerService: SpinnerService,
    private _empService: EmployeevsprocessService,
    private _coreService: CoreService,
    private router: Router,
    private http: HttpClient,
    private loginservice: LoginService,
    private snackBar: MatSnackBar,
    private sharedDataService: SharedService) {
    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.getEmployeeList();
    });

  }


  showDropdown: boolean = false;

  myForm = new FormGroup({

    departmentList: new FormControl("", Validators.required),
    employeeName: new FormControl("", Validators.required),
    customer: new FormControl("", Validators.required),
    customerscopestatus: new FormControl('', Validators.required),
    scopeName: new FormControl('', Validators.required),
    jobStatusDescription: new FormControl('', Validators.required),
    currentProcessList: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    NextProcess: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.getEmployeeList();
    this.getDepartmentList();
    this.getAllDDL();
    this.getAllCustomers();
  }
  getDepartmentList() {
    this.spinnerService.requestStarted();
    this._empService.getOptions()
      .subscribe(options => {
        this.spinnerService.requestEnded();
        this.departmentList = options;
      });
  }

  getAllDDL() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'CustomerVsProcess/GetAllddlList').subscribe(data => {
      this.spinnerService.requestEnded();
      this.data = data;
    });
  }

  getAllCustomers() {
    this.spinnerService.requestStarted();
    this.http.get<any[]>(environment.apiURL + 'user/getallcustomers')
      .subscribe(customers => {
        this.spinnerService.requestEnded();
        this.customers = customers.sort((a, b) => a.name.localeCompare(b.name));
      });
  }
  onOptionSelected(event: any, myForm: FormGroup) {

    if (myForm.value.customerscopestatus.length > 0) {
      this._empService.changeapi({
        "customerId": myForm.value.customer == '' ? 0 : myForm.value.customer,
        "deptId": myForm.value.departmentList,
        "customerJobType": myForm.value.customerscopestatus,
      }).subscribe(data => {
        this.scopeList = data.getScopeList;
      })
    }
    else {
      return;
    }
  }

  getEmployeeList() {
    this.spinnerService.requestStarted();
    this._empService.getEmployeeList().subscribe({

      next: (res) => {
        this.spinnerService.requestEnded();

        this.rowData = res;

        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: console.log,
    });
  }

  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id: number) {
    this.spinnerService.requestStarted();
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this._empService.changeapi({
          "customerId": this.myForm.value.customer == '' ? 0 : this.myForm.value.customer,
          "deptId": this.myForm.value.departmentList,
          "customerJobType": this.myForm.value.customerscopestatus,
        }).subscribe(data => {
          this.scopeList = data.getScopeList;

        })

      },
      error: console.log,
    });
  }


  departmentList: any[];
  selectedDepartmentOption: string;
  selectedCustomerOption: string;
  selectedCustomerScopeStatusOption: string;
  selectedjobStatusOption: string;
  selectedscopeOption: string;
  selectedCurrentProcessOption: string;
  selectedStatusOption: string;
  selectedNextProcessOption: string;
  values: any[] = [];
  customers: any[] = [];


  data: any = {
    departmentList: [],
    jobstatuslist: [],
    statuslist: [],
    currentProcessList: [],
  };


  scopeList: any[] = [];
  showAlert() {
    this.snackBar.open('This is a stylish alert message!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['my-snackbar']
    });
  }

  onSubmit() {
    this.spinnerService.requestStarted();
    this.submitted = true;
    this.http.post<any>(environment.apiURL + 'CustomerVsProcess/AddProcessworkflow', {
      "selectedScopes": this.myForm.value.scopeName,
      "departmentId": this.myForm.value.departmentList,
      "customerId": this.myForm.value.customer,
      "jobStatusId": this.myForm.value.jobStatusDescription,
      "customJobType": this.myForm.value.customerscopestatus,
      "currentProcessId": this.myForm.value.currentProcessList,
      "nextProcessId": this.myForm.value.NextProcess,
      "statusId": this.myForm.value.status,
      "createdBy": parseInt(this.loginservice.getUsername())
    }).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (response) => {
        // clear form fields
        this.spinnerService.requestEnded();
        Swal.fire(
          'Done!',
          response.message,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.myForm.reset();
            this.getEmployeeList();
          }
        })
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


  refreshPage() {
    window.location.reload();
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
    { headerName: 'Department', field: 'description', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Customer', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Current Process', field: 'currentProcess', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Status', field: 'statusDescription', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Next Process', field: 'nextProcess', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Status', field: 'jobStatusDescription', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Scope', field: 'scope', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Customer Scope Status', field: 'customJobType', filter: 'agTextColumnFilter',
      floatingFilter: true, },

    {
      headerName: 'Actions',
      cellStyle: { innerWidth: 20 },

      field: 'action',
      cellRenderer: DeleteActionRenderingComponent, // JS comp by Direct Reference
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
