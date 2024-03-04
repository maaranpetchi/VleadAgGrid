import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { QualityWorkflowComponent } from '../quality-workflow/quality-workflow.component';
import { ProdjobpopupComponent } from '../../Production/prodjobpopup/prodjobpopup.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { SewOutService } from 'src/app/Services/CoreStructure/SewOut/sew-out.service';
import { QualityComponent } from '../quality/quality.component';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { data } from 'jquery';
import { WorkflowService } from 'src/app/Services/CoreStructure/WorkFlow/workflow.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { ClientordinationindexComponent } from '../../ClientCordination/clientordinationindex/clientordinationindex.component';
import { actionrendering } from '../../Production/actionrendering.component';
import { bulkuploadrendering } from '../../Production/bulkuploadrendering.component';
import { EndRenderingComponent } from '../../Production/endrendering.component';
import { StartRenderingComponent } from '../../Production/startrendering.component';
import { workflowrendering } from '../../Production/workflowrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
@Component({
  selector: 'app-qualitytable',
  templateUrl: './qualitytable.component.html',
  styleUrls: ['./qualitytable.component.scss']
})
export class QualitytableComponent {
  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();
  columnApi: any;

  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayedColumns: any = {
    selected: true,
    jobId: true,
    estjob: true,
    action: true,
    fileName: true,
    fileInwardMode: true,
    client: true,
    customerSatisfaction: true,
    jobstatus: true,
    projectcode: true,
    allocatedby: true,
    processstatus: true,
    scope: true,
    esttime: true,
    deliverydate: true,
    start: false,
    workfiles: false,
    end: false
  };
  visibility() {
    let result: string[] = [];
    if (this.displayedColumns.selected) {
      result.push('selected');
    }
    if (this.displayedColumns.jobId) {
      result.push('jobId');
    }
    if (this.displayedColumns.estjob) {
      result.push('estjob');
    }
    if (this.displayedColumns.action) {
      result.push('action');
    }
    if (this.displayedColumns.client) {
      result.push('client');
    }
    if (this.displayedColumns.customerSatisfaction) {
      result.push('customerSatisfaction');
    }
    if (this.displayedColumns.fileName) {
      result.push('fileName');
    }
    if (this.displayedColumns.fileInwardMode) {
      result.push('fileInwardMode');
    }
    if (this.displayedColumns.scope) {
      result.push('scope');
    }

    if (this.displayedColumns.jobstatus) {
      result.push('jobstatus');
    }
    if (this.displayedColumns.projectcode) {
      result.push('projectcode');
    }
    if (this.displayedColumns.allocatedby) {
      result.push('allocatedby');
    }
    if (this.displayedColumns.processstatus) {
      result.push('processstatus');
    }

    if (this.displayedColumns.esttime) {
      result.push('esttime');
    }
    if (this.displayedColumns.deliverydate) {
      result.push('deliverydate');
    }
    if (this.displayedColumns.start) {
      result.push('start');
    }
    if (this.displayedColumns.workfiles) {
      result.push('workfiles');
    }
    if (this.displayedColumns.end) {
      result.push('end');
    }
    return result;
  }



  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private workflowservice: WorkflowService, private _coreService: CoreService, private sewOutService: SewOutService, private http: HttpClient, private loginservice: LoginService, private dialog: MatDialog, private spinnerService: SpinnerService, private qualitycomponent: QualityComponent, private workflowService: WorkflowService,private sharedDataService:SharedService) {    
     this.sharedDataService.refreshData$.subscribe(() => {
      this.bulkJobs();
    })
  }

  ngOnInit(): void {
    // //ScopeDropdown
    this.fetchScope();
    //FreshJobs
    this.freshJobs();
  }
  ScopeApiData: any[];
  fetchScope() {
    this.http.get<any>(environment.apiURL + `Allocation/getScopeValues/${this.loginservice.getUsername()}`).subscribe(data => {
      this.ScopeApiData = data.scopeDetails;
    });
  }


  //to save the checkbox values
  selectedproduction: any[] = [];
  setAll(completed: boolean, item: any) {

    if (completed == true) {
      this.selectedproduction.push(item)
    }
    else {

      if (this.selectedproduction.find(x => x.id == item.id)) {
        this.selectedproduction = this.selectedproduction.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }

  }
  scopeid: number = 0;

  showAlert() {
    alert('HI TESTING');
  }

  tab(action) {
    if (action == '1') {
      this.freshJobs();
      this.scopeDisplay = false;

    }
    else if (action == '2') {
      this.revisionJobs();
      this.scopeDisplay = false;

    }
    else if (action == '3') {
      this.reworkJobs();
      this.scopeDisplay = false;

    }
    else if (action == '4') {
      this.quoteJobs();
      this.scopeDisplay = false;

    }
    else if (action == '5') {
      this.bulkJobs();
      this.scopeDisplay = true;

    }
    else if (action == '6') {
      this.bulkUploadJobs();
      this.scopeDisplay = false;

    }

  }

  freshJobs() {
    this.gridApi.setColumnVisible('start',false);
    this.gridApi.setColumnVisible('workfiles',false);
    this.gridApi.setColumnVisible('end',false);
    try {
      this.spinnerService.requestStarted();
      this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).pipe(

        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

        })

      ).subscribe(freshdata => {
        this.spinnerService.requestEnded();
        this.rowData =freshdata.getWorkflowDetails;
      });
    } catch (error) {
      console.error('Synchronous error:', error);
      this.spinnerService.resetSpinner();
    }
  }
  revisionJobs() {
    this.gridApi.setColumnVisible('start',false);
    this.gridApi.setColumnVisible('workfiles',false);
    this.gridApi.setColumnVisible('end',false);
    try {
      this.spinnerService.requestStarted();
      this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/2/0`).pipe(

        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          // return Swal.fire({
          //   icon: 'error', // Use 'error' icon
          //   title: 'Alert!',
          //   text: 'An error occurred while processing your request',
          // });
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

        })

      ).subscribe(freshdata => {
        this.spinnerService.requestEnded();
        this.rowData =  freshdata.getWorkflowDetails;
   
      });
    } catch (error) {
      console.error('Synchronous error:', error);
      this.spinnerService.resetSpinner();
    }
  }
  reworkJobs() {
    this.gridApi.setColumnVisible('start',false);
    this.gridApi.setColumnVisible('workfiles',false);
    this.gridApi.setColumnVisible('end',false);
    try {
      this.spinnerService.requestStarted();

      this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/3/0`).pipe(

        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          // return Swal.fire({
          //   icon: 'error', // Use 'error' icon
          //   title: 'Alert!',
          //   text: 'An error occurred while processing your request',
          // });
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

        })

      ).subscribe(freshdata => {
        this.spinnerService.requestEnded();
        this.rowData =freshdata.getWorkflowDetails;
      
      });
    } catch (error) {
      console.error('Synchronous error:', error);
      this.spinnerService.resetSpinner();
    }
  }
  quoteJobs() {
    try {
      this.spinnerService.requestStarted();
      this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/4/0`).pipe(

        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          // return Swal.fire({
          //   icon: 'error', // Use 'error' icon
          //   title: 'Alert!',
          //   text: 'An error occurred while processing your request',
          // });
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

        })

      ).subscribe(freshdata => {
        this.spinnerService.requestEnded();
        this.rowData =freshdata.getWorkflowDetails;
        // this.dataSource.sort = this.sort;
      });
    } catch (error) {
      console.error('Synchronous error:', error);
      this.spinnerService.resetSpinner();
    }
  }
  scopeDisplay: boolean = false; // display a scope dropdown div
  bulkJobs() {
    this.gridApi.setColumnVisible('start',true);
    this.gridApi.setColumnVisible('workfiles',true);
    this.gridApi.setColumnVisible('end',true);
    this.gridApi.setColumnVisible('bulkupload',true);
    this.scopeDisplay = true;

    try {
      this.spinnerService.requestStarted();
      this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/6/0`).pipe(

        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);

          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

        })

      ).subscribe(freshdata => {
        this.spinnerService.requestEnded();
        this.rowData = freshdata.getWorkflowDetails;
      });
    } catch (error) {
      console.error('Synchronous error:', error);
      this.spinnerService.resetSpinner();
    }
  }
  bulkUploadJobs() {
    this.gridApi.setColumnVisible('start',false);
    this.gridApi.setColumnVisible('workfiles',false);
    this.gridApi.setColumnVisible('end',false);
    try {
      this.spinnerService.requestStarted();
      this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/7/0`).pipe(

        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          // return Swal.fire({
          //   icon: 'error', // Use 'error' icon
          //   title: 'Alert!',
          //   text: 'An error occurred while processing your request',
          // });
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

        })

      ).subscribe(freshdata => {
        this.spinnerService.requestEnded();
        this.rowData = freshdata.getWorkflowDetails;
      
      })
    } catch (error) {
      console.error('Synchronous error:', error);
      this.spinnerService.resetSpinner();
    }
  }



  openJobDetailsDialog(data) {
    this.dialog.open(ProdjobpopupComponent, {
      width: '80vw',
      data
    })
  }
  getTabValue() {
    //
    return this.qualitycomponent.getCurrentTab();
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
      this.spinnerService.requestStarted()
      this.http.post<any>(environment.apiURL + `Allocation/processMovement`, processMovement).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(result => {
        this.spinnerService.requestEnded();
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
            Swal.fire('Done', result.message, 'success').then((res) => {
              if (res.isConfirmed) {
                this.BindPendingJobs();
              }
            });
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


  //textcolor
  getCellClass(data) {
    console.log(data, "Colordata");

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


  changeWorkflow(data, worktype) {
    if (worktype === 'Start') {
      const processMovement =
      {
        "wftid": 0,
        "wfmid": 0,
        "workType": worktype,
        "status": "",
        "remarks": "",
        "employeeId": this.loginservice.getUsername(),
        "copyFiles": true,
        "errorCategoryId": 0,
        "value": 0,
        "scopeId": "",
        "Scope": this.ScopeApiData,
        "processId": localStorage.getItem('processId'),
        "stitchCount": 0,
        "orderId": 0,
        "isClientOrder": 0,
        "statusId": 1,
        "sourcePath": "",
        "dynamicFolderPath": "",
        "folderPath": "",
        "fileName": "",
        "fileCount": 0,
        "orignalPath": "",
        "orignalDynamicPath": "",
        "jobId": "",
        "isProcessWorkFlowTranInserted": 0,
        "isCopyFiles": 0,
        "pid": 0,
        "fakeProcessId": 0,
        "fakeStatusId": 0,
        "fakeDynamicFolderPath": "",
        "jobFileName": "",
        "files": [],
        "commentsToClient": "",
        "tranFileUploadPath": "",
        "SelectedRows": [
          { ...data, stitchCount: 0, files: [], Remarks: '', WorkType: '', FolderPath: '', SourcePath: '', JobFileName: '', OrignalPath: '', SelectedRows: [], CommentsToClient: '', DynamicFolderPath: '', OrignalDynamicPath: '', TranFileUploadPath: '', FakeDynamicFolderPath: '' }
        ]
      };
      const fd = new FormData();
      fd.append('data', JSON.stringify(processMovement));

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + `Workflow/processMovement`, fd, { headers }).subscribe((response) => {
        this.bulkJobs();
        this.spinnerService.requestEnded();
      })
    }
    else if (worktype === 'End') {
      if (this.scopeid == 0) {
        Swal.fire('info', 'Please select the scope', 'info').then((response) => {
          if (response.isConfirmed) {
            this.bulkJobs()
          }
        })
      }
      else {

        const processMovement =
        {
          "wftid": 0,
          "wfmid": 0,
          "workType": worktype,
          "status": "",
          "remarks": "",
          "employeeId": this.loginservice.getUsername(),
          "copyFiles": true,
          "errorCategoryId": 0,
          "value": 0,
          "scopeId": this.scopeid,
          "Scope": '',
          "processId": localStorage.getItem('processId'),
          "stitchCount": 0,
          "orderId": 0,
          "isClientOrder": 0,
          "statusId": 1,
          "sourcePath": "",
          "dynamicFolderPath": "",
          "folderPath": "",
          "fileName": "",
          "fileCount": 0,
          "orignalPath": "",
          "orignalDynamicPath": "",
          "jobId": "",
          "isProcessWorkFlowTranInserted": 0,
          "isCopyFiles": 0,
          "pid": 0,
          "fakeProcessId": 0,
          "fakeStatusId": 0,
          "fakeDynamicFolderPath": "",
          "jobFileName": "",
          "files": [],
          "commentsToClient": "",
          "tranFileUploadPath": "",
          "SelectedRows": [
            { ...data, stitchCount: 0, files: [], Remarks: '', WorkType: '', FolderPath: '', SourcePath: '', JobFileName: '', OrignalPath: '', SelectedRows: [], CommentsToClient: '', DynamicFolderPath: '', OrignalDynamicPath: '', TranFileUploadPath: '', FakeDynamicFolderPath: '' }
          ]
        };
        const fd = new FormData();
        fd.append('data', JSON.stringify(processMovement));

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        this.spinnerService.requestStarted();
        this.http.post<any>(environment.apiURL + `Workflow/processMovement`, fd, { headers }).subscribe((response) => {
          this.bulkJobs()
          this.spinnerService.requestStarted();
          if (response.success == true) {
            Swal.fire('Done', response.message, 'success').then((response) => {
              if (response.isConfirmed) {
                this.bulkJobs();
              }
            })
          }
          else {
            Swal.fire('Done', 'Job Not Moved', 'info').then((response) => {
              if (response.isConfirmed) {
                this.bulkJobs();
              }
            })
          }
        })
      }
    }
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

    { headerName: 'EST Job/Query Date', field: 'jobDateEst', filter: 'agTextColumnFilter',
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
    { headerName: 'Allocated By', field: 'assignedFrom', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Process Status', field: 'workStatus', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Est Time', field: 'estimatedTime', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Category', field: 'jobCategoryDesc', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'DeliveryDate', field: 'jobCategoryDesc', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'start', cellRenderer: StartRenderingComponent, field: 'start', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Workfiles', cellRenderer: workflowrendering, field: 'workfiles', filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { color: 'skyblue', 'cursor': 'pointer' } },
    { headerName: 'End', cellRenderer: EndRenderingComponent, field: 'end', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Bulk Upload', cellRenderer: bulkuploadrendering, field: 'bulkupload', filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { color: 'skyblue', 'cursor': 'pointer' } },

  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[]=[];
  public themeClass: string =
    "ag-theme-quartz";
  @ViewChild(ClientordinationindexComponent) ClientordinationindexComponent: ClientordinationindexComponent;


  onDivisionChange() {
    console.log(this.scopeid, "SelectDivi");

    this.sharedDataService.setData(this.scopeid);
  }




  onCellClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'jobId') {
      console.log(data, "PopupData");

      this.openJobDetailsDialog(data);
    }

  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
   
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).subscribe((response) => (this.rowData = response.getWorkflowDetails));
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
