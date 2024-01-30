import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { ProofReadingService } from 'src/app/Services/proof-reading.service';
import { JobhistorypopuptableComponent } from '../../Quality/jobhistorypopuptable/jobhistorypopuptable.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-productionworkflow',
  templateUrl: './productionworkflow.component.html',
  styleUrls: ['./productionworkflow.component.scss'],
  providers: [DatePipe]
})
export class ProductionworkflowComponent  implements OnInit {

  //grid big table
  // jobWorkDetails = {
  //   dataSource: new MatTableDataSource([]),
  //   displayedColumns: ['Id', 'StartDate', 'EndDate', 'TotalTimeTaken', 'Status'],
  //   columnDefs: [
  //     { matColumnDef: 'Id', matHeaderCellDef: 'Id', matCellDef: 'Id', hide: true },
  //     { matColumnDef: 'StartDate', matHeaderCellDef: 'Start Date & Time', matCellDef: 'StartDate', type: 'date', cellFilter: 'date:"MM-dd-yyyy hh:mm:ss"', width: '28%' },
  //     { matColumnDef: 'EndDate', matHeaderCellDef: 'End Date & Time', matCellDef: 'EndDate', type: 'date', cellFilter: 'date:"MM-dd-yyyy hh:mm:ss"', width: '28%' },
  //     { matColumnDef: 'TotalTimeTaken', matHeaderCellDef: 'Time Taken in Mins', matCellDef: 'TotalTimeTaken', width: '30%' },
  //     { matColumnDef: 'Status', matHeaderCellDef: 'Status', matCellDef: 'Status' },
  //   ],
  // };
  jobWorkDetails: MatTableDataSource<any>;
  displayedColumns: string[] = ['StartDate', 'EndDate', 'TotalTimeTaken', 'Status'];
  dates: any[];
  SummaryHistory: any;
  TotalTimeWorked: any;
  Break: any;
  Training: any;
  Hold: any;
  Others: any;
  TotalTimeTaken: any;
  Estimatedtime: any;
  Deviation: any;
  isHold: any;
  SameEmp: any;



getHoldvalue(){
this.http.get<any>(environment.apiURL + `Workflow/GetProcessTransaction/${localStorage.getItem('WFTId')}/${this.loginService.getUsername()}`).subscribe( data => {
  this.isHold =  data.isHold;
  this.SameEmp = data.sameEmp;
});
}

  showFiles: boolean;
  disableWorkType: boolean;
  alertMessage: string;


  selectedStatus: string; //to store the first dropdown status
  AttachedFiles: File[] = [];
  AttachedFiles1: File[] = [];
  showCopyFilesCheckbox: boolean = true;
  disableCopyFiles = true;
  remarks = '';
  copyFiles = false;
  selectedScopeValue: any; //to hold the scope value
  confirmationMessage: any;
  RbnError: any = null;;
  errorId: null;
  constructor(private dialog:MatDialog,private checklistService: ProofReadingService, private http: HttpClient, private loginService: LoginService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.AttachedFiles = [event.target.files[0], ...this.AttachedFiles];//store the selected file in selectdfile;
    this.AttachedFiles1 = [event.target.files[0], ...this.AttachedFiles1];//store the selected file in selectdfile;
  }

  ngOnInit() {
  }
  processStatuses = ['Select Status', 'Completed', 'Query', 'Queryforspecialpricing', 'Workincomplete'];


  scopeApiValues: any[] = []; // Holds the values from the REST API

  getscopevalues() {
    // // Fetch data from the REST API
    this.http.get<any>(environment.apiURL + `Allocation/getCustomerScopeValues/1/${this.data.clientId}`).subscribe(data => {
      this.scopeApiValues = data.scopeDetails[0];
    });
  }
  onScopeChange() {
    if (this.selectedStatus === 'Completed') {
      this.showCopyFilesCheckbox = false;
      this.getscopevalues();
    }
    else {
      this.showCopyFilesCheckbox = true;
      this.getscopevalues();
    }

  }
  /////////////////<------MAIN METHOD TO FUNCTIONALITY IN BUTTON---->////////////////////


  changeWorkType(workType) {
    if (workType == 'Start') {
      this.disableWorkType = false;
      this.showFiles = true;
      this.ChangeWorkflow(workType);
    }
  }

