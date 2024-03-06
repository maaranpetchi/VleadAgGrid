import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { Observable, catchError } from 'rxjs';
import { QualitypopupjobassignComponent } from '../qualitypopupjobassign/qualitypopupjobassign.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeePopupTableComponent } from '../employee-popup-table/employee-popup-table.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { SelectionModel } from '@angular/cdk/collections';
import { CellClickedEvent, CellValueChangedEvent, CheckboxSelectionCallbackParams, ColDef, GridApi, GridReadyEvent, HeaderCheckboxSelectionCallbackParams, SelectionChangedEvent } from 'ag-grid-community';
import { JoballocatedEmplpopupComponent } from '../../ProductionAllocation/joballocated-emplpopup/joballocated-emplpopup.component';
interface Employee {
  id: number;
  name: string;
  shift: string;
}

@Component({
  selector: 'app-qualityallocationtable',
  templateUrl: './qualityallocationtable.component.html',
  styleUrls: ['./qualityallocationtable.component.scss'],
})
export class QualityallocationtableComponent implements OnInit {
  exchangenumber: number;
  dataEmployeeSource: MatTableDataSource<Employee>;
  selection = new SelectionModel<Element>(true, []);
  displayedEmployeeColumns: string[] = ['selected', 'employee', 'shift'];

  scopes: any[] = [];
  selectedScope: any = 0;
  selectedJobs: any[] = [];

