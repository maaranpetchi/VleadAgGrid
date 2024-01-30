import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { ProofReadingService } from 'src/app/Services/CoreStructure/ProofReading/proof-reading.service';
import { ProofreadingComponent } from '../proofreading/proofreading.component';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { JobAssignedDetailsPopupComponent } from '../../ProductionAllocation/job-assigned-details-popup/job-assigned-details-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ProofjobdetailpopupComponent } from '../proofjobdetailpopup/proofjobdetailpopup.component';
import { ProofjobhistorypopupComponent } from '../proofjobhistorypopup/proofjobhistorypopup.component';
import { QualityWorkflowComponent } from '../../Quality/quality-workflow/quality-workflow.component';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-proof-reading-table',
  templateUrl: './proof-reading-table.component.html',
  styleUrls: ['./proof-reading-table.component.scss']
})
export class ProofReadingTableComponent implements OnInit {

  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = [
    'selected',
    'jobId',
    'estjob',
    'action',
    'fileName',
    'fileInwardMode',
    'client',
    'customerSatisfaction',
    'jobstatus',
    'projectcode',
    'allocatedby',
    'processstatus',
    'scope',
    'esttime',
    'deliverydate',
    'start',
    'workfiles',
    'end',
    'bulkupload'
  ];
  displayedColumnsVisibility: any = {
    'selected': true,
    'jobId': true,
    'estjob': true,
    'action': true,
    'fileName': true,
    'fileInwardMode': true,
    'client': true,
    'customerSatisfaction': true,
    'jobstatus': true,
    'projectcode': true,
    'allocatedby': true,
    'processstatus': true,
    'scope': true,
    'esttime': true,
    'deliverydate': true,
    'start': true,
    'workfiles': true,
    'end': true,
    'bulkupload': true
  };

