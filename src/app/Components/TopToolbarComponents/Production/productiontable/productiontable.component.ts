import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ProdjobpopupComponent } from '../prodjobpopup/prodjobpopup.component';
import { ProductionworkflowComponent } from '../productionworkflow/productionworkflow.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { QualityWorkflowComponent } from '../../Quality/quality-workflow/quality-workflow.component';
import { WorkflowService } from 'src/app/Services/CoreStructure/WorkFlow/workflow.service';
import { Router } from '@angular/router';
import { catchError, window } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productiontable',
  templateUrl: './productiontable.component.html',
  styleUrls: ['./productiontable.component.scss']
})
export class ProductiontableComponent {
  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();


  displayedColumns: any = {
    selected: true,
    jobId: true,
    estjob: true,
    action: true,
    client: true,
    customerSatisfaction: true,
    fileName: true,
    fileInwardMode: true,
    scope: true,
    jobstatus: true,
    projectcode: true,
    allocatedby: true,
    processstatus: true,
    esttime: true,
    jobcategeory: true,
    deliverydate: true,
    start: false,
    workfiles: false,
    end: false,
    bulkupload: false
  };
  processid: any;
  workingstatus: string = '';
  scopeid: number = 0;


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
    if (this.displayedColumns.jobcategeory) {
      result.push('jobcategeory');
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
    if (this.displayedColumns.bulkupload) {
      result.push('bulkupload');
    }
    return result;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  storedProcessId: string | null;

  constructor(private http: HttpClient, private loginservice: LoginService, private dialog: MatDialog, private spinnerService: SpinnerService, private workflowservice: WorkflowService, private router: Router) { }

  ngOnInit(): void {
    // //ScopeDropdown
    this.fetchScope();
    this.storedProcessId = localStorage.getItem('processId');
    //FreshJobs
    this.freshJobs();
  }
  ScopeApiData: any;
  fetchScope() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getScopeValues/${this.loginservice.getUsername()}`).subscribe(data => {
      this.ScopeApiData = data.scopeDetails;

      this.spinnerService.requestEnded();

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

  showAlert() {
    alert('HI TESTING');
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
      this.bulkJobs();
      this.scopeDisplay = true;

    }
    else if (action == '6') {
      this.bulkUploadJobs();
    }

  }


  freshJobs() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.storedProcessId ? this.loginservice.getProcessId() : 3}/1/0`).subscribe(freshdata => {
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.spinnerService.requestEnded();
      this.displayedColumns.start = false;
      this.displayedColumns.workfiles = false;
      this.displayedColumns.end = false;
      this.displayedColumns.bulkupload = false;
    }, (error) => {
      this.spinnerService.resetSpinner();

      console.log(error);
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

    });
  }
  revisionJobs() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/2/0`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe(freshdata => {
      this.spinnerService.requestEnded();
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.displayedColumns.start = false;
      this.displayedColumns.workfiles = false;
      this.displayedColumns.end = false;
      this.displayedColumns.bulkupload = false;
    }, (error) => {
      this.spinnerService.resetSpinner();

      console.log(error);
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

    });
  }
  reworkJobs() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.storedProcessId ? this.loginservice.getProcessId() : 3}/3/0`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe(freshdata => {
      this.spinnerService.requestEnded();
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.displayedColumns.start = false;
      this.displayedColumns.workfiles = false;
      this.displayedColumns.end = false;
      this.displayedColumns.bulkupload = false;
    }, (error) => {
      this.spinnerService.resetSpinner();

      console.log(error);
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

    });
  }
  quoteJobs() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.storedProcessId ? this.loginservice.getProcessId() : 3}/4/0`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe(freshdata => {
      this.spinnerService.requestEnded();
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.displayedColumns.start = false;
      this.displayedColumns.workfiles = false;
      this.displayedColumns.end = false;
      this.displayedColumns.bulkupload = false;
    }, (error) => {
      this.spinnerService.resetSpinner();

      console.log(error);
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

    });
  }
  scopeDisplay: boolean = false; // display a scope dropdown div
  bulkJobs() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.storedProcessId ? this.loginservice.getProcessId() : 3}/6/0`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe(freshdata => {
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.spinnerService.requestEnded();

      this.workingstatus = freshdata.getWorkflowDetails[0].workStatus;

      this.dataSource.paginator = this.paginator;
      this.displayedColumns.start = true;
      this.displayedColumns.workfiles = true;
      this.displayedColumns.end = true;
      this.displayedColumns.bulkupload = true; this.scopeDisplay = true;
    }, (error) => {
      this.spinnerService.resetSpinner();

      console.log(error);
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

    });
  }
  bulkUploadJobs() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.storedProcessId ? this.loginservice.getProcessId() : 3}/7/0`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe(freshdata => {
      this.spinnerService.requestEnded();
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.displayedColumns.start = false;
      this.displayedColumns.workfiles = false;
      this.displayedColumns.end = false;
      this.displayedColumns.bulkupload = false;
    }, (error) => {
      this.spinnerService.resetSpinner();

      console.log(error);
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

    });
  }


  openJobDetailsDialog(data) {
    this.dialog.open(ProdjobpopupComponent, {
      width: '80vw',
      data
    })
  }

  lnkviewedit(data) {
    if (data.processId == 8 || data.processId == 10) {
      let selectedJobs = [{
        DepartmentId: data.departmentId,
        TranMasterId: data.TranMasterId,
        TimeStamp: data.TimeStamp,
        TranId: data.TranId,
        JId: data.JId,
        CustomerId: data.CustomerId
      }];
      let selectedEmployees = [{
        EmployeeId: this.loginservice.getUsername(),
      }];
      var processMovement = {
        "id": 0,
        "processId": data.processId,
        "statusId": 1,
        "selectedScopeId": 0,
        "autoUploadJobs": true,
        "employeeId": 0,
        "remarks": "",
        "isBench": true,
        "jobId": "",
        "value": 0,
        "amount": 0,
        "stitchCount": 0,
        "estimationTime": 0,
        "dateofDelivery": "2023-07-11T12:10:42.205Z",
        "comments": "",
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
        "categoryDesc": "",
        "allocatedEstimatedTime": 0,
        "tranId": 0,
        "fileInwardType": "",
        "timeStamp": "",
        "scopeId": 0,
        "quotationRaisedby": 0,
        "quotationraisedOn": "2023-07-11T12:10:42.205Z",
        "clientId": 0,
        "customerId": 0,
        "fileReceivedDate": "2023-07-11T12:10:42.205Z",
        "commentsToClient": "",
        "isJobFilesNotTransfer": true
      }
      this.http.post<any>(environment.apiURL + `Allocation/processMovement`, processMovement).subscribe(result => {

        if (result.Success == true) {
          localStorage.setItem("WFTId", result.wftId);
          localStorage.setItem("WFMId", result.wfmid);
          localStorage.setItem("JId", data.JId);
          localStorage.setItem("processid", result.processId);
          this.workflowservice.setData(data);

          this.router.navigate(['/topnavbar/qualityworkflow']);
        }
        else {
          this.BindPendingJobs();
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  BindPendingJobs() {
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.storedProcessId ? this.loginservice.getProcessId() : 3}/1/0`).subscribe(result => {

    });
  }





  /////////////////Start end workflow bulkupload/////////////////////
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
          if(response.success==true){
          Swal.fire('Done', response.message, 'success').then((response) => {
            if (response.isConfirmed) {
              this.bulkJobs();
            }
          })
        }
        else{
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

}