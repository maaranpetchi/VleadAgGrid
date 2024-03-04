import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { environment } from 'src/Environments/environment';
import { WorkflowService } from 'src/app/Services/CoreStructure/WorkFlow/workflow.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-actionrendering',
    template: `<a style="color: skyblue;cursor:pointer" (click)="lnkviewedit(params.data)"> workFlow</a>`,
})
export class actionrendering implements ICellRendererAngularComp {
    storedProcessId: string | null;

    constructor(private workflowservice:WorkflowService,private http:HttpClient,private loginservice:LoginService,private router:Router,private spinnerservice:SpinnerService){
        this.storedProcessId = localStorage.getItem('processId');

    }
  public cellValue!: string;

  gettingData: any;
  componentParent: any;
  params: ICellRendererParams<any, any, any>;
  private dialog: MatDialog;

  agInit(params: ICellRendererParams): void {
    this.gettingData = params.data;
    console.log(this.gettingData, "GettingData");
    this.params = params;
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  lnkviewedit(data) {

    console.log(data,"BulkData");
    
    
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
              console.log(result,"ProcessId9");
              
              localStorage.setItem("WFTId", result.wftId);
              localStorage.setItem("WFMId", result.wfmid);
              localStorage.setItem("JId", data.JId);
              localStorage.setItem("processid", result.processId);
              this.workflowservice.setData(data);
    
              this.router.navigate(['/topnavbar/qualityworkflow']);
            }
            else {
              if(result.success == true){
                localStorage.setItem("WFTId", result.wftId);
                localStorage.setItem("WFMId", result.wfmid);
                localStorage.setItem("JId", data.JId);
                localStorage.setItem("processid", result.processId);
                this.workflowservice.setData(data);
                this.router.navigate(['/topnavbar/qualityworkflow']);
              }
            else{
              Swal.fire('info',result.message,'info').then((res)=>{
                if(res.isConfirmed){
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
    
    
    

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  BindPendingJobs() {
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.storedProcessId ? this.loginservice.getProcessId() : 3}/1/0`).subscribe(result => {

    });
  }
}