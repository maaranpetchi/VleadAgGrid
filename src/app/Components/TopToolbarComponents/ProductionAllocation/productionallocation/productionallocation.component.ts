import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobAssignedDetailsPopupComponent } from '../job-assigned-details-popup/job-assigned-details-popup.component';
import { ProductionallocationtableComponent } from '../productionallocationtable/productionallocationtable.component';
import { environment } from 'src/Environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { event } from 'jquery';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-productionallocation',
  templateUrl: './productionallocation.component.html',
  styleUrls: ['./productionallocation.component.scss'],
})
export class ProductionallocationComponent implements OnInit {
  @ViewChild(ProductionallocationtableComponent)
  ProductionallocationtableComponent: ProductionallocationtableComponent;

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
    private spinnerservice:SpinnerService,
    private sharedService:SharedService
  ) {}
  ngOnInit(): void {
    this.sharedService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.getCount();
    });
    this.getCount();
    this.onTabChange(event);
  }

  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    console.log(event.index, "Index Page");
    
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
    this.ProductionallocationtableComponent.tab('1');
  }
  revisionJobs() {
    this.ProductionallocationtableComponent.tab('2');
  }
  reworkJobs() {
    this.ProductionallocationtableComponent.tab('3');
  }
  allocatedJobs() {
    this.ProductionallocationtableComponent.tab('4');
  }
  queries() {
    this.ProductionallocationtableComponent.tab('5');
  }
  queryResponse() {
    this.ProductionallocationtableComponent.tab('6');
  }
  errorJobs() {
    this.ProductionallocationtableComponent.tab('7');
  }
  quotationJobs() {
    this.ProductionallocationtableComponent.tab('8');
  }

  getCount() {
  this.spinnerservice.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getCount/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/0`
      )
      .subscribe((freshDataCount) => {
        (this.pendingJobsCount = freshDataCount.pendingJobsCount),
          (this.freshJobsCount = freshDataCount.freshJobsCount),
          (this.revisionJobsCount = freshDataCount.revisionJobsCount),
          (this.reworkJobsCount = freshDataCount.reworkJobsCount),
          (this.allocatedJobCount = freshDataCount.allocatedJobCount);
        (this.queriesJobsCount = freshDataCount.queriesJobsCount),
          (this.queryResponseJobsCount = freshDataCount.queryResponseJobsCount),
          (this.errorJobsCount = freshDataCount.errorJobsCount),
          (this.quotationJobCount = freshDataCount.quotationJobCount);
          this.spinnerservice.requestEnded();
      });
  }
}
