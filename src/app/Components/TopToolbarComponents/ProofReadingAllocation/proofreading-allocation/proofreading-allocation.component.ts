import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { ProofreadingAlocationtableComponent } from '../proofreading-alocationtable/proofreading-alocationtable.component';
@Component({
  selector: 'app-proofreading-allocation',
  templateUrl: './proofreading-allocation.component.html',
  styleUrls: ['./proofreading-allocation.component.scss']
})
export class ProofreadingAllocationComponent implements OnInit {
  @ViewChild(ProofreadingAlocationtableComponent) ProofreadingAlocationtableComponent: ProofreadingAlocationtableComponent;

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
      default:
        break;
    }
  }

  freshJobs() {
    this.ProofreadingAlocationtableComponent.tab('1');
  };

  revisionJobs() {
    this.ProofreadingAlocationtableComponent.tab('2');
  };
  reworkJobs() {
    this.ProofreadingAlocationtableComponent.tab('3');
  };
  allocatedJobs() {
    this.ProofreadingAlocationtableComponent.tab('4');
  }
  queries() {
    this.ProofreadingAlocationtableComponent.tab('5');
  }
  queryResponse() {
    this.ProofreadingAlocationtableComponent.tab('6');
  }
errorJobs(){
  this.ProofreadingAlocationtableComponent.tab('7');
}
quotationJobs(){
  this.ProofreadingAlocationtableComponent.tab('8');
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
