
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { CompletedjobsComponent } from '../../completedjobs.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-get-job-history-popup',
  templateUrl: './get-job-history-popup.component.html',
  styleUrls: ['./get-job-history-popup.component.scss']
})
export class GetJobHistoryPopupComponent implements OnInit {
  selectedJobs: { DepartmentId: any; TranMasterId: any; JId: any; CustomerId: any; JobId: string; Remarks: string; Comments: string; TimeStamp: string; CategoryDesc: string; SelectedRows: never[]; FileInwardType: string; CommentsToClient: string; SelectedEmployees: never[]; }[];
  scopedescription: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private cookieService: CookieService,private loginservice: LoginService, private spinnerservice: SpinnerService) {
  }

  displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy', 'MovedTo', 'remarks'];
  dataJobSource: MatTableDataSource<any>;
  displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'jobStatus', 'movedDate', 'movedBy', 'MovedTo', 'remarks'];
  dataQuerySource: MatTableDataSource<any>;

  remarks: string;  // to store the remark value
  selectedQureryStatus: string; // to store the selected query status


  copyPreviousTrayFiles: boolean = false;

  @ViewChild(CompletedjobsComponent) CompletedjobsComponent: CompletedjobsComponent;
  ngOnInit() {
    // Fetch data from the REST API and populate the table job history
    this.http.post<any>(environment.apiURL + 'JobOrder/getJobHistory', this.data.jid).subscribe(data => {
      this.dataJobSource = data.jobHistory;
      this.scopedescription = data.jobCommonDetails.description

    });
  }
  selectedFile: File[] = [];
  onFileSelected(event: any) {
    this.selectedFile = [event.target.files[0], ...this.selectedFile];//store the selected file in selectdfile
  }




  uploadBulkFilesToClient() {

    this.selectedJobs = [{
      DepartmentId: this.data.departmentId,
      TranMasterId: this.data.tranMasterId,
      JId: this.data.jid,
      CustomerId: this.data.customerId,
      JobId: "",
      Remarks: "",
      Comments: "",
      TimeStamp: "",
      CategoryDesc: "",
      SelectedRows: [],
      FileInwardType: "",
      CommentsToClient: "",
      SelectedEmployees: []
    }];


    var processMovement = {
      "id": 0,
      "processId": this.data.processId,
      "statusId": 12,
      "selectedScopeId": 0,
      "autoUploadJobs": true,
      "employeeId": this.loginservice.getUsername(),
      "remarks": this.remarks,
      "isBench": true,
      "jobId": this.data.jobId,
      "value": 0,
      "amount": 0,
      "stitchCount": 0,
      "estimationTime": 0,
      "dateofDelivery": "2023-06-24T09:40:49.877Z",
      "comments": "",
      "validity": 0,
      "copyFiles": true,
      "updatedBy": 0,
      "jId": this.data.jid,
      "estimatedTime": this.data.estimatedTime !== null ? this.data.estimatedTime : 0,
      "tranMasterId": 0,
      "selectedRows": this.selectedJobs,
      "selectedEmployees": [],
      "departmentId": 0,
      "updatedUTC": "2023-06-24T09:40:49.877Z",
      "categoryDesc": "",
      "allocatedEstimatedTime": 0,
      "tranId": 0,
      "fileInwardType": "",
      "timeStamp": this.data.timeStamp,
      "scopeId": this.data.scopeId,
      "quotationRaisedby": 0,
      "quotationraisedOn": "2023-06-24T09:40:49.877Z",
      "clientId": this.data.clientId,
      "customerId": 0,
      "fileReceivedDate": this.data.estfileReceivedDate,
      "commentsToClient": "",
      "isJobFilesNotTransfer": true
    }


    this.jobMovement(processMovement);

  }


  jobMovement(processMovement) {
    this.spinnerservice.requestStarted();
    this.http.post<any>(environment.apiURL + `Allocation/processMovement`, processMovement).subscribe(result => {
      this.spinnerservice.requestEnded();

      if(result.success == false){
    
      Swal.fire(
        ' inf0!',
        result.message,
        'info'
      )
     }
     else{
      Swal.fire('info', 'Converted Successfully','info').then((res)=>{
        if(res.isConfirmed){
          this.fileUpload(result)
          this.CompletedjobsComponent.getCompletedJobData();
        }
      })
     }
       
    
    });
  }



  fileUpload(result) {
    const orderId = result.orderId;
    const processId =  this.data.processId;
    const statusId = this.data.statusId;
    if (this.selectedFile?.length > 0) {
      const fd = new FormData();
      for (let i = 0; i < this.selectedFile.length; i++) {
        fd.append('FormCollection[]', this.selectedFile[i]);
      }
      this.spinnerservice.requestStarted();
      this.http.post<any>(environment.apiURL + `File/uploadFiles/${orderId}/0/${processId}/${statusId}/1/${processId}/${statusId}`, fd).subscribe(filedata => {
        this.spinnerservice.requestEnded();
        let submitted = false;
        let orderDetails: any = {};
        this.selectedFile = [];
      });
    }
  }
}

