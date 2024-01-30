import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import saveAs from 'file-saver';
import { error } from 'jquery';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

interface Folder {
  id: number;
  name: string;
  files: string[]; // Array of file names in the folder
}
@Component({
  selector: 'app-qualitypopupjobassign',
  templateUrl: './qualitypopupjobassign.component.html',
  styleUrls: ['./qualitypopupjobassign.component.scss'],
})



export class QualitypopupjobassignComponent implements OnInit {
  restApiData: any[];
  // displayedColumns: string[] = [
  //   'sNo',
  //   'jobId',
  //   'client',
  //   'assignedDate',
  //   'fileName',
  //   'tray',
  //   'estimatedTime',
  //   'status',
  // ];
  EstimatedTime: boolean = false;
  remarksdata: boolean = false;
  EmployeData: boolean = false;
  EmployeDatascope: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedEmployees: any;

  Employees: any[];
  estTime: number;
  jobCommonDetails: any;
  selectedScope: any = 0;
  Scopes: any[] = [];
  QueryDetailsList: any;
  confirmationMessage: any;
  selectedJobs: { DepartmentId: any; TranMasterId: any; JId: any; CustomerId: any; JobId: any; Comments: any; TimeStamp: any; CategoryDesc: any; SelectedRows: any; FileInwardType: any; CommentsToClient: any; SelectedEmployees: any }[];
  ChangeEstTimeData: any;
  getJobHistoryData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private loginservice: LoginService,
    private spinnerservice: SpinnerService,
    private dialogRef: MatDialogRef<QualitypopupjobassignComponent>
  ) {
    this.fetchData();
  }
  displayedJobColumns: string[] = [
    'movedFrom',
    'movedTo',
    'movedDate',
    'movedBy',
    'MovedTo',
    'remarks',
  ];
  dataJobSource: MatTableDataSource<any[]>;
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

  selectedQureryStatus: number;
  remarks: string;
  estimatedTime: any;

  ngOnInit() {
    this.fetchData(); // Call the function to fetch data from the REST API
    this.getAssignedEmployeesToChangeEstTime(); // this function for getting values in drop down list
    this.QueryDetailspost(); // this function for get the wftId and Jid
    this.fetchScopes();
  }


  onFilterChange() {
    if (this.selectedQureryStatus == 6) {
      this.remarksdata = true;
      this.EstimatedTime = false;
      this.EmployeData = false;
      this.EmployeDatascope = false;
    } else if (this.selectedQureryStatus == 8) {
      this.EstimatedTime = true;
      this.remarksdata = true;
      this.EmployeData = false;
      this.EmployeDatascope = true;
    } else if (this.selectedQureryStatus == 100) {
      this.EstimatedTime = false;
      this.EmployeData = true;
      this.remarksdata = false;
      this.EmployeDatascope = false;

      this.http
        .get<any>(
          environment.apiURL +
          `Allocation/getAssignedEmployeesToChangeEstTime/${this.data.jid}`
        )
        .subscribe((response) => {
          this.Employees = response.assignedEmployees;
        });
    }
  }
  fetchData() {
    const apiUrl = environment.apiURL + 'JobOrder/getJobHistory';
console.log(this.data,"DataJID");

    this.http.post<any>(apiUrl, this.data.jId ? this.data.jId : 0).subscribe(
      (response: any) => {
        this.getJobHistoryData = response;
        this.jobCommonDetails = response.jobCommonDetails.description;
        this.dataJobSource = new MatTableDataSource(response.jobHistory);
        this.dataQuerySource =new MatTableDataSource(response.jobQueryHistory);
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }

  getAssignedEmployeesToChangeEstTime() {
    const apiUrl =
      environment.apiURL +
      `Allocation/getAssignedEmployeesToChangeEstTime/${this.data.jId ? this.data.jId:0}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.ChangeEstTimeData = response; // Assuming the REST API response is an array of objects
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }
  gettingScope: any;
  QueryDetailspost() {
    const apiUrl = environment.apiURL + `ClientOrderService/QueryDetailspost`;
    var datas = {
      wftid: this.data.jId,
      // jid: this.data.jId,
    };


    this.http.post(apiUrl, datas).subscribe(
      (response: any) => {
        // this.restApiData = response;
       
        console.log(this.gettingScope,"gettingsope");
         // Assuming the REST API response is an array of objects
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
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

  onSubmit() {
    if (this.selectedQureryStatus == 6 || this.selectedQureryStatus == 8) {
      this.processMovement();
    } else if (this.selectedQureryStatus == 100) {
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
      value: 0,
      amount: 0,
      stitchCount: 0,
      estimationTime: this.estimatedTime !== 0 ? this.estimatedTime : 0,
      dateofDelivery: '2023-07-01T10:02:55.095Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: 0,
      jId: this.data.jId,
      estimatedTime: this.estimatedTime,
      tranMasterId: 0,
      selectedRows: [
        {
          customerId: this.data.customerId,
          departmentId: this.data.departmentId,
          estimatedTime: this.estimatedTime,
          jId: this.data.jid,
          tranMasterId: this.data.tranMasterId,
          Comments: '',
          TimeStamp: '',
          SelectedEmployees: '',
          JobId: this.data.jobId,
          FileInwardType: '',
          CommentsToClient: '',
          CategoryDesc: '',
          selectedEmployees: [],
          selectedRows: [],
        },
      ],
      selectedEmployees: [],
      departmentId: this.data.departmentId,
      updatedUTC: '2023-07-01T10:02:55.095Z',
      categoryDesc: 'string',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: '',
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: '2023-07-01T10:02:55.095Z',
      clientId: 0,
      customerId: 0,
      fileReceivedDate: '2023-07-01T10:02:55.095Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    this.spinnerservice.requestStarted();
    this.http.post<any>(apiUrl, saveData).pipe(
      catchError((error) => {
        this.spinnerservice.requestEnded();
        console.error('API Error:', error);
        return Swal.fire(
          'Alert!',
          'An error occurred while processing your request',
          'error'
        );
      })
    ).subscribe({
      next: (val) => {
        this.spinnerservice.requestEnded();

        if (val.success === true) {
          Swal.fire('Done!', val.message, 'success').then((val) => {
          });
        }
      },
      error: (err) => {
        this.spinnerservice.resetSpinner();
        console.log(err);
        Swal.fire(
          'Alert!',
          'An error occurred while processing your request',
          'error'
        );
      }
    });
  }

  changeEstTime() {
    let estTimeData = {
      id: 0,
      processId: 3,
      statusId: this.selectedQureryStatus,
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
      departmentId: this.data.departmentId,
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
    this.spinnerservice.requestStarted();
    this.http.post<any>(environment.apiURL + 'Allocation/changeEstimatedTime', estTimeData).subscribe(
      (response) => {
        this.spinnerservice.requestEnded();

        if (response.success === true) {
          Swal.fire('Done!', response.message, 'success');
        } else if (response.success === false) {
          Swal.fire('Error!', response.message, 'error');
        };
        // Handle the API response
      },
      (error) => {
        console.log(error);

        // Handle the API error
      }
    );

  }

  close() {
    this.dialogRef.close()
  }
  // workFiles(id:number){
  //   const folder = this.data.find(f => f.id === id);


  //   if (folder) {
  //     folder.files.forEach(fileName => {
  //       // Check if the file type is Excel or text
  //       if (fileName.endsWith('.xlsx') || fileName.endsWith('.txt')) {
  //         const downloadLink = document.createElement('a');
  //         downloadLink.href = 'JobFiles\PRAS' + fileName; // Replace with your folder path
  //         downloadLink.download = fileName;
  //         downloadLink.click();
  //       } else {
  //       }
  //     });
  //   } else {
  //   }
  // }


  zipFiles(): void {
    let path = this.data.tranFileUploadPath || this.jobCommonDetails.jobCommonDetails.tranFileUploadPath;
    path = path.replace(/\\/g, '_');

    const fileUrl =
      environment.apiURL + 'Allocation/DownloadZipFile?path=' + `${path}`; // Replace with the actual URL of your zip file

    // Use HttpClient to make a GET request to fetch the zip file
    this.spinnerservice.requestStarted();
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((response) => {
      this.spinnerservice.requestEnded();
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

  //Workfile downlaod//
  workFiles(id: number): void {

    let path = this.data.tranFileUploadPath || this.jobCommonDetails.jobCommonDetails.tranFileUploadPath;

    console.log(path, "PathFiles");

    path = path.replace(/\\/g, '_');
    this.spinnerservice.requestStarted();
    this.http
      .get(environment.apiURL + `Allocation/getFileNames/${path}`)
      .subscribe((response: any) => {
        const fileUrls: string[] = response.files;
        fileUrls.forEach((url) => {
          this.http.get(environment.apiURL + 'Allocation/downloadFilesTest/' + `${path}/` + url).subscribe((response: any) => {
            this.spinnerservice.requestEnded();
            saveAs(
              new Blob([response.data], { type: 'application/octet-stream' }),
              url
            );
          });
        });
      });
  }
  getFileNameFromPath(filePath: string): string {
    const pathParts = filePath.split('/');
    return pathParts[pathParts.length - 1];
  }

  //////////////Popupsubmit////

  getQueryDetailList() {

    this.http.get<any>(environment.apiURL + `Allocation/GetQuerySPDetailsForQA/${this.jobCommonDetails.jobCommonDetails.jid}`).subscribe(result => {
      this.QueryDetailsList = result;
    })
  }
  stitchCountdisplay: boolean = false;
  stitchCount: any;



}
