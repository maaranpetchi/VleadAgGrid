import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BuddyProofService } from 'src/app/Services/CoreStructure/BuddyProof/buddy-proof.service';
import { BuddyProofComponent } from '../buddy-proof/buddy-proof.component';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SewOutService } from 'src/app/Services/CoreStructure/SewOut/sew-out.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { Router } from '@angular/router';
import { WorkflowService } from 'src/app/Services/CoreStructure/WorkFlow/workflow.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { catchError } from 'rxjs';
import { error } from 'jquery';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { ClientordinationindexComponent } from '../../ClientCordination/clientordinationindex/clientordinationindex.component';
import { actionrendering } from '../../Production/actionrendering.component';
import { bulkuploadrendering } from '../../Production/bulkuploadrendering.component';
import { EndRenderingComponent } from '../../Production/endrendering.component';
import { StartRenderingComponent } from '../../Production/startrendering.component';
import { workflowrendering } from '../../Production/workflowrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-buddy-proof-table',
  templateUrl: './buddy-proof-table.component.html',
  styleUrls: ['./buddy-proof-table.component.scss']
})
export class BuddyProofTableComponent implements OnInit {

  scopes: any[] = [];
  selectedScope: any = 0;

  displayedColumns: string[] = [
    'selected',
    'jobId',
    'estjob',
    'actions',
    'client',
    'customerSatisfaction',
    'fileName',
    'fileInwardMode',
    'scope',
    'jobstatus',
    'projectcode',
    'allocatedby',
    'artistname',
    'processstatus',
    'esttime',
    'jobcategory',
    'deliverydate'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnApi: any;

  constructor(private http: HttpClient, private buddyService: BuddyProofService, private buddyproofcomponent: BuddyProofComponent, private loginservice: LoginService, private sewOutService: SewOutService, private _coreService: CoreService, private router: Router, private workflowservice: WorkflowService, private spinnerservice: SpinnerService,private sharedDataService:SharedService) { }

  ngOnInit(): void {
    //maintable
    this.freshJobs();
  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  //to save the checkbox value
  selectedQuery: any[] = [];

  setAll(completed: boolean, item: any) {

    if (completed == true) {
      this.selectedQuery.push(item)
    }
    else {

      if (this.selectedQuery.find(x => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
  }

  benchChecked: boolean = false;
  onBenchCheckboxChange(event: any) {
    this.benchChecked = event.checked;
  }
  tab(action) {
    if (action == '1') {
      this.freshJobs();
    }
    else if (action == '2') {
      this.revisionJobs();
    }
    else if (action == '3') {
      this.reworkJobs();
    }
    else if (action == '4') {
      this.quoteJobs();
    }
    else if (action == '5') {
      this.sewOut();
    }
    else if (action == '6') {
      this.bulkJobs();
    }
    else if (action == '6') {
      this.bulkUploadJobs();
    }
  }


  freshJobs() {
    this.spinnerservice.requestStarted();
    this.buddyService.getTabValue1().subscribe(freshJobs => {
      this.spinnerservice.requestEnded();
      this.rowData = freshJobs.getWorkflowDetails;
      this.displayScopeDropdown = false;
    });
  }
  revisionJobs() {
    this.spinnerservice.requestStarted();
    this.buddyService.getTabValue2().subscribe(revisionJobs => {
      this.spinnerservice.requestEnded();
      this.rowData = revisionJobs.getWorkflowDetails;
      this.displayScopeDropdown = false;
    });
  }
  reworkJobs() {
    this.spinnerservice.requestStarted();
    this.buddyService.getTabValue3().subscribe(reworkJobs => {
      this.spinnerservice.requestEnded();
      this.rowData = reworkJobs.getWorkflowDetails;
      this.displayScopeDropdown = false;
    });
  }
  quoteJobs() {
    this.spinnerservice.requestStarted();
    this.buddyService.getTabValue4().subscribe(quoteJobs => {
      this.spinnerservice.requestEnded();
      this.rowData = quoteJobs.getWorkflowDetails;
      this.displayScopeDropdown = false;
    });
  }
  sewOut() {
    this.spinnerservice.requestStarted();
    this.buddyService.getTabValue5().subscribe(sewOut => {
      this.spinnerservice.requestEnded();
      this.rowData =sewOut.getWorkflowDetails;
      this.displayScopeDropdown = false;

    });
  }

  displayScopeDropdown: boolean = false; // hide a scope dropdown
  bulkJobs() {
    this.spinnerservice.requestStarted();
    this.buddyService.getTabValue6().subscribe(bulkJobs => {
      this.spinnerservice.requestEnded();
      this.rowData = bulkJobs.getWorkflowDetails;
      this.displayScopeDropdown = true;
    });
  }
  bulkUploadJobs() {
    this.spinnerservice.requestStarted();
    this.buddyService.getTabValue7().subscribe(bulkUploadJobs => {
      this.spinnerservice.requestEnded();
      this.rowData = bulkUploadJobs.getWorkflowDetails;
      this.displayScopeDropdown = false;

    });
  }


  scopeDropdown() {
    this.spinnerservice.requestStarted();
    this.buddyService.getScopeDropdown().subscribe(scopedata => {
      this.spinnerservice.requestEnded();
      this.scopes = scopedata.scopeDetails


    })
  }

  getTabValue() {

    return this.buddyproofcomponent.getCurrentTab();
  }

  lnkviewedit(data) {

    console.log(data, "BulkData");


    if (data.processId == 8 || data.processId == 10) {
      let selectedJobs = [{
        DepartmentId: data.departmentId,
        TranMasterId: data.tranMasterId,
        TimeStamp: data.timeStamp,
        TranId: data.tranId,
        JId: data.jid,
        CustomerId: data.customerId,
        JobId: data.jobId,
        Comments: data.commentsToClient ? data.commentsToClient : '',
        CategoryDesc: data.categoryDesc,
        SelectedRows: [],
        FileInwardType: data.fileInwardType,
        CommentsToClient: data.commentsToClient ? data.commentsToClient : '',
        SelectedEmployees: [],
      }];
      let selectedEmployees = [{
        EmployeeId: this.loginservice.getUsername(),
        JobId: data.jobId,
        TimeStamp: data.timeStamp,
        Comments: data.commentsToClient ? data.commentsToClient : '',
        CategoryDesc: data.categoryDesc,
        SelectedRows: [],
        FileInwardType: data.fileInwardType,
        CommentsToClient: data.commentsToClient ? data.commentsToClient : '',
        SelectedEmployees: [],
      }];
      var processMovement = {
        "id": 0,
        "processId": data.processId,
        "statusId": 1,
        "selectedScopeId": 0,
        "autoUploadJobs": true,
        "employeeId": this.loginservice.getUsername(),
        "remarks": "string",
        "isBench": true,
        "jobId": "string",
        "value": 0,
        "amount": 0,
        "stitchCount": 0,
        "estimationTime": 0,
        "dateofDelivery": "2023-07-11T12:10:42.205Z",
        "comments": "string",
        "validity": 0,
        "copyFiles": true,
        "updatedBy": 0,
        "jId": 0,
        "estimatedTime": 0,
        "tranMasterId": 0,
        "selectedRows": selectedJobs,
        "selectedEmployees": selectedEmployees,
        "departmentId": 0,
        "updatedUTC": "2023-07-11T12:10:42.205Z",
        "categoryDesc": "string",
        "allocatedEstimatedTime": 0,
        "tranId": 0,
        "fileInwardType": "string",
        "timeStamp": data.timeStamp,
        "scopeId": 0,
        "quotationRaisedby": 0,
        "quotationraisedOn": "2023-07-11T12:10:42.205Z",
        "clientId": 0,
        "customerId": 0,
        "fileReceivedDate": "2023-07-11T12:10:42.205Z",
        "commentsToClient": "string",
        "isJobFilesNotTransfer": true
      }
      this.spinnerservice.requestStarted()
      this.http.post<any>(environment.apiURL + `Allocation/processMovement`, processMovement).pipe(catchError((error) => {
        this.spinnerservice.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(result => {
        this.spinnerservice.requestEnded();
        if (result.Success == true) {
          console.log(result, "ProcessId9");

          localStorage.setItem("WFTId", result.wftId);
          localStorage.setItem("WFMId", result.wfmid);
          localStorage.setItem("JId", data.JId);
          localStorage.setItem("processid", result.processId);
          this.workflowservice.setData(data);

          this.router.navigate(['/topnavbar/qualityworkflow']);
        }
        else {
          if (result.success == true) {
            localStorage.setItem("WFTId", result.wftId);
            localStorage.setItem("WFMId", result.wfmid);
            localStorage.setItem("JId", data.JId);
            localStorage.setItem("processid", result.processId);
            this.workflowservice.setData(data);
            this.router.navigate(['/topnavbar/qualityworkflow']);
          }
          else {
            Swal.fire('info', result.message, 'info').then((res) => {
              if (res.isConfirmed) {
                this.BindPendingJobs();
              }
            });
          }
        }
      });
    }
    else {
      if (data.processId == 9 || data.processId == 11) {
        localStorage.setItem("WFTId", data.tranId);
        localStorage.setItem("WFMId", data.tranMasterId);
        localStorage.setItem("JId", data.jid);
        localStorage.setItem("processid", data.processId);
        this.workflowservice.setData(data);

        this.router.navigate(['/topnavbar/qualityworkflow']);
      }
      else {
        localStorage.setItem("WFTId", data.wftid);
        localStorage.setItem("WFMId", data.wfmid);
        localStorage.setItem("JId", data.jid);
        localStorage.setItem("processid", data.processId);
        // $location.path('/ProcessTransaction');
        this.workflowservice.setData(data);

        this.router.navigate(['/topnavbar/qualityworkflow']);
      }
    }
  };


  BindPendingJobs() {
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).subscribe(result => {
    });
  }




  /////////////////Start end workflow bulkupload/////////////////////


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
    { headerName: 'Job Id', field: 'jobId', filter: true, cellStyle: { color: 'skyblue', 'cursor': 'pointer' } },

    { headerName: 'EST Job/Query Date', field: 'estjobDate', filter: true, },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: actionrendering, // JS comp by Direct Reference
      autoHeight: true,
    }
  ,
    { headerName: 'Client', field: 'shortName', filter: true, },
    { headerName: 'Customer Classification', field: 'customerClassification', filter: true, },
    { headerName: 'File Name', field: 'fileName', filter: true, },
    { headerName: 'File Inward Mode', field: 'fileInwardType', filter: true, },
    { headerName: 'Scope', field: 'scopeDesc', filter: true, },
    { headerName: 'Job Status', field: 'jobStatusDescription', filter: true, },
    { headerName: 'Project Code', field: 'projectCode', filter: true, },
    { headerName: 'Allocated By', field: 'employeeName', filter: true, },
    { headerName: 'Artist Name', field: 'employeeName', filter: true, },
    { headerName: 'Process Status', field: 'workStatus', filter: true, },
    { headerName: 'Est Time', field: 'estimatedTime', filter: true, },
    { headerName: 'Job Category', field: 'jobCategoryDesc', filter: true, },
    { headerName: 'DeliveryDate', field: 'dateofDelivery ', filter: true, },
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: any[];
  public themeClass: string =
    "ag-theme-quartz";
  @ViewChild(ClientordinationindexComponent) ClientordinationindexComponent: ClientordinationindexComponent;


  onDivisionChange() {
    console.log(this.selectedScope, "SelectDivi");

    this.sharedDataService.setData(this.selectedScope);
  }




  onCellClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'jobId') {
      console.log(data, "PopupData");

    }

  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.freshJobs();

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
