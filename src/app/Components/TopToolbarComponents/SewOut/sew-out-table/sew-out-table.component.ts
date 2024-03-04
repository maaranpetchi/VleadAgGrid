import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SewOutService } from 'src/app/Services/CoreStructure/SewOut/sew-out.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsSewPopComponent } from '../SewOut-JobDetailsPopup/job-details-sew-pop/job-details-sew-pop.component';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { SewOutComponent } from '../sew-out/sew-out.component';
import { SewoutworkflowComponent } from '../SewOut-JobDetailsPopup/sewoutworkflow/sewoutworkflow.component';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { environment } from 'src/Environments/environment';
import { WorkflowService } from 'src/app/Services/CoreStructure/WorkFlow/workflow.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { ClientordinationindexComponent } from '../../ClientCordination/clientordinationindex/clientordinationindex.component';
import { actionrendering } from '../../Production/actionrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
@Component({
  selector: 'app-sew-out-table',
  templateUrl: './sew-out-table.component.html',
  styleUrls: ['./sew-out-table.component.scss']
})
export class SewOutTableComponent implements OnInit {

  scopes: any[];
  selectedScope: any = 0;
  // Variable to store the selected tab value

  displayedColumns: string[] = [
    'selected',
    'jobId',
    'estjob',
    'fileName',
    'action',
    'fileInwardMode',
    'client',
    'customerSatisfaction',
    'scope',
    'jobstatus',
    'projectcode',
    'allocatedby',
    'processstatus',
    'esttime',
    'jobcategeory',
    'deliverydate'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sewout') SewOutComponent: SewOutComponent;
  columnApi: any;
  constructor(private http: HttpClient, private sewOutService: SewOutService, private router: Router, private dialog: MatDialog, private loginservice: LoginService, private _coreService: CoreService, private SewOutComponent1: SewOutComponent, private workflowservice: WorkflowService, private spinnerservice: SpinnerService, private sharedDataService: SharedService) {
    this.SewOutComponent = SewOutComponent1
  }

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
    // Store the selected tab value
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
    else if (action == '7') {
      this.bulkUploadJobs();
    }
  }

  jids: string[] = []; //to get the jid to pass into edit restapi

  openModalWithData(data) {
    const dialogRef = this.dialog.open(JobDetailsSewPopComponent, {
      // width: '80vw',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any logic after the modal is closed (if needed)
      console.log('The dialog was closed');
    });
  }

  getWorkflowJobList(job) {
    const jid = job.jid; // Extract the jid from the clicked job
    // Create the payload for the POST API request
    const payload = { jid: jid };
    this.sewOutService.navJobDetails(jid).subscribe(data => {
      this.openModalWithData(data);
    });
  }

  freshJobs() {
    this.spinnerservice.requestStarted();
    this.sewOutService.getTabValue1().subscribe(freshJobs => {
      this.spinnerservice.requestEnded();

      this.rowData = freshJobs.getWorkflowDetails;

    });
  }

  revisionJobs() {
    this.spinnerservice.requestStarted();

    this.sewOutService.getTabValue2().subscribe(revisionJobs => {
      this.spinnerservice.requestStarted();

      this.rowData = revisionJobs.getWorkflowDetails;

    });
  }

  reworkJobs() {
    this.spinnerservice.requestStarted();
    this.sewOutService.getTabValue3().subscribe(reworkJobs => {
      this.spinnerservice.requestEnded();
      this.rowData = reworkJobs.getWorkflowDetails;

    });
  }

  quoteJobs() {
    this.spinnerservice.requestStarted()
    this.sewOutService.getTabValue4().subscribe(quoteJobs => {
      this.spinnerservice.requestEnded()

      this.rowData = quoteJobs.getWorkflowDetails;

    });
  }

  sewOut() {
    this.spinnerservice.requestStarted();

    this.sewOutService.getTabValue5().subscribe(sewOut => {
      this.spinnerservice.requestEnded();

      this.rowData = sewOut.getWorkflowDetails;

    });
  }

  displayScopeDropdown: boolean = false; // hide a scope dropdown
  bulkJobs() {
    this.spinnerservice.requestStarted();
    this.sewOutService.getTabValue6().subscribe(bulkJobs => {
      this.spinnerservice.requestEnded();
      this.rowData = bulkJobs.getWorkflowDetails;

      this.displayScopeDropdown = true;
    });
  }

  bulkUploadJobs() {
    this.spinnerservice.requestStarted();
    this.sewOutService.getTabValue7().subscribe(bulkUploadJobs => {
      this.spinnerservice.requestEnded();

      this.rowData = bulkUploadJobs.getWorkflowDetails;

    });
  }

  scopeDropdown() {
    this.spinnerservice.requestStarted();

    this.sewOutService.getScopeDropdown().subscribe(scopedata => {
      this.spinnerservice.requestEnded();

      this.scopes = scopedata.ScopeDetails;
    });
  }

