import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-joballocated-emplpopup',
  templateUrl: './joballocated-emplpopup.component.html',
  styleUrls: ['./joballocated-emplpopup.component.scss'],
})
export class JoballocatedEmplpopupComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['employee', 'estimatedTime', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private loginservice: LoginService,
    private spinnerService: SpinnerService,
  ) {}
  ngOnInit(): void {
    this.getJobAllocatedDetails();
  }

  getJobAllocatedDetails() {
    let storeData = {
      tranId: this.data.tranId,
      tranMasterId: 0,
      estimatedTime: 0,
      statusId: 0,
      divEmpId: 0,
      employeeName: '',
      employeeCount: 0,
      timeStamp: '',
      processId: 0,
      isActive: true,
      allocatedEstimatedTime: 0,
      projectCode: '',
      customerClassification: '',
      dateofDelivery: '2023-07-07T06:29:53.271Z',
      previousProcessId: 0,
      artistName: '',
      name: '',
      jid: 0,
      jobId: '',
      jobDate: '2023-07-07T06:29:53.271Z',
      queryJobDate: '2023-07-07T06:29:53.271Z',
      isDeleted: true,
      fileName: '',
      customerJobType: 't',
      commentsToClient: '',
      jobStatusId: 0,
      jobStatusDescription: '',
      customerId: 0,
      shortName: '',
      isBulk: true,
      categoryDesc: '',
      employeeId:  this.loginservice.getUsername(),
      workStatus: '',
      scopeDesc: '',
      jobDateQueryDate: '2023-07-07T06:29:53.271Z',
      estjobDate: '2023-07-07T06:29:53.271Z',
      estfileReceivedDate: '2023-07-07T06:29:53.271Z',
      jobDateEst: '2023-07-07T06:29:53.271Z',
      fileInwardType: '',
      overAllTime: 0,
      trayTime: 0,
      balanceTime: 0,
    };
    this.spinnerService.requestStarted();
    this.http
      .post(
        environment.apiURL + 'JobOrder/GetAssignedEmployees',
        storeData
      )
      .pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire('Alert!','An error occurred while processing your request','error');
        })
      )
      .subscribe(
        (response:any) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(response.assignedEmployees);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          this.spinnerService.resetSpinner();
          return Swal.fire('Alert!','An error occurred while processing your request','error');
        }
      );
  
  }
}
