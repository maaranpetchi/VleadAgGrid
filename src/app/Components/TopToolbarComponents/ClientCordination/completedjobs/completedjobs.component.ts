import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LoginService } from 'src/app/Services/Login/login.service';
import { GetJobHistoryPopupComponent } from './completedjobpopupjobhistory/get-job-history-popup/get-job-history-popup.component';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { error } from 'jquery';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { SelectionModel } from '@angular/cdk/collections';
import { GridApi, ColDef, GridReadyEvent, CellClickedEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams, ColumnApi } from 'ag-grid-community';
import { ClientordinationindexComponent } from '../clientordinationindex/clientordinationindex.component';
import { JobDetailsClientIndexComponent } from '../query-to-client/job-details-client-index/job-details-client-index.component';
@Component({
  selector: 'app-completedjobs',
  templateUrl: './completedjobs.component.html',
  styleUrls: ['./completedjobs.component.scss']
})
export class CompletedjobsComponent implements OnInit {
  displayedColumns: string[] = [
    'selected',
    'jobnumber',
    'estjob',
    'department',
    'client',
    'customerclasiification',
    'clientstatus',
    'jobstatus',
    'parentjobid',
    'filename',
    'fileInwardMode',
    'fileReceivedEstDate',
    'jobcloseddate',
    'commentstoclient'
  ];

  dataSource: MatTableDataSource<any>;

  data: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnApi: ColumnApi;

  constructor(private http: HttpClient, private loginservice: LoginService, private dialog: MatDialog, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.getCompletedJobData();
  }
  //getting count
  CompletedJobsCount: number;

  getCompletedJobData(): void {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getCompletedJobs?EmpId=${this.loginservice.getUsername()}`).subscribe(data => {
      this.spinnerService.requestEnded();
      this.rowData= data.clientDetails.resultCompletedJobsList;
      this.CompletedJobsCount = data.clientDetails.resultForCompletedList;

    });
  }

  remarkValue: string = '';
  postdatabulk: any[] = [];

  selectedJobs: any[] = [];
  selectedQuery: any[] = [];

  bulkUpload() {
    this.spinnerService.requestStarted();
    this.gridApi.getSelectedRows().forEach(x => this.setAll(x));
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
    this.http.get<any>(environment.apiURL + `Allocation/getCompletedJobs?EmpId=${this.loginservice.getUsername()}`).subscribe(data => {
      this.spinnerService.requestEnded();
      this.postdatabulk = data.clientDetails.resultCompletedJobsList;

    });
    let bulkuploaddata = {
      "id": 0,
      "processId": 1,
      "statusId": 12,
      "selectedScopeId": 0,
      "autoUploadJobs": false,
      "employeeId": this.loginservice.getUsername(),
      "remarks": this.remarkValue,
      "isBench": true,
      "jobId": "",
      "value": 0,
      "amount": 0,
      "stitchCount": 0,
      "estimationTime": 0,
      "dateofDelivery": "2023-05-18T11:26:56.846Z",
      "comments": "",
      "validity": 0,
      "copyFiles": true,
      "updatedBy": 0,
      "jId": 0,
      "estimatedTime": 0,
      "tranMasterId": 0,
      "SelectedRows": this.selectedJobs,
      "selectedEmployees": [],
      "departmentId": 0,
      "updatedUTC": "2023-05-18T11:26:56.846Z",
      "categoryDesc": "",
      "allocatedEstimatedTime": 0,
      "tranId": 0,
      "fileInwardType": "",
      "timeStamp": "",
      "scopeId": 0,
      "quotationRaisedby": 0,
      "quotationraisedOn": "2023-05-18T11:26:56.846Z",
      "clientId": 0,
      "customerId": 0,
      "fileReceivedDate": "2023-05-18T11:26:56.846Z",
      "commentsToClient": "",
      "isJobFilesNotTransfer": true
    }
    this.spinnerService.requestStarted();

    this.http.post<any>(environment.apiURL + `Allocation/processMovement`, bulkuploaddata).subscribe(data => {
      this.spinnerService.requestEnded();

      if (data.success == true) {
        Swal.fire(
          'Done!',
          data.message,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.getCompletedJobData();
          }
        })
      }
      else {
        Swal.fire(
          'Error!',
          data.message,
          'error'
        )
      }
    });
  }


  getjobhistory(data) {
    const dialogRef = this.dialog.open(GetJobHistoryPopupComponent, {
      width: '100vw',
      data
    });
  }

  ///Select///
  selection = new SelectionModel<any>(true, []);
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
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    else if (this.filterValue) {
      this.selection.clear();
      this.dataSource.filteredData.forEach(x => this.selection.select(x));
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }

  }
  setAll(item: any) {
    this.selectedQuery.push({
      ...item,
      "Comments": item.Comments ? item.Comments : '',
      'CategoryDesc': item.CategoryDesc ? item.CategoryDesc : '',
      'SelectedRows': item.SelectedRows ? item.SelectedRows : [],
      'CommentsToClient': item.CommentsToClient ? item.CommentsToClient : '',
      'SelectedEmployees': item.SelectedEmployees ? item.SelectedEmployees : []
    });
  }


   //textcolor
   getCellClass(data) {
    console.log(data,"Colordata");
    
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
/////////////////////////Ag-grid module///////////////////////////////
context: any;

@ViewChild('agGrid') agGrid: any;

private gridApi!: GridApi<any>;


public defaultColDef: ColDef = {
  flex: 1,
  minWidth: 100,
  headerCheckboxSelection: isFirstColumn,
  checkboxSelection: isFirstColumn,
};

columnDefs: ColDef[] = [



  { headerName: 'JobNumber', field: 'jobId', filter: true,cellStyle: {color: 'skyblue', 'cursor':'pointer'}  },

  { headerName: 'EST Job /Query Date', field: 'jobDateEst', filter: true, },
  { headerName: 'Department', field: 'description', filter: true, },
  { headerName: 'Client', field: 'shortName', filter: true, },
  { headerName: 'CustomerClassification', field: 'customerClassification', filter: true, },
  { headerName: 'ClientStatus', field: 'customerType', filter: true, },
  { headerName: 'JobStatus', field: 'jobStatusDescription', filter: true, },
  { headerName: 'ParentJobId', field: 'parentjobid', filter: true, },
  { headerName: 'FileName', field: 'fileName', filter: true, },
  { headerName: 'File Inward Mode', field: 'fileInwardMode', filter: true, },
  { headerName: 'File Received EST Date', field: 'estfileReceivedDate', filter: true, },
  { headerName: 'JobClosedDate', field: 'jobClosedUtc', filter: true, },
  { headerName: 'CommentsToClient', field: 'commentsToClient', filter: true, },
];



public rowSelection: 'single' | 'multiple' = 'multiple';
public rowData!: any[];
public themeClass: string =
  "ag-theme-quartz";
  @ViewChild(ClientordinationindexComponent) ClientordinationindexComponent: ClientordinationindexComponent;

onGridReady(params: GridReadyEvent<any>) {
 this.gridApi = params.api;
 this.columnApi = params.columnApi;
 this.http.get<any>(environment.apiURL + `Allocation/getCompletedJobs?EmpId=${this.loginservice.getUsername()}`).subscribe((response) => (this.rowData = response.clientDetails.resultCompletedJobsList)); 

 }
 onCellClicked(event: CellClickedEvent) {
  const { colDef, data } = event;
  if (colDef.field === 'jobId') {
    console.log(data,"PopupData");
    this.getjobhistory(data)
  }
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
