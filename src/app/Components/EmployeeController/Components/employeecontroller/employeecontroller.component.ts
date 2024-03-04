
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Services/EmployeeController/Core/core.service';
import { EmployeeService } from 'src/app/Services/EmployeeController/employee.service';
import { json } from 'stream/consumers';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { EditService } from 'src/app/Services/Displayorhideform/edit-service.service';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { EditaddemployeecontrollerComponent } from '../../editaddemployeecontroller/editaddemployeecontroller.component';
import { catchError } from 'rxjs';
import { error } from 'jquery';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { EmpskillactionrenderingComponent } from 'src/app/Components/EmployeeVSSkillset/empskillactionrendering/empskillactionrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
@Component({
  selector: 'app-employeecontroller',
  templateUrl: './employeecontroller.component.html',
  styleUrls: ['./employeecontroller.component.scss']
})
export class EmployeecontrollerComponent implements OnInit {

  @ViewChild(EditaddemployeecontrollerComponent, { static: false }) editComponent: EditaddemployeecontrollerComponent;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isDeletedInclude = false;
  isResignInclude = false;
  context: any = 'employee';

  constructor(private _dialog: MatDialog,
    private router: Router,
    private editService: EditService,
    private _empService: EmployeeService,
    private loginservice: LoginService,
    private _coreService: CoreService,
    private http: HttpClient,
    private spinnerService: SpinnerService,
    private sharedDataService:SharedService) {
      this.sharedDataService.refreshData$.subscribe(() => {
        // Update your data or call the necessary methods to refresh the data
        this.fetchtableData();
      });
     }


  ngOnInit(): void {
    this.fetchtableData();
  }





  openEditForm(id: number) {
    this.spinnerService.requestStarted();
    this.http.get<any[]>(environment.apiURL + `Employee/GetEmployeeDetailsByID?employeeID=${id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.spinnerService.requestEnded();
      this._empService.setData({ type: 'EDIT', data: results });
      this._empService.shouldFetchData = true;
      this.router.navigate(['/topnavbar/Emp-editaddEmpcontroller']);
    });

  }

  viewEmployee(id: number) {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Employee/GetEmployeeDetailsByID?employeeID=${id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.spinnerService.requestEnded();
      this._empService.setViewData({ type: 'View', data: results });
      this._empService.shouldFetchViewData = true;
      this.router.navigate(['/topnavbar/Emp-addeditEmpcontroller']);

    })
  }
  //Delete Functionality
  deleteEmployee(id: number) {
    this.spinnerService.requestStarted();

    this._empService.deleteEmployee(id).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        Swal.fire('Done!', 'Employee Data Deleted Successfully!', 'success').then((response) => {
          if (response.isConfirmed) {
            this.fetchtableData();
          }
        });
      },
      error: console.log,
    });
  }

  ///////////////////
  apiResponseData: any;
  displayedColumns: string[] = [
    'employeeCode',
    'employeeName',
    'departmentId',
    'designationId',
    'profiencyId',
    'reportingManager1',
    'reportLeader1',
    'action',
  ];

  fetchtableData() {
    this.spinnerService.requestStarted();
    this._empService.getEmployeeList().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({

      next: (res) => {
        this.spinnerService.requestEnded();
        this.rowData = res;
      },
      error: console.log,
    });
  }



  openAddEditEmployee() {
    this._empService.shouldFetchData = false;
    // this._empService.setData({ type: 'ADD'});      
    this.router.navigate(['/topnavbar/Emp-editaddEmpcontroller']);
  }


  onCheckboxChange(event, id: number) {
    if (id == 1) {
      this.isDeletedInclude = event.checked;
    }
    else {
      this.isResignInclude = event.checked;
    }
    if (this.isDeletedInclude || this.isResignInclude) {
      this.spinnerService.requestStarted();
      this.http.get<any>(environment.apiURL + `Employee/GetEmployeeWithDelete?IsDeleted=${this.isDeletedInclude ? 1 : 0}&IsResigned=${this.isResignInclude ? 1 : 0}`).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(data => {
        this.spinnerService.requestEnded();
        this.rowData = data;
      });
    } else {
      this.fetchtableData();
    }
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
    { headerName: 'Department', field: 'departmentDesc', filter: true, },
    { headerName: 'Designation', field: 'designationDesc', filter: true, },
    { headerName: 'Proficiency', field: 'profiencyDesc', filter: true, },
    { headerName: 'Reporting Manager', field: 'managerName1', filter: true, },
    { headerName: 'Reporting Leader', field: 'leaderName1', filter: true, },
   
    {
      headerName: 'Actions',
      cellStyle: {innerWidth:20},

      field: 'action',
      cellRenderer: EmpskillactionrenderingComponent, // JS comp by Direct Reference
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