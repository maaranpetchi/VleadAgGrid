import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsClientIndexComponent } from './job-details-client-index/job-details-client-index.component';
import { environment } from 'src/Environments/environment';
import * as e from 'cors';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';


@Component({
  selector: 'app-query-to-client',
  templateUrl: './query-to-client.component.html',
  styleUrls: ['./query-to-client.component.scss'],
})
export class QueryToClientComponent implements OnInit {
  displayedColumns: string[] = [
    'selected',
    'jobId',
    'jobName',
    'fileName',
    'fileReceivedEstDate',
    'fileInwardMode',
    'client',
    'customerSatisfaction',
    'status',
  ];
  displayedColumnsVisibility: any = {
    selected: true,
    jobId: true,
    jobName: true,
    fileName: true,
    fileReceivedEstDate: true,
    fileInwardMode: true,
    client: true,
    customerSatisfaction: true,
    status: true,
  };
  visibility() {
    let result: string[] = [];
    if (this.displayedColumnsVisibility.selected) {
      result.push('selected');
    }

    if (this.displayedColumnsVisibility.jobId) {
      result.push('jobId');
    }
    if (this.displayedColumnsVisibility.jobName) {
      result.push('jobName');
    }

    if (this.displayedColumnsVisibility.fileName) {
      result.push('fileName');
    }
    if (this.displayedColumnsVisibility.fileReceivedEstDate) {
      result.push('fileReceivedEstDate');
    }
    if (this.displayedColumnsVisibility.fileInwardMode) {
      result.push('fileInwardMode');
    }
    if (this.displayedColumnsVisibility.jobName) {
      result.push('client');
    }
    if (this.displayedColumnsVisibility.customerSatisfaction) {
      result.push('customerSatisfaction');
    }
    if (this.displayedColumnsVisibility.status) {
      result.push('status');
    }

    return result;
  }
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient,
    private loginservice: LoginService,
    private dialog: MatDialog,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    //to get the data and show it in table
  this.queriesToClient();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //to save the checkbox value
  selectedQuery: any[] = [];

  setAll(completed: boolean, item: any) {
    if (completed == true) {
      this.selectedQuery.push(item);
    } else {
      if (this.selectedQuery.find((x) => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter((x) => {
          if (x.id != item.id) {
            return item;
          }
        });
      }
    }
  }

  convertedDate:string;
queriesToClient(){
  this.spinnerService.requestStarted();
  this.http.get<any>( environment.apiURL+ `Allocation/getQueryPendingJobs/${this.loginservice.getUsername()}/1/0`).subscribe(data => {
   this.spinnerService.requestEnded();
    this.dataSource = data.queryPendingJobs;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumnsVisibility.status = true;
    const apiDate = data.date; // Assuming the API response has a 'date' property
  },
  error => {
    this.spinnerService.resetSpinner(); // Reset the spinner if the request times out
  });  
}
//query
queryResponse(){
  this.spinnerService.requestStarted();
  this.http.get<any>(environment.apiURL+`Allocation/getQueryResponseJobs/${this.loginservice.getUsername()}/1`).subscribe(data => {
    this.spinnerService.requestEnded();
    this.dataSource = data.queryResponseJobs;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumnsVisibility.status = true;
  },
  error => {
    this.spinnerService.resetSpinner(); // Reset the spinner if the request times out
  });  
}
cancelledJobs(){
  this.spinnerService.requestStarted();
  this.http.get<any>(environment.apiURL+`Allocation/getPendingJobs/${this.loginservice.getUsername()}/1`).subscribe(data => {
    this.spinnerService.requestEnded();
    this.dataSource = data.cancelledJobs;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumnsVisibility.status = true;
  },
  error => {
    this.spinnerService.resetSpinner(); // Reset the spinner if the request times out
  });  
}
quotationJobs(){
  this.spinnerService.requestStarted();
  this.http.get<any>(environment.apiURL+`Allocation/getPendingJobs/${this.loginservice.getUsername()}/1`).subscribe(data => {
    this.spinnerService.requestEnded();
    this.dataSource = data.quotationJobs;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumnsVisibility.status = false;
  },
  error => {
    this.spinnerService.resetSpinner(); // Reset the spinner if the request times out
  });  
}


  tab(action) {
    if (action == '1') {
      this.queriesToClient();
    } else if (action == '2') {
      this.queryResponse();
    } else if (action == '3') {
      this.cancelledJobs();
    } else if (action == '4') {
      this.quotationJobs();
    }
  }

getJobDetails(data){
  const dialogRef =  this.dialog.open(JobDetailsClientIndexComponent,{
  width:'80vw',
  data
})
dialogRef.afterClosed().subscribe(result => {
this.ngOnInit();
});
}


 //textcolor
 getCellClass(data) {
    return {
    'text-color-green': data.employeeCount === 1,
    'text-color-brown': data.queryJobDate !== null,
    'text-color-blue': data.employeeCount > 1,
    'text-color-DeepSkyBlue': data.customerJobType === 'Trial',
    'text-color-yellow': data.statusId === 10,
    'text-color-red': data.statusId === 11,
    'SuperRush': data.jobStatusId === 1 || data.jobStatusId === 3 || data.jobStatusId === 7,
    'Rush': data.jobStatusId === 2 || data.jobStatusId === 4 || data.jobStatusId === 8
  };
}
}
