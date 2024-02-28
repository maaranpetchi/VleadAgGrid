import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { Observable, catchError } from 'rxjs';
import { EmployeePopupComponent } from '../employee-popup/employee-popup.component';
import { JobCategorypopupComponent } from '../job-categorypopup/job-categorypopup.component';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import {
  CellClickedEvent,
  CellValueChangedEvent,
  CheckboxSelectionCallbackParams,
  ColDef,
  GridApi,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
  SelectionChangedEvent,
} from 'ag-grid-community';
interface Employee {
  id: number;
  name: string;
  shift: string;
}
@Component({
  selector: 'app-proofreading-alocationtable',
  templateUrl: './proofreading-alocationtable.component.html',
  styleUrls: ['./proofreading-alocationtable.component.scss'],
})
export class ProofreadingAlocationtableComponent implements OnInit {
  exchangenumber: number;
  dataEmployeeSource: MatTableDataSource<Employee>;
  displayedEmployeeColumns: string[] = ['selected', 'employee', 'shift'];

  scopes: any[] = [];
  selectedScope: any = 0;
  selectedJobs: any[] = [];

  displayedColumns: string[] = [
    'selected',
    'jobId',
    'artist',
    'estjob',
    'fileName',
    'fileInwardMode',
    'client',
    'customerClassification',
    'jobstatus',
    'projectcode',
    'status',
    'scope',
    'esttime',
    'deliverydate',
  ];
  dataSource: MatTableDataSource<any>;
  //