  changeWorkType1(workType) {
    if (workType == 'Start') {
      this.disableWorkType = false;
      this.showFiles = true;
      this.ChangeWorkflow(workType);
    }
    else if (workType == 'End') {
      this.http.get<any>(environment.apiURL + `Workflow/ChecklistPopup?WFMId=${this.data.WFMId}`).subscribe(result => {
        this.checklistService.checklist = result.check;
      });
      if (this.checklistService.checklist != "") {
        // $('#checklistPopupup').modal('show');
        let popupSubmit1 = (value: string) => {
          if (value === 'Ok') {
            // $('#checklistPopupup').modal('hide');
            if (this.data.processName === 'Production') {
              if (
                this.selectedStatus === 'Query' ||
                this.selectedStatus === 'Query for Special Pricing'
              ) {
                if (
                  this.AttachedFiles.length === 0 &&
                  !this.copyFiles
                ) {
                  alert('Please Copy Previous Files (or) Upload Files!');
                  // $('#alertPopup').modal('show');
                } else {
                  this.disableWorkType = true;
                  this.ChangeWorkflow(workType);
                }
              } else if (this.AttachedFiles.length === 0) {
                alert('Please Upload Files!');
                // $('#alertPopup').modal('show');
              } else {
                this.disableWorkType = true;
                this.ChangeWorkflow(workType);
              }
            } else if (
              this.data.processName === 'Quality' ||
              this.data.processName === 'Sew Out' ||
              this.data.processName === 'Buddy Proof'
            ) {
              if (
                this.AttachedFiles.length === 0 &&
                !this.copyFiles &&
                this.AttachedFiles1.length === 0
              ) {
                alert('Please Copy Previous Files (or) Upload Files!');
                // $('#alertPopup').modal('show');
              } else {
                this.disableWorkType = true;
                this.ChangeWorkflow(workType);
              }
            } else if (this.data.processName === 'Proof Reading') {
              if (!this.copyFiles) {
                this.alertMessage = 'Please Copy Previous Files!';
                // $('#alertPopup').modal('show');
              } else {
                this.disableWorkType = true;
                this.ChangeWorkflow(workType);
              }
            } else {
              this.disableWorkType = true;
              this.ChangeWorkflow(workType);
            }
          } else if (value === 'cancel') {
            // $('#checklistPopupup').modal('hide');
          }
        };
        //submit end
        popupSubmit1('Ok');

      }
      else {
        if (this.data.processName == 'Production') {         //the below code 154 to 193 STARTS          
          if (this.selectedStatus == 'Query' || this.selectedStatus == 'Query for Special Pricing') {
            if (this.AttachedFiles.length == 0 && this.copyFiles == false) {
              this.alertMessage = 'Please Copy Previous Files (or) Upload Files!';
              // $('#alertPopup').modal('show');
            }
            else {
              this.disableWorkType = true;
              this.ChangeWorkflow(workType);
            }
          }
          else if (this.AttachedFiles.length == 0) {
            this.alertMessage = 'Please Upload Files!';
            // $('#alertPopup').modal('show');
          }
          else {
            this.disableWorkType = true;
            this.ChangeWorkflow(workType);
          }
        }
        else if (this.data.processName == 'Quality') {
          if (this.AttachedFiles.length == 0 && this.copyFiles == false) {
            this.alertMessage = 'Please Copy Previous Files (or) Upload Files!';
            // $('#alertPopup').modal('show');
          }
          else {
            this.disableWorkType = true;
            this.ChangeWorkflow(workType);
          }
        }
        else if (this.data.processName == 'Sew Out' || this.data.processName == 'Buddy Proof') {
          if (this.AttachedFiles.length == 0 && this.copyFiles == false && this.AttachedFiles1.length == 0) {
            this.alertMessage = 'Please Copy Previous Files (or) Upload Files!';
            // $('#alertPopup').modal('show');
          }
          else {
            this.disableWorkType = true;
            this.ChangeWorkflow(workType);
          }
        }
        else if (this.data.processName == 'Proof Reading') {
          if (this.copyFiles == false) {
            this.alertMessage = 'Please Copy Previous Files!';
            // $('#alertPopup').modal('show');
          }
          else {
            this.disableWorkType = true;
            this.ChangeWorkflow(workType);
          }
        }
        else {
          this.disableWorkType = true;
          this.ChangeWorkflow(workType);
        }
      }
      //-----------------------------------------------------------------final CL---------------------------------------------------------------
    }
    else {
      this.disableWorkType = true;
      this.ChangeWorkflow(workType);
    }
  }

  ///Secondary function

