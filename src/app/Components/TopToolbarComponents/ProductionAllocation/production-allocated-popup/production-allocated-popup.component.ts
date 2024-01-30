import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import saveAs from 'file-saver';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
@Component({
  selector: 'app-production-allocated-popup',
  templateUrl: './production-allocated-popup.component.html',
  styleUrls: ['./production-allocated-popup.component.scss'],
})
export class ProductionAllocatedPopupComponent implements OnInit {
  jobCommonDetails: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private loginservice: LoginService,
    private _coreService: CoreService,
    private router: Router,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<ProductionAllocatedPopupComponent>
  ) {}

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
  selectedQureryStatus: any; // to store the selected query status
  estimatedTime: string;

  EstimatedTime: boolean = false;
  remarksdata: boolean = false;
  EmployeData: boolean = false;

  selectedScope: any;
  Scopes: any[];
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
  getIsVisible(): any {
    return this.dataQuerySource.data.length > 0;
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
          this.Scopes = response.assignedEmployees;
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
        this.Scopes = scopedata.scopeDetails;
        this.Scopes.sort((a, b) => a.name.localeCompare(b.name)); // Sort the scopes based on the 'name' property
      });
  }
  fetchData() {
    const apiUrl = environment.apiURL + 'JobOrder/getJobHistory';

    this.http.post<any>(apiUrl, this.data.jId ? this.data.jId : 0).subscribe(
      (response: any) => {
        this.jobCommonDetails = response;
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
  workFiles(id: number): void {
    let path = this.jobCommonDetails.jobCommonDetails.tranFileUploadPath;
    path = path.replace(/\\/g, '_');

    this.http
      .get(environment.apiURL + `Allocation/getFileNames/${path}`)
      .subscribe((response: any) => {
        const fileUrls: string[] = response.files;
        fileUrls.forEach((url) => {
          this.http
            .get(
              environment.apiURL +
                'Allocation/downloadFilesTest/' +
                `${path}/` +
                url
            )
            .subscribe((response: any) => {
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
  onSubmit() {
    this.processMovement();
  }
  close() {
    this.dialogRef.close();
  }

  processMovement() {
    let saveData = {
      id: 0,
      processId: 3,
      statusId: this.selectedQureryStatus,
      selectedScopeId: 0,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: this.remarks,
      isBench: true,
      jobId: this.data.jobId,
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
      selectedRows: [
        {
          customerId: this.data.customerId,
          departmentId: this.data.departmentId,
          estimatedTime: this.estimatedTime,
          jId: this.data.jId,
          tranMasterId: this.data.tranMasterId,
        },
      ],
      selectedEmployees: [],
      departmentId: this.data.departmentId,
      updatedUTC: '2023-07-01T11:15:03.552Z',
      categoryDesc: 'string',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: '',
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: '2023-07-01T11:15:03.552Z',
      clientId: 0,
      customerId: this.data.customerId,
      fileReceivedDate: '2023-07-01T11:15:03.553Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    try {
      this.spinnerService.requestStarted();
      this.http
        .post<any>(environment.apiURL + 'Allocation/processMovement', saveData)
        .pipe(
          catchError((error) => {
            this.spinnerService.requestEnded();
            console.error('API Error:', error);
            return Swal.fire(
              'Alert!',
              'An error occurred while processing your request',
              'error'
            );
          })
        )
        .subscribe((response) => {
          Swal.fire('Good job!', 'You clicked the button!', 'success');
        });
    } catch (error) {
      this.spinnerService.requestEnded();
      console.error('API Error:', error);
      Swal.fire(
        'Alert!',
        'An error occurred while processing your request',
        'error'
      );
    }
  }

  changeEstTime() {
    let selectedRows = [
      {
        id: 0,
        processId: 3,
        statusId: this.selectedQureryStatus,
        selectedScopeId: 0,
        autoUploadJobs: true,
        employeeId: this.loginservice.getUsername(),
        remarks: this.remarks,
        isBench: true,
        jobId: this.data.jobId,
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
        timeStamp: '',
        scopeId: 0,
        quotationRaisedby: 0,
        quotationraisedOn: '2023-07-01T11:15:03.552Z',
        clientId: 0,
        customerId: this.data.customerId,
        fileReceivedDate: '2023-07-01T11:15:03.553Z',
        commentsToClient: 'string',
        isJobFilesNotTransfer: true,
      },
    ];
    let estTimeData = {
      id: 0,
      processId: 3,
      statusId: this.selectedQureryStatus,
      selectedScopeId: 0,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: this.remarks,
      isBench: true,
      jobId: this.data.jobId,
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
      selectedRows: selectedRows,
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
      customerId: this.data.customerId,
      fileReceivedDate: '2023-07-01T11:15:03.553Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    
try{
  this.spinnerService.requestEnded();
    this.http
      .post<any>(
        environment.apiURL + 'Allocation/changeEstimatedTime',
        estTimeData
      ).pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire(
            'Alert!',
            'An error occurred while processing your request',
            'error'
          );
        })
      )
      .subscribe((response) => {
        Swal.fire('Good job!', 'You clicked the button!', 'success');
      });
  } catch (error) {
    this.spinnerService.resetSpinner();
    console.error('API Error:', error);
    Swal.fire(
      'Alert!',
      'An error occurred while processing your request',
      'error'
    );
  }
}
}