  rowData!: any;
  rowEmpData!: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  private gridEmplApi!: GridApi<any>;
  colDefs: ColDef[] = [
    {
      headerName: 'Job Id',
      field: 'jobId',
      checkboxSelection: true,
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
      colId: 'jobIdColumn',
      cellStyle: { color: 'blue' },

      cellRenderer: function (params) {
        return (
          '<button class="btn btn-sm btn-link p-0">' +
          params.value +
          '</button>'
        );
      },
    },
    {
      headerName: 'Artist',
      field: 'artistName',
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
      colId: 'artistNameColumn',
    },
    {
      headerName: 'Employee(s)',
      field: 'employeeName',
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
      colId: 'employeeNameColumn',
      cellStyle: { color: 'blue' },

      cellRenderer: function (params) {
        return (
          '<button class="btn btn-sm btn-link p-0">' +
          params.value +
          '</button>'
        );
      },
    },
    {
      headerName: 'Est Job/ Query Date',
      field: 'jobDate_QueryDate',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Client',
      field: 'shortName',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Customer Classification',
      field: 'customerClassification',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
      filter: true,
    },

    {
      headerName: 'File Name',
      field: 'fileName',
      width: 50,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'File Inward Mode',
      field: 'fileInwardType',
      width: 50,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
    },

    {
      headerName: 'Job Status ',
      field: 'jobStatusDescription',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Project Code',
      field: 'projectCode',
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Scope',
      field: 'status',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Est Time',
      field: 'allocatedEstimatedTime',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: 'Delivery Date',
      field: 'dateofDelivery',
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
    },
  ];
  colEmpDefs: ColDef[] = [
    {
      headerName: 'Employee',
      field: 'employeenameWithCode',
      checkboxSelection: true,
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
      colId: 'employeeIdColumn',
      cellStyle: { color: 'blue' },
      cellRenderer: function (params) {
        return (
          '<button class="btn btn-sm btn-link p-0">' +
          params.value +
          '</button>'
        );
      },
    },
    {
      headerName: 'Shift',
      field: 'shiftName',
      headerClass: 'text-wrap',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
    },
  ];
  gridOptions1 = {
    pagination: true,
    paginationPageSize: 25,
  };
  EmpgridOptions = {
    pagination: true,
    paginationPageSize: 25,
  };
  context: any;
  @ViewChild('agGrid') agGrid: any;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  public defaultEmpColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    field: 'empCheckBoxValue',
    headerCheckboxSelection: isEmpColumn,
    checkboxSelection: isEmpColumn,
  };
  public themeClass: string = 'ag-theme-quartz';
  //

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  estTime: number;
  selection = new SelectionModel<Element>(true, []);

  constructor(
    private http: HttpClient,
    private loginservice: LoginService,
    private _dialog: MatDialog,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    //maintable
    this.freshJobs();
    //Employeetable
  }
  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.gridApi.setColumnVisible('jobIdColumn', true);
    this.gridApi.setColumnVisible('artistNameColumn', true);
    this.gridApi.setColumnVisible('employeeNameColumn', false);
  }
  onGridEmpReady(params: GridReadyEvent<any>) {
    // this.gridApi = params.api;
    this.gridEmplApi = params.api;
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`
      )
      .subscribe((response) => {
        this.rowEmpData = response.employees;
      });
  }
  onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log(`New Cell Valuejob: ${event.value}`);
  };
  onSelectionEmpChanged(event: SelectionChangedEvent) {
    const selectedEmpNodes = this.gridEmplApi.getSelectedNodes();
    console.log('Selected Rows:', selectedEmpNodes); // Update exchangeHeader with the estimated time of the first selected row
    selectedEmpNodes.forEach((item: any) => {
      if (item.data.jId != null)
        this.selectedEmployee.push({
          ...item.data,
          CategoryDesc: '',
          Comments: '',
          CommentsToClient: '',
          FileInwardType: '',
          JobId: 0,
          Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          TimeStamp: '',
          jId: 0,
          // estimatedTime: this.totalEstimateTime
        });
      else {
        this.selectedEmployee.push({
          ...item.data,
          jId: 0,
          CategoryDesc: '',
          Comments: '',
          CommentsToClient: '',
          FileInwardType: '',
          JobId: 0,
          Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          TimeStamp: '',
        });
      }
    });
  }
  onCellJobClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.colId === 'jobIdColumn') {
      console.log(data, 'PopupData');

      this.openEmployeeDialog(data);
    }
  }
  onCellEmpClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.colId === 'employeeIdColumn') {
      console.log(data, 'PopupData');

      this.openEmployeeDialog(data);
    }
  }

  //to save the checkbox value
  selectedQuery: any[] = [];
  selectedEmployee: any[] = [];

  setAllJobs(completed: boolean, item: any) {
    if (completed == true) {
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
      });
    } else {
      if (this.selectedQuery.find((x) => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter((x) => {
          if (x.id != item.id) {
            return item;
          }
        });
      }
    }
  }

  setEmployeeAll(completed: boolean, item: any) {
    if (completed == true) {
      if (item.jId != null)
        this.selectedEmployee.push({
          ...item,
          CategoryDesc: '',
          Comments: '',
          CommentsToClient: '',
          FileInwardType: '',
          JobId: 0,
          Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          TimeStamp: '',
        });
      else {
        this.selectedEmployee.push({
          ...item,
          jId: 0,
          CategoryDesc: '',
          Comments: '',
          CommentsToClient: '',
          FileInwardType: '',
          JobId: 0,
          Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          TimeStamp: '',
        });
      }
    } else {
      if (this.selectedEmployee.find((x) => x.id == item.id)) {
        this.selectedEmployee = this.selectedEmployee.filter((x) => {
          if (x.id != item.id) {
            return item;
          }
        });
      }
    }
  }

  exchangeHeader: number;
  benchChecked: boolean = false;
  onBenchCheckboxChange(event: any) {
    this.benchChecked = event.checked;
  }

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  tab(action) {
    if (action == '1') {
      this.freshJobs();
      this.gridApi.setColumnVisible('artistNameColumn', true);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
    } else if (action == '2') {
      this.gridApi.setColumnVisible('artistNameColumn', true);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
      this.revisionJobs();
    } else if (action == '3') {
      this.gridApi.setColumnVisible('artistNameColumn', true);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
      this.reworkJobs();
    } else if (action == '4') {
      this.gridApi.setColumnVisible('artistNameColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', true);
      this.allocaetdJobs();
    } else if (action == '5') {
      this.gridApi.setColumnVisible('artistNameColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
      this.queries();
    } else if (action == '6') {
      this.gridApi.setColumnVisible('artistNameColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
      this.queryResposne();
    } else if (action == '7') {
      this.gridApi.setColumnVisible('artistNameColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
      this.errorJobs();
    } else if (action == '8') {
      this.gridApi.setColumnVisible('artistNameColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
      this.quotationJobs();
    }
  }

  freshJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/1/0`
      )
      .pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        })
      )
      .subscribe({
        next: (freshJobs) => {
          this.spinnerService.requestEnded();
          this.rowData = freshJobs.allocationJobs;
          this.rowEmpData = freshJobs.employees;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        },
      });
  }
  revisionJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/2/0`
      )
      .pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        })
      )
      .subscribe({
        next: (revisionJobs) => {
          this.spinnerService.requestEnded();
          this.rowData= revisionJobs.allocationJobs;
          this.rowEmpData =revisionJobs.employees;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        },
      });
  }
  reworkJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/3/0`
      )
      .pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        })
      )
      .subscribe({
        next: (reworkJobs) => {
          this.spinnerService.requestEnded();
          this.rowData= reworkJobs.allocationJobs;
          this.rowEmpData =reworkJobs.employees;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        },
      });
  }
  allocaetdJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/4/0`
      )
      .pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        })
      )
      .subscribe({
        next: (allocaetdJobs) => {
          this.spinnerService.requestEnded();
          this.rowData= allocaetdJobs.allocationJobs;
          this.rowEmpData =allocaetdJobs.employees;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        },
      });
  }
  queries() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getQueryPendingJobs/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/6/0`
      )
      .pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        })
      )
      .subscribe({
        next: (queries) => {
          this.spinnerService.requestEnded();
          this.rowData= queries.queryPendingJobs;
          this.rowEmpData =queries.employees;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        },
      });
  }
  queryResposne() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getQueryResponseJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/6/0`
      )
      .pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        })
      )
      .subscribe({
        next: (queryResposne) => {
          this.spinnerService.requestEnded();
          this.rowData= queryResposne.queryResponseJobs;
          this.rowEmpData =queryResposne.employees;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        },
      });
  }
  errorJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/6/0`
      )
      .pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        })
      )
      .subscribe({
        next: (errorJobs) => {
          this.spinnerService.requestEnded();
          this.rowData= errorJobs.QueryResponseJobs;
          this.rowEmpData =errorJobs.employees;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        },
      });
  }
  quotationJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/7/0`
      )
      .pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        })
      )
      .subscribe({
        next: (quotationJobs) => {
          this.spinnerService.requestEnded();
          this.rowData= quotationJobs.allocationJobs;
          this.rowEmpData =quotationJobs.employees;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        },
      });
  }

  estTimeinput: any[] = [];

  afterCellEdit(rowEntity: any) {
    if (parseInt(this.loginservice.getProcessId()) == 2) {
      var colls = this.estTimeinput;
      var Esttime1 = colls[0].estimatedTime;
      var Esttime2 = colls[1].estimatedTime;
      var Esttime3 = colls[2].estimatedTime;
      var Esttime4 = colls[3].estimatedTime;
      var desc1 = colls[0].description;
      var desc2 = colls[1].description;
      var desc3 = colls[2].description;
      var desc4 = colls[3].description;
      var desc5 = colls[4].description;
      if (rowEntity.estTime <= Esttime1 && rowEntity.estTime > 0) {
        rowEntity.status = desc1;
      } else if (
        rowEntity.estTime <= Esttime2 &&
        rowEntity.estTime > Esttime1
      ) {
        rowEntity.status = desc2;
      } else if (
        rowEntity.estTime <= Esttime3 &&
        rowEntity.estTime > Esttime2
      ) {
        rowEntity.status = desc3;
      } else if (
        rowEntity.estTime <= Esttime4 &&
        rowEntity.estTime > Esttime3
      ) {
        rowEntity.status = desc4;
      } else if (rowEntity.estTime > Esttime4) {
        rowEntity.status = desc5;
      }
      this.selectedEmployee = this.selectedEmployee.map((x) => {
        if (x.employeeId == rowEntity.employeeId) {
          return { ...x, estTime: rowEntity.estTime, status: rowEntity.status };
        } else return x;
      });
    }
  }

  onKeyPress(event: KeyboardEvent, job: any) {
    if (event.key === 'Enter') {
      this.afterCellEdit(job);
    }
  }

  ScopeId: any;
  scopeChange(scope) {
    this.ScopeId = scope;
  }
  data: any;
  onSubmit(data: any) {
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
    var selectedJobCount = this.selectedJobs.length;
    var selectedEmployeeCount = this.selectedEmployee.length;
    if (this.loginservice.getProcessName() == 'Production Allocation') {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedJobCount > 1) {
          if (selectedEmployeeCount > 1) {
            alert('Please select one Employee!');
            // $('#alertPopup').modal('show');
          } else {
            for (var i = 0; i < selectedJobCount; i++) {
              if (
                this.selectedJobs[i].allocatedEstimatedTime == undefined ||
                this.selectedJobs[i].allocatedEstimatedTime == '' ||
                this.selectedJobs[i].allocatedEstimatedTime == 0
              ) {
                alert('Please enter Estimated Time for Selected Job');
                // $('#alertPopup').modal('show');
                return;
              }
            }
            this.postJobs(data);
          }
        } else {
          for (var i = 0; i < selectedEmployeeCount; i++) {
            if (
              this.selectedEmployee[i].estTime == undefined ||
              this.selectedEmployee[i].estTime == '' ||
              this.selectedEmployee[i].estTime == 0
            ) {
              alert('Please enter Estimated Time for Selected Employee');
              // $('#alertPopup').modal('show');
              return;
            }
          }
          this.postJobs(data);
        }
      } else {
        alert('Please select Job and Employeesss');
        // $('#alertPopup').modal('show');
      }
    } else {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedEmployeeCount > 1) {
          alert('Please select one Employee!');
          // $('#alertPopup').modal('show');
          return;
        }
        this.postJobs(data);
      } else {
        alert('Please select Job and Employee');
        // $('#alertPopup').modal('show');
      }
    }
  }
  postJobs(data: any) {
    let processMovement = {
      id: 0,
      processId: this.loginservice.getProcessId(),
      statusId: 1,
      selectedScopeId: this.ScopeId,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: 'string',
      isBench: this.benchChecked,
      jobId: 'string',
      value: 0,
      amount: 0,
      stitchCount: 0,
      estimationTime: 0,
      dateofDelivery: '2023-06-22T11:47:25.193Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: 0,
      jId: 0,
      estimatedTime: this.estTime !== 0 ? this.estTime : 0,
      tranMasterId: 0,
      selectedRows: this.selectedJobs,
      selectedEmployees: this.selectedEmployee,
      departmentId: 0,
      updatedUTC: '2023-06-22T11:47:25.193Z',
      categoryDesc: 'string',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: '',
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: '2023-06-22T11:47:25.193Z',
      clientId: 0,
      customerId: 0,
      fileReceivedDate: '2023-06-22T11:47:25.193Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };

    if (this.loginservice.getProcessName() == 'Quality Allocation') {
      this.ProcessMovementData('QARestriction', processMovement).subscribe(
        (result) => {
          var SameQAEmployeeJobList = processMovement.selectedRows.filter(
            function (item) {
              var exists = result.jids.some((x) => x == item.jId);
              return exists;
            }
          );

          var processedRows = processMovement.selectedRows.filter(function (
            item
          ) {
            var exists = result.jids.some((x) => x == item.jId);
            return !exists;
          });

          if (processedRows.length > 0) {
            processMovement.selectedRows = processedRows;

            this.jobMovement(processMovement);
          }
          if (SameQAEmployeeJobList.length > 0) {
            var strJobId = '';
            for (var i = 0; i < SameQAEmployeeJobList.length; i++) {
              if (i == 0) {
                strJobId += SameQAEmployeeJobList[i].JobId;
              } else {
                strJobId += ',' + SameQAEmployeeJobList[i].JobId;
              }
            }
            alert('Following Job Ids are assigne to same employee ' + strJobId);
          }
        }
      );
    } else {
      this.jobMovement(processMovement);
    }
  }

  jobMovement(processMovement) {
    var confirmationMessage: any;
    let AttachedFiles = [];
    this.selectedJobs = processMovement.selectedRows;
    this.selectedEmployee = processMovement.selectedEmployees;
    this.http
      .post(environment.apiURL + 'Allocation/processMovement', processMovement)
      .subscribe((result) => {
        confirmationMessage = result;
      });
    if (AttachedFiles.length > 0) {
      var fd = new FormData();
      for (let i = 0; i < AttachedFiles.length; i++) {
        fd.append('file', AttachedFiles[i]);
      }
      let file = {
        orderId: 0,
        isClientOrder: 0,
        processId: 0,
        statusId: 0,
        sourcePath: 'string',
        dynamicFolderPath: 'string',
        folderPath: 'string',
        fileName: 'string',
        fileCount: 0,
        wfmId: 0,
        wftId: 0,
        orignalPath: 'string',
        orignalDynamicPath: 'string',
        jobId: 'string',
        isProcessWorkFlowTranInserted: 0,
        isCopyFiles: 0,
        pid: 0,
        fakeProcessId: 0,
        fakeStatusId: 0,
        fakeDynamicFolderPath: 'string',
        jobFileName: 'string',
        files: ['string'],
        message: 'string',
        creditMessage: 'string',
        clientName: 'string',
        clientId: 0,
      };
      this.spinnerService.requestStarted();
      const orderId = processMovement.orderId;
      const processId = this.data.processId;
      const statusId = this.data.statusId;
      this.http
        .post(
          environment.apiURL +
            `File/uploadFiles/${orderId}/0/${processId}/${statusId}/1/${processId}/${statusId}`,
          file
        )
        .subscribe({
          next: (data) => {
            this.spinnerService.requestEnded();
            AttachedFiles = [];
          },
          error: (err) => {
            this.spinnerService.resetSpinner();
            console.log(err);
          },
        });
    }
  }

  onSubmits(type: any, data: any) {
    var confirmationMessage: any;

    if (type == 'AllocationForm') {
      const submitted = true;
      // if (scopeValidate.$valid) {
      confirmationMessage = 'Allocate selected job(s)?';
      // $('#conformationPopup').modal('show');
      // }
    } else if (type == 'QueryForm') {
      const querySubmitted = true;
      // if (popupSubmitForm.$valid) {
      confirmationMessage = 'Send this job as query?';
      if (data.Status == 100) {
        confirmationMessage = 'Change Estimated Time?';
      } else if (data.Status == 6 || data.Status == 8) {
        confirmationMessage = 'Send this job as query?';
      } else if (data.Status == 5) {
        confirmationMessage = 'Cancel This Job?';
      } else {
        confirmationMessage = 'Move this job to next process?';
      }
      // $('#conformationPopup').modal('show');
      // }
    } else if (type == 'QuotationForm') {
      const quotationquerySubmitted = true;
      // if (QuotationpopupSubmitForm.$valid) {
      confirmationMessage = 'Send this job as quotation?';
      // $('#conformationPopup').modal('show');
      // }
    }
  }

  ProcessMovementData(url: string, data: any): Observable<any> {
    return this.http.post(
      environment.apiURL + 'Allocation/QARestriction ',
      data
    );
  }
  openjobDialog(data: any) {
    const dialogRef = this._dialog.open(JobCategorypopupComponent, {
      width: '100%',
      height: '450px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.freshJobs();
        }
      },
    });
  }
  openEmployeeDialog(data: any) {
    const dialogRef = this._dialog.open(EmployeePopupComponent, {
      width: '100%',
      height: '450px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.freshJobs();
        }
      },
    });
  }

  //textcolor
  getCellClass(data) {
    console.log(data, 'Colordata');

    return {
      'text-color-green': data.employeeCount === 1,
      'text-color-brown': data.queryJobDate !== null,
      'text-color-blue': data.employeeCount > 1,
      'text-color-DeepSkyBlue': data.customerJobType === 'Trial',
      'text-color-yellow': data.statusId === 10,
      'text-color-red': data.statusId === 11,
      SuperRush:
        data.jobStatusId === 1 ||
        data.jobStatusId === 3 ||
        data.jobStatusId === 7,
      Rush:
        data.jobStatusId === 2 ||
        data.jobStatusId === 4 ||
        data.jobStatusId === 8,
    };
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
function isEmpColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsisEmpColumn = displayedColumns[0] === params.column;
  return thisIsisEmpColumn;
}