  ChangeWorkflow(workType) {
    let ProcessCheck = localStorage.getItem('processid');
    if (ProcessCheck === '3' || ProcessCheck === '5' || ProcessCheck === '9' || ProcessCheck === '11') {
      if (this.data.stitchCountUpdate === undefined) {
        this.data.stitchCountUpdate = this.data.stitchCount;
      }
    } else {
      this.data.stitchCountUpdate = this.data.stitchCount;
    }

    if (this.RbnError == 'No Error') {
      this.errorId = null;
    }
    var processTransaction = {
      WFTId: this.data.wftid,
      WFMId: this.data.wfmid,
      ScopeId: this.data.scopeId,
      ProcessId: this.data.processId,
      WorkType: workType,
      Status: this.selectedStatus,
      CommentsToClient: this.data.commentsToClient,
      Remarks: this.remarks,
      EmployeeId: this.loginService.getUsername(),
      CopyFiles: this.copyFiles,
      StitchCount: this.data.stitchCount,
      ErrorCategoryId: this.errorId,
      Value: this.data.estimatedTime
    };

    var fd = new FormData();

    if (workType == 'End') {
      for (let i = 0; i < this.AttachedFiles.length; i++) {
        fd.append('file', this.AttachedFiles[i]);
      }

      if (this.AttachedFiles.length > 0) {
        this.copyFiles = false;
      }
      if ((this.AttachedFiles.length > 0 && this.copyFiles == false) || (this.AttachedFiles1.length > 0)) {
        if (this.AttachedFiles1.length > 0) {
          let processTransaction = {
            WFTId: this.data.wftid,
            WFMId: this.data.wfmid,
            ScopeId: this.data.scopeId,
            ProcessId: this.data.processId,
            WorkType: workType,
            Status: this.selectedStatus,
            CommentsToClient: this.data.commentsToClient,
            Remarks: this.remarks,
            EmployeeId: this.loginService.getUsername(),
            CopyFiles: this.copyFiles,
            StitchCount: this.data.stitchCount,
            ErrorCategoryId: this.errorId,
            Value: this.data.estimatedTime,
            files: this.AttachedFiles1,
          };

          fd.append('data', JSON.stringify(processTransaction));

          this.http.post<any>(environment.apiURL + `Workflow/ChangeWorkflow/${this.data.wftid}`, fd).subscribe(ChangeWorkflowResult => {

            this.BindWorkDetails();
            this.confirmationMessage = ChangeWorkflowResult;
            // this.showPopup();
          });
        } else {
          fd.append('data', JSON.stringify(processTransaction));
          this.http.post<any>(environment.apiURL + `Workflow/ChangeWorkflow/${this.data.wftid}`, fd).subscribe(ChangeWorkflowResult => {
            this.BindWorkDetails();
            this.confirmationMessage = ChangeWorkflowResult;
            // this.showPopup();
          });
        }
      } else {
        fd.append('data', JSON.stringify(processTransaction));
        this.http.post<any>(environment.apiURL + `Workflow/ChangeWorkflow/${this.data.wftid}`, fd).subscribe(ChangeWorkflowResult => {
          this.BindWorkDetails();
          this.confirmationMessage = ChangeWorkflowResult;
          // this.showPopup();
        });
      }
    }
  }


  BindWorkDetails() {
    let processTransaction = {
      "wftid": this.data.wftid,
      "wfmid": this.data.wfmid,
      "workType": "",
      "status": "",
      "remarks": "",
      "employeeId": this.loginService.getUsername(),
      "copyFiles": true,
      "errorCategoryId": 0,
      "value": 0,
      "scopeId": 0,
      "processId": this.loginService.getProcessId(),
      "stitchCount": 0,
      "orderId": 0,
      "isClientOrder": 0,
      "statusId": 0,
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
      "files": [
        ""
      ],
      "commentsToClient": "",
      "tranFileUploadPath": "",
      "selectedRows": [
        ""
      ]
    }
    this.http.post<any>(environment.apiURL + "Workflow/GetProductionWorkList", processTransaction).subscribe((result) => {

      
      this.jobWorkDetails = result.jobHistory; // to display the details in table
      let History = result.summary.summaryHistory;
     

      this.TotalTimeWorked = result.summary.summaryHistory[0].totalTime;
      this.Break = result.summary.summaryHistory[0].break;
      this.Training = result.summary.summaryHistory[0].trainingorMeeting;
      this.Hold = result.summary.summaryHistory[0].hold;
      this.Others = result.summary.summaryHistory[0].others;
      this.TotalTimeTaken = result.summary.summaryHistory[0].totalTimeTaken;
      this.Estimatedtime = result.summary.summaryHistory[0].estimatedTime;
      this.Deviation = result.summary.summaryHistory[0].deviation;


      let employeeSummaryHistory = History.splice(1, History.length);
      if (result.jobHistory.length > 0) {
        this.showFiles = true;
      }
    });
  }

  viewDetails(data){
    this.dialog.open(JobhistorypopuptableComponent, {
      width: '800px',
      data
    });
  }
}

