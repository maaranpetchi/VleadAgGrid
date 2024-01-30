import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'jquery';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-employee-popup-table',
  templateUrl: './employee-popup-table.component.html',
  styleUrls: ['./employee-popup-table.component.scss'],
})
export class EmployeePopupTableComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'jobId',
    'client',
    'assignDate',
    'fileName',
    'tray',
    'estTime',
    'status',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  estimatedTime: any;
  totalDataCount: any;
  totalEstimatedTime: number;
  tableRecords: any[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private loginservice: LoginService,
    private spinnerService: SpinnerService,
  ) {}
  ngOnInit(): void {
    this.GetPendingJobsWithEmployeeId();
  }
  
//   loadtime(){
//     this.lnkLoadTime(this.data)
//   }

//   lnkLoadTime(data) {
//     var empid = {
//         EmployeeId: data,
//     }
//    this.http.post(environment.apiURL+'JobOrder/GetPendingJobsWithEmployeeId', empid).subscribe({
//     next:(response:any)=>{
//       let Pendingjobs= response.pendingJobsWithEmployeeId

//       this.estimatedTime = 0;
//       for (var i in Pendingjobs) {
//         this.estimatedTime = Pendingjobs[i].EstimatedTime + this.estimatedTime;
//      }
//     },
//     error:(err)=>{
//       console.log(err);
      
//     }

//    })
// }
  GetPendingJobsWithEmployeeId() {
    let saveData = {
      tranId: 0,
      tranMasterId: 0,
      estimatedTime: this.data.estimatedTime,
      statusId: 0,
      divEmpId: 0,
      employeeName: '',
      employeeCount: 0,
      timeStamp: '',
      departmentId: 0,
      isActive: true,
      allocatedEstimatedTime: 0,
      projectCode: '',
      customerClassification: '',
      dateofDelivery: '2023-07-03T07:31:20.724Z',
      previousProcessId: 0,
      artistName: '',
      name: '',
      jid: 0,
      jobId: '',
      jobDate: '2023-07-03T07:31:20.724Z',
      queryJobDate: '2023-07-03T07:31:20.724Z',
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
      jobDateQueryDate: '2023-07-03T07:31:20.724Z',
      estjobDate: '2023-07-03T07:31:20.724Z',
      estfileReceivedDate: '2023-07-03T07:31:20.724Z',
      jobDateEst: '2023-07-03T07:31:20.724Z',
      fileInwardType: '',
      overAllTime: 0,
      trayTime: 0,
      balanceTime: 0,
    };
    this.spinnerService.requestStarted();
    this.http
      .post(
        environment.apiURL + 'JobOrder/GetPendingJobsWithEmployeeId',
        saveData
      )
      .subscribe(
        (response:any) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(response.pendingJobsWithEmployeeId);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.totalDataCount = response.pendingJobsWithEmployeeId.length;

          // let Pendingjobs:any[]= response.pendingJobsWithEmployeeId

          // Pendingjobs.map(x=>{
          //   this.estimatedTime = x.estimatedTime + this.estimatedTime;
          // })
          this.totalEstimatedTime = this.tableRecords.reduce(
            (total, record) => total + record.estimatedTime,
            0
          );
                
        },
        (error) => {
          this.spinnerService.resetSpinner();
          console.log(error);
        }
      );
  }
}
