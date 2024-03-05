import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import saveAs from 'file-saver';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { ClientcordinationService } from 'src/app/Services/CoreStructure/ClientCordination/clientcordination.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { ClientordinationindexComponent } from '../../clientordinationindex/clientordinationindex.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-job-details-client-index',
  templateUrl: './job-details-client-index.component.html',
  styleUrls: ['./job-details-client-index.component.scss']
})
export class JobDetailsClientIndexComponent implements OnInit {
  @ViewChild(ClientordinationindexComponent) ClientordinationindexComponent: ClientordinationindexComponent;

  QuotationDetailsList: any;
  QueryEstimatedTime: any;
  QueryEstimatedScope: any;
  QueryEstimatedSpecialPrice: any;
  indexData: any;
  gettingindex: any;
  JobCommonDetails: any;
  JobCommonDetailsJob: any;
  jobCommonDetailsJofilepath: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private spinnerService: SpinnerService, private loginservice: LoginService, private _coreService: CoreService, public dialogRef: MatDialogRef<JobDetailsClientIndexComponent>, private _empService: ClientcordinationService,private sharedDataService: SharedService) {
    this.JobCommonDetailsJob = this.data.jobStatusDescription;

    this.gettingindex = this._empService.getData() ?? 0;


    if (this.gettingindex == 0 || this.gettingindex.data == 0 || this.gettingindex.data == 1 || this.gettingindex.data == 3) {
      this.popupStatus = true;
    }


  }

  displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy', 'MovedTo', 'remarks'];
  dataJobSource: MatTableDataSource<any>;
  displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'jobStatus', 'movedDate', 'movedBy', 'MovedTo', 'remarks'];
  dataQuerySource: MatTableDataSource<any>;

  remarks: string;  // to store the remark value
  Status: string; // to store the selected query status


  pricingAmount: string; // to store the priceAmount value
  ngOnInit() {
    this.getJobHistory();


  }

  getJobHistory() {
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'JobOrder/getJobHistory', this.data.jid).subscribe(jobdata => {
      this.spinnerService.requestEnded();
      this.dataJobSource = jobdata.jobHistory;
      this.dataQuerySource = jobdata.jobQueryHistory;
      this.JobCommonDetails = jobdata.jobCommonDetails;
      this.jobCommonDetailsJofilepath = jobdata.jobCommonDetails.jofileUploadPath;;
      console.log(this.JobCommonDetails, "JobCommonDetails");
    });
  }


  QueryDetailsList: any;
  selectedJobs: any;



  res: string;
  res1: string;



  confirmationMessage: string;
  jobMovement(processMovement) {
    console.log(processMovement, "StartJobMovement");

    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `Allocation/processMovement`, processMovement).subscribe(result => {
      this.spinnerService.requestEnded();
      console.log(result, "JobMovementFinalResult");

      if (processMovement.StatusId == 9 || processMovement.StatusId == 7) {
        Swal.fire(
          'Done!',
          'Job moved to next tray',
          'success'
        ).then((response) => {
          if (response.isConfirmed) {
            window.location.reload();
            this.dialogRef.close();
          }
        });
      }
      // else if (processMovement.StatusId == "19") {
      //   Swal.fire(
      //     'Done!',
      //     'Job sent as quotation',
      //     'success'
      //   ).then((response) => {
      //     if (response.isConfirmed) {
      //       this.dialogRef.close();
      //       this.ngOnInit();
      //     }
      //   });
      // } 
      else {
        Swal.fire(
          'Done!',
          result.message,
          'success'
        ).then((res)=>{
          if(res.isConfirmed){
            this.sharedDataService.triggerRefresh();

          }
        });
      }


      if (processMovement.StatusId == 19) {
        const res: string = btoa(this.data.jid);
        const res1: string = btoa(this.data.statusId);

        const url = environment.apiURL + 'ClientOrderLocal/SendMailForCompletedJobs';

        const params = new HttpParams()
          .set('JobId', result.orderId); 
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const options = { headers: headers, params: params };

        this.http.post(url, null, options)
          .subscribe(
            () => {
              // Success callback
            },
            (error) => {
              // Error callback
            }
          );
      }

    });

  }
  scopeid: any;
  esttime: any;
  stitchcount: any;
  //bottom dropdowns
  getAmountForSpecialPrice(data) {
    console.log(this.data, "DataIngetAmount");

    this.spinnerService.requestStarted();

    this.http.post<any>(environment.apiURL + 'JobOrder/getJobHistory', this.data.jid).subscribe(jobdata => {
      this.http.get<any>(environment.apiURL + `ClientOrderService/QueryDetails?WFTId=${this.data.tranId}&WFMId=${this.data.tranMasterId}`).subscribe(result => {
        this.spinnerService.requestEnded();

        this.QueryDetailsList = result;


        if (this.QueryDetailsList == undefined) {
          this.scopeid = null;
          this.esttime = null;
          this.stitchcount = null;
        }
        else {
          this.scopeid = result.scope.id;
          this.esttime = result.estimatedTime;
          this.stitchcount = result.stitchCount;

          var processMovementPayload = {
            "id": 0,
            "processId": 0,
            "statusId": this.queryStatus,
            "selectedScopeId": this.scopeid, // Parse the value to an integer
            "autoUploadJobs": true,
            "employeeId": this.loginservice.getUsername(),
            "remarks": this.remarks,
            "isBench": true,
            "jobId": "string",
            "value": 0,
            "amount": 0,
            "stitchCount": this.data.stitchCount ? this.data.stitchCount : 0,
            "estimationTime": this.QueryDetailsList.estimatedTime,
            "dateofDelivery": "2023-07-03T12:35:41.988Z",
            "comments": "string",
            "validity": 0,
            "copyFiles": true,
            "updatedBy": 0,
            "jId": this.data.jid,
            "estimatedTime": this.QueryDetailsList.estimatedTime,
            "tranMasterId": 0,
            "selectedRows": [],
            "selectedEmployees": [],
            "departmentId": this.data.departmentId,
            "updatedUTC": "2023-07-03T12:35:41.988Z",
            "categoryDesc": "string",
            "allocatedEstimatedTime": 0,
            "tranId": 0,
            "fileInwardType": "string",
            "timeStamp": this.data.timeStamp,
            "scopeId": this.scopeid,
            "quotationRaisedby": 0,
            "quotationraisedOn": "2023-07-03T12:35:41.988Z",
            "clientId": this.data.clientId,
            "customerId": 0,
            "fileReceivedDate": this.data.fileReceivedDate,
            "commentsToClient": "string",
            "isJobFilesNotTransfer": true
          };
          this.spinnerService.requestStarted();
          this.http.post<any>(environment.apiURL + `Allocation/getAmountForSpecialPrice`, processMovementPayload).subscribe(result => {
            this.spinnerService.requestEnded();

            this.pricingAmount = result.amount;
            if (result.message != "") {
              Swal.fire(
                result.message
              )
            }
          });

        }
      });

    });
  };


  zipFiles(): void {
    let path = this.JobCommonDetails.jobCommonDetails.tranFileUploadPath;
    path = path.replace(/\\/g, '_');

    const fileUrl = environment.apiURL + 'Allocation/DownloadZipFile?path=' + `${path}`; // Replace with the actual URL of your zip file

    // Use HttpClient to make a GET request to fetch the zip file
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(response => {
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
    let path = this.JobCommonDetails.tranFileUploadPath
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

    console.log(this.jobCommonDetailsJofilepath, "jobCommonDetailsJofilepath");

    let path = this.data.jofileUploadPath ? this.data.jofileUploadPath : this.jobCommonDetailsJofilepath;

    path = path.replace(/\\/g, '_');
    console.log(path, "PathFile");

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

  ///2208changes



  submitpostQueryData(data) {
    const requiredFields: string[] = [];
    console.log(this.queryStatus, "QueryStatus");

    if (this.queryStatus === '8') {
      if (!this.remarks) {
        requiredFields.push('Remarks');
      }
      if (!this.pricingAmount) {
        requiredFields.push('Pricing Amount');
      }
    } else {
      if (!this.remarks) {
        requiredFields.push('Remarks');
      }
    }

    if (requiredFields.length === 0) {
      this.selectedJobs = [{
        DepartmentId: this.data.departmentId,
        TranMasterId: this.data.tranMasterId,
        JId: this.data.jid,
        CustomerId: this.data.clientId,
        JobId: '',
        Comments: '',
        TimeStamp: '',
        CategoryDesc: '',
        SelectedRows: [],
        FileInwardType: "",
        CommentsToClient: "",
        SelectedEmployees: []
      }];
      if (this.QueryDetailsList == undefined) {
        this.scopeid = null;
        this.esttime = null;
        this.stitchcount = null;
      }
      else {
        this.scopeid = this.QueryDetailsList.scope?.id;
        //esttime = $scope.QueryDetailsList.Value;
        this.esttime = this.QueryDetailsList.estimatedTime;
        this.stitchcount = this.QueryDetailsList.stitchCount;
      }

      //$scope.specialPriceValue = $("#txtpricingamount").val();
      var processMovement = {
        SelectedRows: this.selectedJobs,
        EmployeeId: this.loginservice.getUsername(),
        StatusId: this.queryStatus,
        Remarks: this.remarks,
        Value: this.data.value,
        ProcessId: this.data.processId,
        JobId: this.data.jobId,
        ScopeId: this.data.scopeId ? this.data.scopeId : 0,
        SelectedScopeId: this.scopeid ? this.scopeid : 0,
        //Amount: $scope.specialPriceValue,
        Amount: this.pricingAmount,
        EstimatedTime: this.QueryEstimatedTime,
        ClientId: this.data.clientId,
        FileReceivedDate: this.data.fileReceivedDate,
        StitchCount: this.StitchCount,
        Comments: '',
        TimeStamp: '',
        CategoryDesc: '',
        FileInwardType: '',
        CommentsToClient: '',
        SelectedEmployees: []
      }
      if (data.Status == 9) {
        //if ($scope.QueryDetailsList.SpecialPrice >= $scope.specialPriceValue) {
        if (this.QueryDetailsList.specialPrice != 0) {
          if (this.QueryDetailsList.SpecialPrice >= this.pricingAmount) {
          }
          else {
            alert('Aprroval Required');
          }
        }
      }
      this.jobMovement(processMovement);
      const res: string = btoa(this.data.jid);
      const res1: string = btoa(this.data.statusId);

      if (this.data.statusId == 6 || this.data.statusId == 8) {
        const url = environment.apiURL + 'ClientOrderLocal/SendMailForQueryJobs';
        const params = new HttpParams()
          .set('WFMId', this.data.tranMasterId
          )
          .set('JobId', res)
          .set('StatusIdVal', res1);

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const options = { headers: headers, params: params };

        this.http.post(url, null, options).subscribe((response) => {
          this.dialogRef.close();
        });
      }

    } else {
      // Show validation error message with missing field names
      const missingFields = requiredFields.join(', ');
      Swal.fire('Required Fields', `Please fill in the following required fields: ${missingFields}.`, 'info');
    }


  };

  /////0109////
  popupStatus: boolean = false;
  SpecialPrice: boolean = false;
  AmountValue: boolean = false;
  specialPrice: boolean = false;

  //ngmodel
  queryStatus: any;
  StitchCount: any;
  //Method
  statusChange(statusId) {
    if (statusId == 19) {
      this.SpecialPrice = false;
      this.AmountValue = true;
      this.spinnerService.requestStarted();

      this.http.get<any>(environment.apiURL + `ClientOrderService/QuotationDetails?JobId=${this.data.jobId}`).subscribe(result => {
        this.spinnerService.requestEnded();

        this.QuotationDetailsList = result;
      });
    }
    else if (statusId == 8 || statusId == 9) {
      this.SpecialPrice = true;
      this.AmountValue = false;
      this.spinnerService.requestStarted();
      this.http.get<any>(environment.apiURL + `ClientOrderService/QueryDetails?WFTId=${this.data.tranId}&WFMId=${this.data.tranMasterId}`).subscribe(results => {
        this.spinnerService.requestEnded();
        this.QueryDetailsList = results;
        this.QueryEstimatedTime = results.estimatedTime;
        this.QueryEstimatedScope = results.scope?.description;
        this.QueryEstimatedSpecialPrice = results.specialPrice;
      })

    }
    else {
      this.SpecialPrice = false;
      this.AmountValue = false;
    }
  };


  close() {
    this.dialogRef.close();
  }
}