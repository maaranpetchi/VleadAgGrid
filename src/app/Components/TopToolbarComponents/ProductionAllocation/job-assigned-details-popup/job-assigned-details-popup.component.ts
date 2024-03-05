import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { ProductionallocationtableComponent } from '../productionallocationtable/productionallocationtable.component';




@Component({
  selector: 'app-job-assigned-details-popup',
  templateUrl: './job-assigned-details-popup.component.html',
  styleUrls: ['./job-assigned-details-popup.component.scss'],
})


export class JobAssignedDetailsPopupComponent implements OnInit {
  @ViewChild(ProductionallocationtableComponent) ProductionallocationtableComponent: ProductionallocationtableComponent;

  jobCommonDetails: any;
  confirmationMessage: any;
  QueryDetailsList: any;
  selectedJobs: {
    DepartmentId: any;
    TranMasterId: any;
    JId: any;
    CustomerId: any;
    JobId: string;
    Comments: string;
    TimeStamp: string;
    CategoryDesc: string;
    SelectedRows: never[];
    FileInwardType: string;
    CommentsToClient: string;
    SelectedEmployees: never[];
  }[];
  estimationTime: any;
  stitchCount: any;
  jobCommonDetailsJofilepath: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private loginservice: LoginService,
    private _coreService: CoreService,
    private router: Router,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<JobAssignedDetailsPopupComponent>
  ) {

  }

  displayedJobColumns: string[] = [
    'movedFrom',
    'movedTo',
    'movedDate',
    'movedBy',
    'MovedTo',
    'remarks',
  ];
  dataJobSource: MatTableDataSource<any>;
  displayedQueryColumns: string[] = [
    'movedFrom',
    'movedTo',
    'jobStatus',
    'movedDate',
    'movedBy',
    'MovedTo',
    'remarks',
  ];
  dataQuerySource: MatTableDataSource<any>;

  remarks: string; // to store the remark value
  selectedQureryStatus: number; // to store the selected query status
  estimatedTime: string;

  EstimatedTime: boolean = false;
  remarksdata: boolean = false;
  EmployeData: boolean = false;

  Scopes: any[] = [];
  selectedScope: any = 0;
  estTime: number;
  restApiData: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.fetchData();
    this.QueryDetailspost();
    this.fetchScopes();
    this.getAssignedEmployeesToChangeEstTime();
  }

  close() {
    this.dialogRef.close();
  }
  StatusChange() {
    if (this.selectedQureryStatus == 6) {
      this.remarksdata = true;
      this.EstimatedTime = false;
      this.EmployeData = false;
    } else if (this.selectedQureryStatus == 8) {
      this.EstimatedTime = true;
      this.remarksdata = true;
      this.EmployeData = true;
      this.http
        .get<any>(
          environment.apiURL +
          `Allocation/getAssignedEmployeesToChangeEstTime/${this.data.jid ? this.data.jid : this.data.jId}`
        )
        .subscribe((response) => {
          this.restApiData = response.assignedEmployees;
        });
    }
  }
  fetchScopes() {
    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getScopeValues/${this.loginservice.getUsername()}`
      )
      .subscribe((scopedata) => {
        this.Scopes = scopedata.scopeDetails; // Sort the scopes based on the 'name' property
      });
  }
  fetchData() {

    console.log(this.data, "jiD PASSED");

    const apiUrl = environment.apiURL + 'JobOrder/getJobHistory';
    this.spinnerService.requestStarted();
    this.http.post<any>(apiUrl, this.data.jid ? this.data.jid : this.data.jId).subscribe(
      (response: any) => {
        this.jobCommonDetails = response;
        this.jobCommonDetailsJofilepath = response.jobCommonDetails.jofileUploadPath;
        console.log(this.jobCommonDetails, "JobCommonDetails");

        this.dataJobSource = response;
        this.dataJobSource = new MatTableDataSource(response.jobHistory);
        this.dataJobSource.paginator = this.paginator;
        this.dataJobSource.sort = this.sort; // Assuming the REST API response is an array of objects
        this.dataQuerySource = response;
        this.dataQuerySource = new MatTableDataSource(response.jobQueryHistory);
        this.dataQuerySource.paginator = this.paginator1;
        this.dataQuerySource.sort = this.sort;
        this.spinnerService.requestEnded();
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }

  QueryDetailspost() {
    const apiUrl = environment.apiURL + `ClientOrderService/QueryDetailspost`;
    var datas = {
      wftid: 0,
      jid: this.data.jid ? this.data.jid : this.data.jId,
    };
    return this.http.post(apiUrl, datas).subscribe(
      (response: any) => {
        this.restApiData = response; // Assuming the REST API response is an array of objects
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }

  getAssignedEmployeesToChangeEstTime() {
    const apiUrl =
      environment.apiURL +
      `Allocation/getAssignedEmployeesToChangeEstTime/${this.data.jid ? this.data.jid : this.data.jId}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.restApiData = response.scopeDetails; // Assuming the REST API response is an array of objects
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }

  zipFiles(): void {
    let path = this.jobCommonDetails.jobCommonDetails.tranFileUploadPath;
    path = path.replace(/\\/g, '_');

    const fileUrl =
      environment.apiURL + 'Allocation/DownloadZipFile?path=' + `${path}`; // Replace with the actual URL of your zip file
    this.spinnerService.requestStarted();

    // Use HttpClient to make a GET request to fetch the zip file
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((response) => {
      this.spinnerService.requestEnded();

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
    let path = this.jobCommonDetails.jobCommonDetails.tranFileUploadPath;
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

    console.log(this.jobCommonDetailsJofilepath, "Tranfilrpath");

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

  onSubmit() {
    if (this.selectedQureryStatus == 6) {
      this.processMovement();
    } else if (this.selectedQureryStatus == 8) {
      this.changeEstTime();
    } else {
      // Handle the case when no option is selected or handle any other condition
    }
  }

  processMovement() {

    const apiUrl = environment.apiURL + `Allocation/processMovement`;
    let saveData = {
      id: 0,
      processId: this.loginservice.getProcessId(),
      statusId: this.selectedQureryStatus,
      selectedScopeId: this.selectedScope,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: this.remarks,
      isBench: true,
      jobId: this.data.jobId,
      value: this.estTime !== 0 ? this.estTime : 0,
      amount: 0,
      stitchCount: 0,
      estimationTime: this.estTime !== 0 ? this.estTime : 0,
      dateofDelivery: new Date().toISOString,
      comments: '',
      validity: 0,
      copyFiles: true,
      updatedBy: 0,
      jId: this.data.jid ? this.data.jid : this.data.jId,
      estimatedTime: 0,
      tranMasterId: 0,
      selectedRows: [
        {
          customerId: this.data.customerId,
          departmentId: this.data.departmentId,
          estimatedTime: this.estimatedTime,
          jId: this.data.jid ? this.data.jid : this.data.jId,
          tranMasterId: this.data.tranMasterId,
          Comments: '',
          TimeStamp: '',
          SelectedEmployees: '',
          JobId: '',
          FileInwardType: '',
          CommentsToClient: this.remarks,
          CategoryDesc: '',
          selectedEmployees: [],
          selectedRows: [],
        },
      ],
      selectedEmployees: [],
      departmentId: this.data.departmentId,
      updatedUTC: new Date().toISOString,
      categoryDesc: '',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: '',
      timeStamp: '',
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: new Date().toISOString,
      clientId: 0,
      customerId: 0,
      fileReceivedDate: new Date().toISOString,
      commentsToClient: '',
      isJobFilesNotTransfer: true,
    };
    this.spinnerService.requestStarted();
    this.http.post<any>(apiUrl, saveData).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe((response) => {
      this.spinnerService.requestEnded();
      if (response.success === true) {
        Swal.fire('Done!', response.message, 'success').then((response) => {
          if (response.isConfirmed) {
            this.dialogRef.close(true);

          }
      
        });
      } else if (response.success === false) {
        Swal.fire('Error!', response.message, 'error');
      }
    });
  }

  changeEstTime() {
    let estTimeData = {
      id: 0,
      processId: this.data.processId,
      statusId: this.selectedQureryStatus,
      selectedScopeId: this.selectedScope,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: this.remarks,
      isBench: true,
      jobId: this.data.jobId,
      value: 0,
      amount: 0,
      stitchCount: 0,
      dateofDelivery: new Date().toISOString,
      comments: ' ',
      validity: 0,
      copyFiles: true,
      updatedBy: this.loginservice.getUsername(),
      jId: this.data.jid ? this.data.jid : this.data.jId,
      estimatedTime: this.estimatedTime,
      tranMasterId: this.data.tranMasterId,
      selectedRows: [
        {
          customerId: this.data.customerId,
          departmentId: this.data.departmentId,
          estimatedTime: this.estimatedTime,
          jId: this.data.jid ? this.data.jid : this.data.jId,
          tranMasterId: this.data.tranMasterId,
          Comments: '',
          TimeStamp: '',
          SelectedEmployees: '',
          JobId: '',
          FileInwardType: '',
          CommentsToClient: this.remarks,
          CategoryDesc: '',
          selectedEmployees: [],
          selectedRows: [],
        },
      ],
      selectedEmployees: [],
      departmentId: this.data.departmentId,
      updatedUTC: new Date().toISOString,
      categoryDesc: ' ',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: ' ',
      timeStamp: '',
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: new Date().toISOString,
      clientId: 0,
      customerId: 0,
      fileReceivedDate: new Date().toISOString,
      commentsToClient: ' ',
      isJobFilesNotTransfer: true,
    };

    this.spinnerService.requestStarted();
    this.http
      .post<any>(environment.apiURL + 'Allocation/processMovement', estTimeData).pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
        })
      )
      .subscribe(
        (response) => {
          this.spinnerService.requestEnded();

          if (response.success === true) {
            Swal.fire(
              'Done!',
              'Job Sent As Query Successfully!',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close();
              }
            });
          } else if (response.success === false) {
            Swal.fire('Info!', 'Job Not Sent As Query', 'info');
          }
        }
      );
  }

  getQueryDetailList() {

    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/GetQuerySPDetailsForQA/${this.jobCommonDetails.jobCommonDetails.jid}`
      )
      .subscribe((result) => {
        this.QueryDetailsList = result;
      });
  }

}