  visibility() {
    let result: string[] = [];
    if (this.displayedColumnsVisibility.selected) {
      result.push('selected');
    }
    if (this.displayedColumnsVisibility.jobId) {
      result.push('jobId');
    }
    if (this.displayedColumnsVisibility.estjob) {
      result.push('estjob');
    }
    if (this.displayedColumnsVisibility.action) {
      result.push('action');
    }
    if (this.displayedColumnsVisibility.fileName) {
      result.push('fileName');
    }
    if (this.displayedColumnsVisibility.fileInwardMode) {
      result.push('fileInwardMode');
    }
    if (this.displayedColumnsVisibility.client) {
      result.push('client');
    }
    if (this.displayedColumnsVisibility.customerSatisfaction) {
      result.push('customerSatisfaction');
    }
    if (this.displayedColumnsVisibility.jobstatus) {
      result.push('jobstatus');
    }
    if (this.displayedColumnsVisibility.projectcode) {
      result.push('projectcode');
    }
    if (this.displayedColumnsVisibility.allocatedby) {
      result.push('allocatedby');
    }
    if (this.displayedColumnsVisibility.processstatus) {
      result.push('processstatus');
    }
    if (this.displayedColumnsVisibility.scope) {
      result.push('scope');
    }
    if (this.displayedColumnsVisibility.esttime) {
      result.push('esttime');
    }
    if (this.displayedColumnsVisibility.deliverydate) {
      result.push('deliverydate');
    }
    if (this.displayedColumnsVisibility.start) {
      result.push('start');
    }
    if (this.displayedColumnsVisibility.workfiles) {
      result.push('workfiles');
    }
    if (this.displayedColumnsVisibility.end) {
      result.push('end');
    }
    if (this.displayedColumnsVisibility.bulkupload) {
      result.push('bulkupload');
    }

    return result;
  }



  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private spinnerService: SpinnerService, private loginservice: LoginService, private http: HttpClient, private proofReadingService: ProofReadingService, private proofreadingcomponent: ProofreadingComponent,private dialog:MatDialog) { }

  ngOnInit(): void {
    // //ScopeDropdown
    this.freshJobs()
  }
  selectedValue: number = 0; // to save the radio button values 

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

  getTabValue() {
    return this.proofreadingcomponent.getCurrentTab();
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

    else if (action == '6') {
      this.bulkJobs();
    }
    else if (action == '7') {
      this.bulkUploadJobs();
    }
  }


  freshJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/${this.selectedValue}`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe({
      next: (freshJobs) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(freshJobs.getWorkflowDetails);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.spinnerService.resetSpinner();
        console.log(err);
        return Swal.fire('Alert!','An error occurred while processing your request','error');

      }
    });
  }

  revisionJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/2/${this.selectedValue}`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe({
      next: (revisionJobs) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(revisionJobs.getWorkflowDetails);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.spinnerService.resetSpinner();
        console.log(err);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      }
    });
  }
  reworkJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/3/${this.selectedValue}`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe({
      next: (reworkJobs) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(reworkJobs.getWorkflowDetails);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.spinnerService.resetSpinner();
        console.log(err);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      }
    });
  }
  quoteJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/4/${this.selectedValue}`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe({
      next: (quoteJobs) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(quoteJobs.getWorkflowDetails);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.spinnerService.resetSpinner();
        console.log(err);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      }
    });
  }


  displayScopeDropdown: boolean = false; // hide a scope 

  bulkJobs() {
    this.displayScopeDropdown = true;
    this.displayedColumnsVisibility.start = true;
    this.displayedColumnsVisibility.workfiles = true;
    this.displayedColumnsVisibility.end = true;
    this.displayedColumnsVisibility.bulkupload = true;
    this.spinnerService.requestStarted();

    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/6/${this.selectedValue}`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe({
      next: (bulkJobs) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(bulkJobs.getWorkflowDetails);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.spinnerService.resetSpinner();
        return Swal.fire('Alert!','An error occurred while processing your request','error');
        console.log(err);
      }
    });
  }
  bulkUploadJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    this.spinnerService.requestStarted();

    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/7/${this.selectedValue}`).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe({
      next: (bulkUploadJobs) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(bulkUploadJobs.getWorkflowDetails);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.resetSpinner();
        return Swal.fire('Alert!','An error occurred while processing your request','error');

      }
    });
  }

  selectedScope: string = "";
  scopes: any[];
  scopeDropdown() {
    this.spinnerService.requestStarted();
    this.proofReadingService.getScopeDropdown().subscribe({
      next: (scopedata) => {
        this.spinnerService.requestEnded();
        this.scopes = scopedata.ScopeDetails
      },
      error: (err) => {
        this.spinnerService.resetSpinner();
      }
    })
  }

  getProductionJob(data){
    this.dialog.open(ProofjobhistorypopupComponent,{
      width:'80vw',
      data
    });
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
          "timeStamp": "string",
          "scopeId": 0,
          "quotationRaisedby": 0,
          "quotationraisedOn": "2023-07-11T12:10:42.205Z",
          "clientId": 0,
          "customerId": 0,
          "fileReceivedDate": "2023-07-11T12:10:42.205Z",
          "commentsToClient": "string",
          "isJobFilesNotTransfer": true
        }
      this.http.post<any>(environment.apiURL+`Allocation/processMovement`,processMovement).subscribe( result => {
            if (result.Success == true) {
                localStorage.setItem("WFTId", result.wftId);
                localStorage.setItem("WFMId", result.wfmid);
                localStorage.setItem("JId", data.JId);
                localStorage.setItem("processid", result.processId);
                // $location.path('/ProcessTransaction');
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
            // $location.path('/ProcessTransaction');
        }
        else {
            localStorage.setItem("WFTId", data.wftid);
            localStorage.setItem("WFMId", data.wfmid);
            localStorage.setItem("JId", data.jid);
            localStorage.setItem("processid", data.processId);
            // $location.path('/ProcessTransaction');
            this.dialog.open(QualityWorkflowComponent,{
              width: '80vw',
              height: '80vh',
              data
            })            
        }
    }
};

BindPendingJobs() {
  this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).subscribe(result => {
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
}

