import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JobHistoryService } from 'src/app/Services/JobHistory/job-history.service';
import { JobhistoryDetailsComponent } from '../jobhistory-details/jobhistory-details.component';
import { SpinnerService } from '../../Spinner/spinner.service';
import { environment } from 'src/Environments/environment';
import { catchError, map } from 'rxjs';
import { error } from 'jquery';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { ClientordinationindexComponent } from '../../TopToolbarComponents/ClientCordination/clientordinationindex/clientordinationindex.component';
import { JobDetailsClientIndexComponent } from '../../TopToolbarComponents/ClientCordination/query-to-client/job-details-client-index/job-details-client-index.component';
@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.scss']
})
export class JobHistoryComponent implements OnInit {
  selectedFilter: number;
  selectedClient: number;
  recordCount: number;
  selectedFileName: string;
  fromDate: string;
  toDate: string;
  clients: any[];

  selectedInvoices: any[] = [];


  client: boolean = false;
  customers: boolean = false;
  dateFields: boolean = false;
  inputField: boolean = false;
  columnApi: any;


  constructor(
    private _service: JobHistoryService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private spinnerService: SpinnerService,
  ) { }

  displayedColumns: string[] = [
    'jobnumber',
    'estqueryDate',
    'department',
    'client',
    'clientstatus',
    'jobstatus',
    'projectCode',
    'filename',
    'fileinward',
    'filereceived',
    'process',
    'status',
    'comments',

  ];



  ngOnInit(): void {
    this.onGoButtonClick()

    const records = [];

  }

  myForm = new FormGroup({
    selectdropdown: new FormControl("", Validators.required),
    client: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required),
    filename: new FormControl(""),
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  });

  onFilterChange() {
    if (this.selectedFilter == 1 || this.selectedFilter == 2 || this.selectedFilter == 0) {
      this.customers = false;
      this.inputField = false;
      this.dateFields = false;
      this.selectedFileName = '';
      this.fromDate = '';
      this.toDate = '';

      this.selectedClient = 0;
    }
    if (this.selectedFilter == 3) {
      this.customers = true;
      this.inputField = false;
      this.dateFields = false;
      this.selectedFileName = '';
      this.fromDate = '';
      this.toDate = '';

      this.spinnerService.requestStarted();
      this.http.get<any>(environment.apiURL + 'Customer/GetCustomers').pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
        }),
        map((clientdata: any[]) => {
          // Sort the client data array based on client name
          return clientdata.sort((a, b) => a.shortName.localeCompare(b.shortName));
        })
      ).subscribe(sortedClients => {
        this.spinnerService.requestEnded();
        this.clients = sortedClients;
      });

    }
    else if (this.selectedFilter == 4) {
      this.inputField = true;
      this.customers = false;
      this.dateFields = false;
      this.selectedClient = 0;
      this.fromDate = '';
      this.toDate = '';

    }

    else if (this.selectedFilter == 6) {
      this.inputField = false;
      this.customers = false;
      this.dateFields = true;
      this.selectedClient = 0;
      this.selectedFileName = '';

    }
  };
  onGoButtonClick() {

    if (this.selectedClient != undefined || this.selectedFileName != undefined || this.selectedFilter != undefined || this.fromDate != undefined || this.toDate != undefined) {
      if ((this.selectedClient == undefined || this.selectedClient == null)) {
        this.selectedClient = 0;
      }
      if ((this.selectedFileName == undefined || this.selectedFileName == null || this.selectedFileName == '')) {
        this.selectedFileName = '';
      }
      var departmentId = this.selectedFilter;
      if (departmentId == 3 || departmentId == 4 || departmentId == 6) {
        departmentId = 0;
      }
      var jobOrder = {
        "clientId": this.selectedClient,
        "departmentId": departmentId,
        "transactionId": 0,
        "jobClosedUTC": "",
        "dateofUpload": "",
        "fileName": this.selectedFileName
      };
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + 'Allocation/getJobMovementJobsWithclientIdfileName', jobOrder).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(response => {
        this.spinnerService.requestEnded();
        this.rowData = response.jobMovement;
        this.recordCount = response.jobMovement.length;
   

      })
    }
  };
  setAll(completed: boolean, item: any) {
    if (completed == true) {
      this.selectedInvoices.push({ id: item.id })
    }
    else {

      if (this.selectedInvoices.find(x => x.id == item.id)) {
        this.selectedInvoices = this.selectedInvoices.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
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
    { headerName: 'JobId', field: 'jobId',filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { color: 'skyblue', 'cursor': 'pointer' } },
    { headerName: 'Est Job/Query Date', field: 'estJobDate',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Department Query', field: 'description',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Client', field: 'shortName',filter: 'agTextColumnFilter',
      floatingFilter: true, },

    { headerName: 'Client Status', field: 'customerJobType',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Status', field: 'jobStatusDescription',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Project Code', field: 'projectCode',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'File Name', field: 'fileName',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'File Inward Mode', field: 'fileInwardType',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'File Received Date', field: 'fileReceivedDate',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Process Name', field: 'processName',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Status', field: 'status',filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Comments To Client', field: 'commentsToClient',filter: 'agTextColumnFilter',
      floatingFilter: true, },
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[]=[];
  public themeClass: string =
    "ag-theme-quartz";
  @ViewChild(ClientordinationindexComponent) ClientordinationindexComponent: ClientordinationindexComponent;


  onCellClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'jobId') {
      console.log(data, "PopupData");

      this.getJobHistory(data);
    }
  }


  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
   
    }

  getJobHistory(data) {
    this.dialog.open(JobhistoryDetailsComponent, {
      height: '80vh',
      width: '80vw',
      data: data
    })
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