  // AG Grid Table Data
  rowData!: any;
  rowEmpData!: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi;
  private gridEmplApi!: GridApi<any>;
  private gridColumnApi;
  colDefs: ColDef[] = [
    {
      headerName: 'Job Id',
      field: 'jobId',
      checkboxSelection: true,
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
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
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      colId: 'artistNameColumn',
    },
    {
      headerName: 'Employee(s)',
      field: 'employeeName',
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
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
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Client',
      field: 'shortName',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Customer Classification',
      field: 'customerClassification',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },

    {
      headerName: 'File Name',
      field: 'fileName',
      width: 50,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'File Inward Mode',
      field: 'fileInwardType',
      width: 50,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },

    {
      headerName: 'Job Status ',
      field: 'jobStatusDescription',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Project Code',
      field: 'projectCode',
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Scope',
      field: 'status',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Est Time',
      field: 'allocatedEstimatedTime',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      editable: true,
    },

    {
      headerName: 'Delivery Date',
      field: 'dateofDelivery',
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    }
  ];
  colEmpDefs: ColDef[] = [
    {
      headerName: 'Employee', field: 'employeenameWithCode', checkboxSelection: true, width: 100, headerClass: "text-wrap", suppressSizeToFit: true, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { color: 'blue' }, cellRenderer: function (params) {
        return '<button class="btn btn-sm btn-link p-0">' + params.value + '</button>';
      }
    },
    { headerName: 'Shift', field: 'shiftName', headerClass: "text-wrap", width: 100, suppressSizeToFit: true, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, },

  ]
  // public defaultEmpColDef: ColDef = {
  //   resizable: true, sortable: true, filter: 'agTextColumnFilter',
  //     floatingFilter: true, editable: true, flex: 1,
  //   minWidth: 100,
  //   headerCheckboxSelection: isFirstColumn,
  //   checkboxSelection: isFirstColumn,
  // };
  // public defaultColDef: ColDef = {
  //   resizable: true, sortable: true, filter: 'agTextColumnFilter',
  //     floatingFilter: true, editable: true, flex: 1,
  //   minWidth: 100,
  //   headerCheckboxSelection: isFirstColumn,
  //   checkboxSelection: isFirstColumn,
  // };
  selectedEmpNodes: any;
  settingFirstData: any[] = [];
  frstrow: any;
  secondrow: any;
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnVisible('jobIdColumn', true);
    this.gridApi.setColumnVisible('artistNameColumn', true);
    this.gridApi.setColumnVisible('employeeNameColumn', false);
    // this.http
    // .get<any>(
    //   environment.apiURL +
    //   `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
    //     this.loginservice.getUsername()
    //   )}/${parseInt(this.loginservice.getProcessId())}/1/0`
    // )
    //   .subscribe((data) => (this.rowData = data.employees));
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
  onCellJobClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.colId === 'jobIdColumn') {
      console.log(data, "PopupData");

      this.openjobDialog(data);
    } else if (colDef.colId === 'employeeNameColumn') {
      console.log(data, "PopupData");

      this.getemployeeName(data);
    }
  }
  getemployeeName(data: any) {
    const dialogRef = this._dialog.open(JoballocatedEmplpopupComponent, {
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
  onCellEmpClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'employeenameWithCode') {
      console.log(data, "PopupData");

      this.openEmployeeDialog(data);
    }
  }
  onSelectionChanged = (event: SelectionChangedEvent) => {
    const selectedNodes = this.gridApi.getSelectedRows();
    console.log('Selected  frst Rows:', selectedNodes); // Update exchangeHeader with the estimated time of the first selected row
    // if (selectedNodes.length > 0) {
    //   this.exchangeHeader = selectedNodes[0].data.estimatedTime;
    // } else {
    //   // If no row is selected, reset exchangeHeader
    //   this.exchangeHeader = null;
    // // }
    // selectedNodes.forEach((item: any) => {
    //   if (item.data.allocatedEstimatedTime == null) item.data.allocatedEstimatedTime = 0;
    //   if (item.data.employeeId == null) item.data.employeeId = 0;
    //   if (item.data.estimatedTime == null) item.data.estimatedTime = 0;
    //   this.selectedQuery.push({
    //     ...item.data,
    //     CategoryDesc: '',
    //     Comments: '',
    //     CommentsToClient: '',
    //     Remarks: '',
    //     SelectedEmployees: [],
    //     SelectedRows: [],
    //   });
    // })
    // console.log(this.selectedNodes, "SelectedQuery");

  }
  onSelectionEmpChanged(event: SelectionChangedEvent) {
    this.selectedEmpNodes = this.gridEmplApi.getSelectedRows();
    console.log('Selected 2nd Rows:', this.selectedEmpNodes); // Update exchangeHeader with the estimated time of the first selected row
    // this.selectedEmpNodes.forEach((item: any) => {
    //   if (item.data.jId != null)
    //     this.selectedEmployee.push({
    //       ...item.data,
    //       CategoryDesc: '',
    //       Comments: '',
    //       CommentsToClient: '',
    //       FileInwardType: '',
    //       JobId: 0,
    //       Remarks: '',
    //       SelectedEmployees: [],
    //       SelectedRows: [],
    //       TimeStamp: '',
    //       jId: 0
    //       // estimatedTime: this.totalEstimateTime
    //     });
    //   else {
    //     this.selectedEmployee.push({
    //       ...item.data,
    //       jId: 0,
    //       CategoryDesc: '',
    //       Comments: '',
    //       CommentsToClient: '',
    //       FileInwardType: '',
    //       JobId: 0,
    //       Remarks: '',
    //       SelectedEmployees: [],
    //       SelectedRows: [],
    //       TimeStamp: '',

    //     });
    //   }
    // })

  }
  // Handle cell editing event
  onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log(`New Cell Value: ${event.value}`)
  }

  onCellEmployeeValueChanged = (event: CellValueChangedEvent) => {
    console.log(`New Cell Value: ${event.value}`)
  }
  // 
  displayedColumns: string[] = [
    'selected',
    'jobId',
    'artist',
    'estjob',
    'client',
    'customerClassification',
    'fileName',
    'fileInwardMode',
    'jobstatus',
    'projectcode',
    'status',
    'scope',
    'esttime',
    'deliverydate',
  ];


  visibility() {
    let result: string[] = [];
    if (this.displayedColumnsvisibility.selected) {
      result.push('selected');
    }

    if (this.displayedColumnsvisibility.jobId) {
      result.push('jobId');
    }
    if (this.displayedColumnsvisibility.employees) {
      result.push('employees');
    }
    if (this.displayedColumnsvisibility.artist) {
      result.push('artist');
    }
    if (this.displayedColumnsvisibility.estjob) {
      result.push('estjob');
    }
    if (this.displayedColumnsvisibility.querydate) {
      result.push('querydate');
    }
    if (this.displayedColumnsvisibility.client) {
      result.push('client');
    }
    if (this.displayedColumnsvisibility.customerClassification) {
      result.push('customerClassification');
    }
    if (this.displayedColumnsvisibility.fileName) {
      result.push('fileName');
    }
    if (this.displayedColumnsvisibility.fileInwardMode) {
      result.push('fileInwardMode');
    }
    if (this.displayedColumnsvisibility.jobstatus) {
      result.push('jobstatus');
    }
    if (this.displayedColumnsvisibility.projectcode) {
      result.push('projectcode');
    }
    if (this.displayedColumnsvisibility.status) {
      result.push('status');
    }
    if (this.displayedColumnsvisibility.scope) {
      result.push('scope');
    }
    if (this.displayedColumnsvisibility.esttime) {
      result.push('esttime');
    }
    if (this.displayedColumnsvisibility.deliverydate) {
      result.push('deliverydate');
    }
    return result;
  }

  displayedColumnsvisibility: any = {
    'selected': true,
    'jobId': true,
    'employees': false,
    'artist': true,
    'querydate': false,
    'estjob': true,
    'client': true,
    'customerClassification': true,
    'fileName': true,
    'fileInwardMode': true,
    'jobstatus': true,
    'projectcode': true,
    'status': true,
    'scope': true,
    'esttime': true,
    'deliverydate': true,
  };

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  estTime: number;
  confirmationMessage: Object;

  constructor(
    private http: HttpClient,
    private loginservice: LoginService,
    private _dialog: MatDialog,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.freshJobs();
  }

  filterValue: any = null;
  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyEmployeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataEmployeeSource.filter = filterValue.trim().toLowerCase();

    if (this.dataEmployeeSource.paginator) {
      this.dataEmployeeSource.paginator.firstPage();
    }
  }

  //to save the checkbox value
  selectedQuery: any[] = [];
  selectedEmployee: any[] = [];




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
    this.spinner.requestStarted();
    this.displayedColumnsvisibility.employees = false;
    this.displayedColumnsvisibility.artist = true;
    this.displayedColumnsvisibility.querydate = false;
    this.displayedColumnsvisibility.estjob = true;
    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
          this.loginservice.getUsername()
        )}/${parseInt(this.loginservice.getProcessId())}/1/0`
      ).pipe(catchError((error) => {
        this.spinner.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(response => {
        this.spinner.requestEnded();
        this.rowData = response.allocationJobs;
        this.rowEmpData = response.employees;
      })
  }
  revisionJobs() {
    this.spinner.requestStarted();
    this.displayedColumnsvisibility.querydate = false;
    this.displayedColumnsvisibility.employees = false;
    this.displayedColumnsvisibility.artist = true;
    this.displayedColumnsvisibility.estjob = true;

    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
          this.loginservice.getUsername()
        )}/${parseInt(this.loginservice.getProcessId())}/2/0`
      )
      .subscribe({
        next: (revisionJobs) => {
          this.spinner.requestEnded();
          this.rowData = revisionJobs.allocationJobs;
          this.rowEmpData = revisionJobs.employees;
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log(err);
        },
      });
  }
  reworkJobs() {
    this.spinner.requestStarted();
    this.displayedColumnsvisibility.querydate = false;
    this.displayedColumnsvisibility.employees = false;
    this.displayedColumnsvisibility.artist = true;
    this.displayedColumnsvisibility.estjob = true;

    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
          this.loginservice.getUsername()
        )}/${parseInt(this.loginservice.getProcessId())}/3/0`
      )

      .subscribe({
        next: (reworkJobs) => {
          this.spinner.requestEnded();
          this.rowData = reworkJobs.allocationJobs;
          this.rowEmpData = reworkJobs.employees;
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log(err);
        },
      });
  }
  allocaetdJobs() {
    this.spinner.requestStarted();
    this.displayedColumnsvisibility.artist = false;
    this.displayedColumnsvisibility.estjob = true;
    this.displayedColumnsvisibility.querydate = false;
    this.displayedColumnsvisibility.employees = true;
    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
          this.loginservice.getUsername()
        )}/${parseInt(this.loginservice.getProcessId())}/4/0`
      )
      .subscribe({
        next: (allocaetdJobs) => {
          this.spinner.requestEnded();
          this.rowData = allocaetdJobs.allocationJobs;
          this.rowEmpData = allocaetdJobs.employees;
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log(err);
        },
      });
  }
  queries() {
    this.spinner.requestStarted();
    this.displayedColumnsvisibility.querydate = true;
    this.displayedColumnsvisibility.employees = false;
    this.displayedColumnsvisibility.artist = false;
    this.displayedColumnsvisibility.estjob = false;

    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getQueryPendingJobs/${parseInt(
          this.loginservice.getUsername()
        )}/${parseInt(this.loginservice.getProcessId())}/0`
      ).subscribe({
        next: (queries) => {
          this.spinner.requestEnded();
          this.rowData = queries.queryPendingJobs;
          this.rowEmpData = queries.employees;
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log(err);
        },
      });

  }
  queryResposne() {
    this.spinner.requestStarted();
    this.displayedColumnsvisibility.artist = false;
    this.displayedColumnsvisibility.querydate = false;
    this.displayedColumnsvisibility.employees = false;
    this.displayedColumnsvisibility.estjob = true;

    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getQueryResponseJobsAndEmployees/${parseInt(
          this.loginservice.getUsername()
        )}/${parseInt(this.loginservice.getProcessId())}/4/0`
      )
      .subscribe({
        next: (queryResposne) => {
          this.spinner.requestEnded();
          this.rowData = queryResposne.queryResponseJobs;
          this.rowEmpData = queryResposne.employees;
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log(err);
        },
      });
  }
  errorJobs() {
    this.spinner.requestStarted();
    this.displayedColumnsvisibility.artist = false;
    this.displayedColumnsvisibility.querydate = false;
    this.displayedColumnsvisibility.employees = false;
    this.displayedColumnsvisibility.estjob = true;

    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
          this.loginservice.getUsername()
        )}/${parseInt(this.loginservice.getProcessId())}/5/0`
      )
      .subscribe({
        next: (errorJobs) => {
          this.spinner.requestEnded();
          this.rowData = errorJobs.allocationJobs;
          this.rowEmpData = errorJobs.employees;
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log(err);
        },
      });
  }
  quotationJobs() {
    this.spinner.requestStarted();
    this.displayedColumnsvisibility.artist = false;
    this.displayedColumnsvisibility.querydate = false;
    this.displayedColumnsvisibility.employees = false;
    this.displayedColumnsvisibility.estjob = true;

    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
          this.loginservice.getUsername()
        )}/${parseInt(this.loginservice.getProcessId())}/7/0`
      )
      .subscribe({
        next: (quotationJobs) => {
          this.spinner.requestEnded();
          this.rowData = quotationJobs.allocationJobs;
          this.rowEmpData = quotationJobs.employees;
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log(err);
        },
      });
  }


  //Changes in quality allocation

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


    var selectedJobCount = this.gridApi.getSelectedRows().length;
    var selectedEmployeeCount: any = this.gridEmplApi.getSelectedRows().length;
    this.frstrow = this.gridApi.getSelectedRows();

    this.frstrow.forEach((item) => {
      item.CategoryDesc = '';
      item.Comments = '';
      item.CommentsToClient = '';
      item.Remarks = '';
      item.SelectedEmployees = [];
      item.SelectedRows = [];
      item.employeeId = item.employeeId ? item.employeeId : 0,
      item.estimatedTime = item.estimatedTime ? item.estimatedTime : 0,
      item.allocatedEstimatedTime = item.allocatedEstimatedTime ? item.allocatedEstimatedTime : 0,
      item.dateofDelivery = item.dateofDelivery ? item.dateofDelivery : new Date().toISOString,
      item.employeeCount = item.employeeCount ? item.employeeCount : 0,
      item.employeeName = item.employeeName ? item.employeeName : "",
      item.queryJobDate = item.queryJobDate ? item.queryJobDate : ""
    });

    this.secondrow = this.gridEmplApi.getSelectedRows()


    this.secondrow.forEach((item) => {
      item.CategoryDesc = '',
        item.Comments = '',
        item.CommentsToClient = '',
        item.FileInwardType = '',
        item.JobId = 0,
        item.Remarks = '',
        item.SelectedEmployees = [],
        item.SelectedRows = [],
        item.TimeStamp = '',
        item.jId = 0
      
    });

    console.log(selectedJobCount, 'selectedjobCount');
    console.log(selectedEmployeeCount, 'selectedEmployeeCount');



    var processName = this.loginservice.getProcessName();
    console.log(processName, "ProcessName");

    if (this.loginservice.getProcessName() == 'Quality Allocation') {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedJobCount > 1) {
          if (selectedEmployeeCount > 1) {
            Swal.fire('Info!', 'Please select one Employee', 'info');
            // $('#alertPopup').modal('show');
          } else {
            // for (var i = 0; i < selectedJobCount; i++) {
            //   if (
            //     this.selectedJobs[i].allocatedEstimatedTime == undefined ||
            //     this.selectedJobs[i].allocatedEstimatedTime == '' ||
            //     this.selectedJobs[i].allocatedEstimatedTime == 0
            //   ) {
            //     Swal.fire(
            //       'Info!',
            //       'Please enter Estimated Time for Selected Job',
            //       'info'
            //     );
            //     // $('#alertPopup').modal('show');
            //     return;
            //   }
            // }
            this.postJobs(data);
          }
        } else {
          // for (var i = 0; i < selectedEmployeeCount; i++) {
          //   if (
          //     this.selectedEmployee[i].estTime == undefined ||
          //     this.selectedEmployee[i].estTime == '' ||
          //     this.selectedEmployee[i].estTime == 0
          //   ) {
          //     Swal.fire(
          //       'Info!',
          //       'Please enter Estimated Time for Selected Employee',
          //       'info'
          //     );
          //     // $('#alertPopup').modal('show');
          //     return;
          //   }
          // }
          this.postJobs(data);
        }
      } else {
        Swal.fire('Info!', 'Please select Job and Employeesss', 'info');
        // $('#alertPopup').modal('show');
      }
    } else {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedEmployeeCount > 1) {
          Swal.fire('Info!', 'Please select one Employee!', 'info');
          // $('#alertPopup').modal('show');
          return;
        }
        this.postJobs(data);
      } else {
        Swal.fire('Info!', 'Please select Job and Employee', 'info');
        // $('#alertPopup').modal('show');
      }
    }
  }
  postJobs(data: any) {
    let processMovement = {
      id: 0,
      processId: this.loginservice.getProcessId(),
      statusId: 1,
      selectedScopeId: this.ScopeId ? this.ScopeId : 0,
      autoUploadJobs: false,
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
      selectedRows: this.frstrow,
      selectedEmployees: this.secondrow,
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
            if (result.success == false) {
              Swal.fire(
                'Info!',
                result.message,
                'info'
              ).then((res) => {
                if (res.isConfirmed) {
                  window.location.reload();
                }
              });
            }
            else {
              Swal.fire(
                'Info!',
                result.message,
                'info'
              );
            }
            // alert('Following Job Ids are assigne to same employee ' + strJobId);
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
    this.spinner.requestStarted();
    this.http
      .post<any>(
        environment.apiURL + 'Allocation/processMovement',
        processMovement
      )
      .subscribe((result: any) => {
        this.confirmationMessage = result.message;
        this.spinner.requestEnded();

        Swal.fire('Done!', result.message, 'success').then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      });


    if (AttachedFiles.length > 0) {
      var fd = new FormData();
      for (let i = 0; i < AttachedFiles.length; i++) {
        fd.append('file', AttachedFiles[i]);
      }
      const orderId = processMovement.orderId;
      const processId = this.data.processId;
      const statusId = this.data.statusId;
      this.spinner.requestStarted();
      this.http
        .post<any>(
          environment.apiURL +
          `/${orderId}/0/${processId}/${statusId}/1/${processId}/${statusId}`,
          processMovement
        )
        .subscribe((response) => {
          if (response) {
            this.spinner.requestEnded();

            AttachedFiles = [];
          } else {
            this.spinner.resetSpinner();
          }
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
    const dialogRef = this._dialog.open(QualitypopupjobassignComponent, {
      width: '100%',
      height: '450px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.ngOnInit();
        }
      },
    });
  }
  openEmployeeDialog(data: any) {
    const dialogRef = this._dialog.open(EmployeePopupTableComponent, {
      width: '100%',
      height: '450px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.ngOnInit();
        }
      },
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else if (this.filterValue) {
      this.selection.clear();
      this.dataSource.filteredData.forEach((x) => this.selection.select(x));
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  //textcolor
  getCellClass(data) {

    return {
      'text-color-green': data.employeeCount === 1,
      'text-color-brown': data.queryJobDate !== null,
      'text-color-blue': data.employeeCount > 1,
      'text-color-DeepSkyBlue': data.customerJobType === 'Trial',
      'text-color-yellow': data.statusId === 10,
      'text-color-red': data.statusId === 11,
      'SuperRush': data.jobStatusId === 1 || data.jobStatusId === 3 || data.jobStatusId === 7,
      'Rush': data.jobStatusId === 2 || data.jobStatusId === 4 || data.jobStatusId === 8
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