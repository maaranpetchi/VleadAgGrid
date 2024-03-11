import { Component, OnInit, ViewChild } from '@angular/core';
import { QualityallocationtableComponent } from '../qualityallocationtable/qualityallocationtable.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { Route, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QualitypopupjobassignComponent } from '../qualitypopupjobassign/qualitypopupjobassign.component';

interface Employee {
  id: number;
  name: string;
  shift: string;
}

@Component({
  selector: 'app-qualityallocation',
  templateUrl: './qualityallocation.component.html',
  styleUrls: ['./qualityallocation.component.scss']
})
export class QualityallocationComponent  implements OnInit {
  @ViewChild(QualityallocationtableComponent) QualityallocationtableComponent: QualityallocationtableComponent;

 
  pendingJobsCount: any;
  freshJobsCount: number;
  revisionJobsCount: number;
  reworkJobsCount: number;
  allocatedJobCount: number;
  queriesJobsCount: number;
  queryResponseJobsCount: number;
  errorJobsCount: number;
  quotationJobCount: number;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private loginservice: LoginService,
    ) { }
  ngOnInit(): void {
    this.getCount()
  }


  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    switch (event.index) {
      case 0: // Fresh Jobs tab
        // Call your REST API for Fresh Jobs
        this.freshJobs();
        
        break;
      case 1: // Revision Jobs tab

        // Call your REST API for Revision Jobs
        this.revisionJobs();
        break;
      case 2: // Rework Jobs tab
        // Call your REST API for Rework Jobs
        this.reworkJobs();
        break;
      case 3: // Quote Jobs tab
        // Call your REST API for Quote Jobs
        this.allocatedJobs();
        break;
      case 4:
        this.queries();
        break;
      case 5:
        this.queryResponse();
        break;
        case 6:
          this.errorJobs();
          break;
        case 7:
          this.quotationJobs();
          break;
      default:
        break;
    }
  }

  freshJobs() {
    this.QualityallocationtableComponent.tab('1');
  };

  revisionJobs() {
    this.QualityallocationtableComponent.tab('2');
  };
  reworkJobs() {
    this.QualityallocationtableComponent.tab('3');
  };
  allocatedJobs() {
    this.QualityallocationtableComponent.tab('4');
  }
  queries() {
    this.QualityallocationtableComponent.tab('5');
  }
  queryResponse() {
    this.QualityallocationtableComponent.tab('6');
  }
errorJobs(){
  this.QualityallocationtableComponent.tab('7');
}
quotationJobs(){
  this.QualityallocationtableComponent.tab('8');
}

getCount() {
  return this.http
    .get<any>(
      environment.apiURL +
        `Allocation/getCount/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/0`
    )
    .subscribe((freshDataCount) => {
     this.pendingJobsCount= freshDataCount.pendingJobsCount,
     this.freshJobsCount = freshDataCount.freshJobsCount,
     this.revisionJobsCount= freshDataCount.revisionJobsCount,
     this.reworkJobsCount= freshDataCount.reworkJobsCount,
     this.allocatedJobCount = freshDataCount.allocatedJobCount
     this.queriesJobsCount= freshDataCount.queriesJobsCount,
     this.queryResponseJobsCount= freshDataCount.queryResponseJobsCount,
     this.errorJobsCount= freshDataCount.errorJobsCount,
     this.quotationJobCount= freshDataCount.quotationJobCount
    });
}
}