  getTabValue() {
    return this.SewOutComponent1.getCurrentTab();
  }
  workFlowConversion() {
    if (this.getTabValue() !== 5) {
      const apiUrl = environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/${this.getTabValue()}/0`;
      this.http.get(apiUrl).subscribe(
        (response: any) => {

          // Handle success response here
          let timeStamp = response.getWorkflowDetails[0].timeStamp;
          let customerId = response.getWorkflowDetails[0].customerId

          let existingSelectedRows = {
            // Existing selectedRows array
            // Add your existing selectedRows elements here
            "id": 0,
            "processId": response.getWorkflowDetails.processId,
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
            "dateofDelivery": new Date().toDateString(),
            "comments": "string",
            "validity": 0,
            "copyFiles": true,
            "updatedBy": 0,
            "jId": response.getWorkflowDetails.jid,
            "estimatedTime": 0,
            "tranMasterId": 0,
            "selectedRows": [],
            "selectedEmployees": [],
            "departmentId": 0,
            "updatedUTC": new Date().toDateString(),
            "categoryDesc": "string",
            "allocatedEstimatedTime": 0,
            "tranId": 0,
            "fileInwardType": "string",
            "timeStamp": response.getWorkflowDetails[0].timeStamp,
            "scopeId": 0,
            "quotationRaisedby": 0,
            "quotationraisedOn": new Date().toDateString(),
            "clientId": 0,
            "customerId": response.getWorkflowDetails[0].customerId,
            "fileReceivedDate": new Date().toDateString(),
            "commentsToClient": "string",
            "isJobFilesNotTransfer": true
          };
          // Update the payload with the retrieved data
          let payload = {
            "id": 0,
            "processId": response.getWorkflowDetails.processId,
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
            "dateofDelivery": new Date().toDateString(),
            "comments": "string",
            "validity": 0,
            "copyFiles": true,
            "updatedBy": 0,
            "jId": response.getWorkflowDetails.jid,
            "estimatedTime": 0,
            "tranMasterId": 0,
            "selectedRows": [existingSelectedRows], // Change to an array
            "selectedEmployees": [existingSelectedRows], // Change to an array
            "departmentId": 0,
            "updatedUTC": new Date().toDateString(),
            "categoryDesc": "string",
            "allocatedEstimatedTime": 0,
            "tranId": 0,
            "fileInwardType": "string",
            "timeStamp": response.getWorkflowDetails[0].timeStamp,
            "scopeId": 0,
            "quotationRaisedby": 0,
            "quotationraisedOn": new Date().toDateString(),
            "clientId": 0,
            "customerId": response.getWorkflowDetails[0].customerId,
            "fileReceivedDate": new Date().toDateString(),
            "commentsToClient": "string",
            "isJobFilesNotTransfer": true
          };

          // Make the POST request with the updated payload
          this.sewOutService.getprocessmovement(payload).subscribe(
            (response: any) => {

              localStorage.setItem('WFTID', response.wftId);
              localStorage.setItem('WFMID', response.wfmid);
              localStorage.setItem('JID', response.jid);
              this.workflowservice.setData(data);

              if (response.success == true) {
                this._coreService.openSnackBar("Workflow converted successfully");
              }

              else {
                if (response.processId == 9 || response.processId == 11) {
                  localStorage.setItem("WFTId", response.tranId);
                  localStorage.setItem("WFMId", response.tranMasterId);
                  localStorage.setItem("JId", response.jid);
                  localStorage.setItem("processid", response.processId);
                  this.workflowservice.setData(data);

                  this.router.navigate(['/topnavbar/qualityworkflow']);
                }
                else {
                  localStorage.setItem("WFTId", response.wftId);
                  localStorage.setItem("WFMId", response.wfmid);
                  localStorage.setItem("JId", response.jid);
                  localStorage.setItem("processid", response.processId);
                  this.workflowservice.setData(data);

                  this.router.navigate(['/topnavbar/qualityworkflow']);
                }

              }

            }
          );
        },
        (error: any) => {
          // Handle error response here
          console.log("An error occurred while retrieving the data", error);
        }
      );
    }
    else {
      this.http.get<any>(``).subscribe(getWorkflowJobList => {


      });

      this.router.navigate(['/topnavbar/sewoutworkflow'])
    }
  }

  lnkviewedit(data) {
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
        "remarks": " ",
        "isBench": true,
        "jobId": " ",
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
        "categoryDesc": " ",
        "allocatedEstimatedTime": 0,
        "tranId": 0,
        "fileInwardType": " ",
        "timeStamp": data.timeStamp,
        "scopeId": 0,
        "quotationRaisedby": 0,
        "quotationraisedOn": "2023-07-11T12:10:42.205Z",
        "clientId": 0,
        "customerId": 0,
        "fileReceivedDate": "2023-07-11T12:10:42.205Z",
        "commentsToClient": " ",
        "isJobFilesNotTransfer": true
      }
      this.spinnerservice.requestStarted()
      this.http.post<any>(environment.apiURL + `Allocation/processMovement`, processMovement).pipe(catchError((error) => {
        this.spinnerservice.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(result => {
        this.spinnerservice.requestEnded();
        if (result.Success == true) {
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
    { headerName: 'Job Id', field: 'jobId', filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { color: 'skyblue', 'cursor': 'pointer' } },

    { headerName: 'EST Job/Query Date', field: 'estjobDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Actions', cellRenderer: actionrendering, field: 'actions', filter: 'agTextColumnFilter',
      floatingFilter: true, },// Use cellRenderer for customization},
    { headerName: 'Client', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Customer Classification', field: 'customerClassification', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'File Name', field: 'fileName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'File Inward Mode', field: 'fileInwardType', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Scope', field: 'scopeDesc', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Status', field: 'jobStatusDescription', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Project Code', field: 'projectCode', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Allocated By', field: 'employeeName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Process Status', field: 'workStatus', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Est Time', field: 'estimatedTime', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Category', field: 'jobCategoryDesc', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'DeliveryDate', field: 'dateofDelivery ', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[]=[];
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
      this.getWorkflowJobList(data);
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
