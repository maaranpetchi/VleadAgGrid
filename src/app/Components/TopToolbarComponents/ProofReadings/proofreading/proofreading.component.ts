import { Component, OnInit, ViewChild } from '@angular/core';
// import { ProofReadingAllocationTableComponent } from '../../ProofReading/proof-reading-allocation-table/proof-reading-allocation-table.component';
import { HttpClient } from '@angular/common/http';
import { ProofReadingTableComponent } from '../proof-reading-table/proof-reading-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ProofjobdetailpopupComponent } from '../proofjobdetailpopup/proofjobdetailpopup.component';
import { ProofworkflowComponent } from '../proofworkflow/proofworkflow.component';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';

@Component({
  selector: 'app-proofreading',
  templateUrl: './proofreading.component.html',
  styleUrls: ['./proofreading.component.scss']
})
export class ProofreadingComponent implements OnInit {
  @ViewChild(ProofReadingTableComponent) ProofReadingTableComponent: ProofReadingTableComponent;
  freshJobsCount: any;
  revisionJobsCount: number;
  reworkJobsCount: number;
  bulkJobsCount: number;
  quoteJobsCount: number;
  bulkUploadJobsCount: number;

  constructor(private http: HttpClient, public dialog: MatDialog, private loginService: LoginService, private spinnerService: SpinnerService) {
    this.getCount();
  }
  ngOnInit() {
    this.freshJobs();
  }


  currentTab = 1;

  getCurrentTab() {
    return this.currentTab;

  }
  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    this.currentTab = event.index + 1;
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
        this.quoteJobs();

        break;
      case 4: // Bulk Jobs tab
        // Call your REST API for Bulk Jobs
        this.bulkJobs();
        break;
      case 5: // Bulk Upload Jobs tab
        // Call your REST API for Bulk Upload Jobs
        this.bulkUploadJobs();
        break;
      default:
        break;
    }
  }


  freshJobs() {
    this.ProofReadingTableComponent.tab('1');
  }
  revisionJobs() {
    this.ProofReadingTableComponent.tab('2');
  }
  reworkJobs() {
    this.ProofReadingTableComponent.tab('3');
  }
  quoteJobs() {
    this.ProofReadingTableComponent.tab('4');
  }

  bulkJobs() {
    this.ProofReadingTableComponent.tab('6');
  }
  bulkUploadJobs() {
    this.ProofReadingTableComponent.tab('7');
  }


  getCount() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginService.getUsername()}/${this.loginService.getProcessId()}/1/0`).subscribe(getcount => {
      this.spinnerService.requestEnded();
      this.freshJobsCount = getcount.freshJobsCount,
        this.revisionJobsCount = getcount.revisionJobsCount,
        this.reworkJobsCount = getcount.reworkJobsCount,
        this.quoteJobsCount = getcount.quoteJobsCount,
        this.bulkJobsCount = getcount.bulkJobsCount,
        this.bulkUploadJobsCount = getcount.bulkUploadJobsCount
    })
  }
}

