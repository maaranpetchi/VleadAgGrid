
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { ProofReadingService } from 'src/app/Services/proof-reading.service';
import { JobhistorypopuptableComponent } from '../../Quality/jobhistorypopuptable/jobhistorypopuptable.component';
import saveAs from 'file-saver';

@Component({
  selector: 'app-proofjobdetailpopup',
  templateUrl: './proofjobdetailpopup.component.html',
  styleUrls: ['./proofjobdetailpopup.component.scss']
})
export class ProofjobdetailpopupComponent implements OnInit {

  //grid big table
  jobWorkDetails = {
    dataSource: new MatTableDataSource([]),
    displayedColumns: ['Id', 'StartDate', 'EndDate', 'TotalTimeTaken', 'Status'],
    columnDefs: [
      { matColumnDef: 'Id', matHeaderCellDef: 'Id', matCellDef: 'Id', hide: true },
      { matColumnDef: 'StartDate', matHeaderCellDef: 'Start Date & Time', matCellDef: 'StartDate', type: 'date', cellFilter: 'date:"MM-dd-yyyy hh:mm:ss"', width: '28%' },
      { matColumnDef: 'EndDate', matHeaderCellDef: 'End Date & Time', matCellDef: 'EndDate', type: 'date', cellFilter: 'date:"MM-dd-yyyy hh:mm:ss"', width: '28%' },
      { matColumnDef: 'TotalTimeTaken', matHeaderCellDef: 'Time Taken in Mins', matCellDef: 'TotalTimeTaken', width: '30%' },
      { matColumnDef: 'Status', matHeaderCellDef: 'Status', matCellDef: 'Status' },
    ],
  };
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

  onRegisterApi(gridApi: any) {
    // Handle grid API registration if required
  }

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
  zipFiles(): void {
    let path = this.data.tranFileUploadPath;
    path = path.replace(/\\/g, '_');

    const fileUrl =
      environment.apiURL + 'Allocation/DownloadZipFile?path=' + `${path}`; // Replace with the actual URL of your zip file

    // Use HttpClient to make a GET request to fetch the zip file
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((response) => {
      this.saveFile(response);
    });
  }
  private saveFile(blob: Blob) {
    // Create a blob URL for the file
    const url = window.URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = this.data.fileName; // Replace with the desired file name
    document.body.appendChild(a);

    // Trigger the click event to start the download
    a.click();

    // Clean up the blob URL and the link element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  files: string[] = [];

  workFiles(id: number): void {
    let path = this.data.tranFileUploadPath;
    path = path.replace(/\\/g, '_');

    this.http.get<any>(environment.apiURL + `Allocation/getFileNames/${path}`).subscribe((result: any) => {
      this.files = result.files;
      if (this.files.length > 0) {
        this.files.forEach((value: string) => {
          const url =environment.apiURL+`Allocation/downloadFilesTest/${path}/${value}`;
          this.fileDownload(url, value);
        });
      }
    });
  }
  InputworkFiles(id: number): void {
    let path = this.data.jofileUploadPath ;
    path = path.replace(/\\/g, '_');

    this.http.get<any>(environment.apiURL + `Allocation/getFileNames/${path}`).subscribe((result: any) => {
      this.files = result.files;
      if (this.files.length > 0) {
        this.files.forEach((value: string) => {
          const url =environment.apiURL+`Allocation/downloadFilesTest/${path}/${value}`;
          this.fileDownload(url, value);
        });
      }
    });
  }
 

  fileDownload(url: string, fileName: string): void {
    this.http
      .get(url, {
        responseType: 'blob',
      })
      .subscribe((response: Blob) => {
        saveAs(response, fileName);
      });
  }
  getFileNameFromPath(filePath: string): string {
    const pathParts = filePath.split('/');
    return pathParts[pathParts.length - 1];
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
      "workType": "string",
      "status": "string",
      "remarks": "string",
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
      "sourcePath": "string",
      "dynamicFolderPath": "string",
      "folderPath": "string",
      "fileName": "string",
      "fileCount": 0,
      "orignalPath": "string",
      "orignalDynamicPath": "string",
      "jobId": "string",
      "isProcessWorkFlowTranInserted": 0,
      "isCopyFiles": 0,
      "pid": 0,
      "fakeProcessId": 0,
      "fakeStatusId": 0,
      "fakeDynamicFolderPath": "string",
      "jobFileName": "string",
      "files": [
        "string"
      ],
      "commentsToClient": "string",
      "tranFileUploadPath": "string",
      "selectedRows": [
        "string"
      ]
    }
    this.http.post<any>(environment.apiURL + "Workflow/GetProductionWorkList", processTransaction).subscribe((result) => {
      this.jobWorkDetails.dataSource = result.jobHistory; // to display the details in table
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
