import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import saveAs from 'file-saver';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-job-categorypopup',
  templateUrl: './job-categorypopup.component.html',
  styleUrls: ['./job-categorypopup.component.scss']
})
export class JobCategorypopupComponent implements OnInit {
  jobCommonDetails: any;
  jobCommonDetailsJofilepath: any;

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  private http: HttpClient,
  private loginservice:LoginService,
  private spinnerService: SpinnerService
  ){
  }
  
 displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataJobSource: MatTableDataSource<any>;
 displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'jobStatus', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataQuerySource: MatTableDataSource<any>;

 remarks: string;  // to store the remark value
 selectedQureryStatus: string; // to store the selected query status
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
    // this.getAssignedEmployeesToChangeEstTime();
    
  }
  getIsVisible():any{
      return this.dataQuerySource.data.length >0;
 }
  onFilterChange() {
    if (this.selectedQureryStatus == 'Query') {
      this.remarksdata = true;
      this.EstimatedTime = false;
      this.EmployeData = false;
    } else if (this.selectedQureryStatus == 'specialpricing') {
      this.EstimatedTime = true;
      this.remarksdata = true;
      this.EmployeData = true;
      this.http
        .get<any>(
          environment.apiURL +
            `Allocation/getAssignedEmployeesToChangeEstTime/${this.data.jId}`
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
        this.Scopes = scopedata.scopeDetails // Sort the scopes based on the 'name' property
      });
  }
  fetchData() {
    const apiUrl = environment.apiURL + 'JobOrder/getJobHistory';

    this.http.post<any>(apiUrl, this.data.jId?this.data.jId:0).subscribe((response: any) => {
        this.jobCommonDetails = response;
        this.jobCommonDetailsJofilepath = response.jobCommonDetails.jofileUploadPath;
        this.dataJobSource = response;
        this.dataJobSource = new MatTableDataSource(response.jobHistory);
        this.dataJobSource.paginator = this.paginator;
        this.dataJobSource.sort = this.sort; // Assuming the REST API response is an array of objects
        this.dataQuerySource = response;
        this.dataQuerySource = new MatTableDataSource(response.jobQueryHistory);
        this.dataQuerySource.paginator = this.paginator1;
        this.dataQuerySource.sort = this.sort;
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
      jid: this.data.jId,
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
      `Allocation/getAssignedEmployeesToChangeEstTime/${this.data.jId}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.Scopes = response.scopeDetails; // Assuming the REST API response is an array of objects
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
  onSubmit() {
    if (this.selectedQureryStatus == 'Query') {
      this.processMovement();
    } else if (this.selectedQureryStatus === 'specialpricing') {
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
      statusId: 0,
      selectedScopeId: 0,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: this.remarks,
      isBench: true,
      jobId: this.data.jobId,
      value: 0,
      amount: 0,
      stitchCount: 0,
      estimationTime: this.estTime !== 0 ? this.estTime : 0,
      dateofDelivery: '2023-07-01T10:02:55.095Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: 0,
      jId: this.data.jId,
      estimatedTime: 0,
      tranMasterId: 0,
      selectedRows: this.data.selectedJobs,
      selectedEmployees: [],
      departmentId: 0,
      updatedUTC: '2023-07-01T10:02:55.095Z',
      categoryDesc: 'string',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: 'string',
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: '2023-07-01T10:02:55.095Z',
      clientId: 0,
      customerId: 0,
      fileReceivedDate: '2023-07-01T10:02:55.095Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    this.spinnerService.requestStarted();
    this.http.post<any>(apiUrl, saveData).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe((response) => {
      this.spinnerService.requestEnded();
      // Handle the API response
    },
    (error) => {
      console.log(error);
      this.spinnerService.resetSpinner();
      return Swal.fire('Alert!','An error occurred while processing your request','error');
      // Handle the API error
    });
  }

  changeEstTime() {
    let estTimeData = {
      id: 0,
      processId:3,
      statusId: 0,
      selectedScopeId: 0,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: null,
      isBench: true,
      jobId: 'string',
      value: 0,
      amount: 0,
      stitchCount: 0,
      dateofDelivery: '2023-07-01T11:15:03.552Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: this.loginservice.getUsername(),
      jId: this.data.jId,
      estimatedTime: this.estimatedTime,
      tranMasterId: this.data.tranMasterId,
      selectedRows: [],
      selectedEmployees: [],
      departmentId: 0,
      updatedUTC: '2023-07-01T11:15:03.552Z',
      categoryDesc: 'string',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: this.data.timeStamp,
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: '2023-07-01T11:15:03.552Z',
      clientId: 0,
      customerId: 0,
      fileReceivedDate: '2023-07-01T11:15:03.553Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL+'Allocation/changeEstimatedTime', estTimeData).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe(
      (response) => {
        this.spinnerService.resetSpinner();
        // Handle the API response
      },
      (error) => {
        console.log(error);
        this.spinnerService.resetSpinner();
        return Swal.fire('Alert!','An error occurred while processing your request','error');
        // Handle the API error
      }
    );
  
  }
}
