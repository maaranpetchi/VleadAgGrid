import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { BuddyProofTableComponent } from '../buddy-proof-table/buddy-proof-table.component';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';

@Component({
  selector: 'app-buddy-proof',
  templateUrl: './buddy-proof.component.html',
  styleUrls: ['./buddy-proof.component.scss']
})
export class BuddyProofComponent {
  @ViewChild(BuddyProofTableComponent) BuddyProofTableComponent: BuddyProofTableComponent;
  scopes: any[] = [];
  selectedScope: number;
  freshJobsCount: any;
  RevisionJobsCount: any;
  ReworkJobsCount: any;
  QuoteJobsCount: any;
  SewOutCount: any;
  BulkJobsCount: any;
  BulkUploadJobsCount: any;
  BuddyProofCount:any;
  constructor(private http: HttpClient,private loginservice:LoginService,private spinnerService:SpinnerService) { }

  ngOnInit(): void {
    this.getCount();
    this.freshJobs();
  }
  selectedproduction: any[] = [];
  setAll(completed: boolean, item: any) {
    
    if (completed == true) {
      this.selectedproduction.push(item)
    }
    else {

      if (this.selectedproduction.find(x => x.id == item.id)) {
        this.selectedproduction = this.selectedproduction.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    
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
        // Call your REST API for sewOut 
        this.sewOut();
        break;
      case 5: // Bulk Upload Jobs tab
        // Call your REST API for Bulk Jobs
        this.bulkJobs();

        break;
      case 6: // Bulk Upload Jobs tab'
        // Call your REST API for Bulk Upload Jobs
        this.bulkUploadJobs();
        break;

      default:
        break;
    }
  }

  freshJobs() {
    this.BuddyProofTableComponent.tab('1');
  }
  revisionJobs() {
    this.BuddyProofTableComponent.tab('2');
  }
  reworkJobs() {
    this.BuddyProofTableComponent.tab('3');
  }
  quoteJobs() {
    this.BuddyProofTableComponent.tab('4');
  }
  sewOut() {
    this.BuddyProofTableComponent.tab('5');
  }
  bulkJobs() {
    this.BuddyProofTableComponent.tab('6');
  }
  bulkUploadJobs() {
    this.BuddyProofTableComponent.tab('7');
  }


  
  getCount() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).subscribe(freshdataCount => {
      this.spinnerService.requestEnded();

      this.freshJobsCount = freshdataCount.freshJobsCount;
      this.RevisionJobsCount = freshdataCount.revisionJobsCount;
      this.ReworkJobsCount = freshdataCount.reworkJobsCount;
      this.QuoteJobsCount = freshdataCount.quoteJobsCount;
      this.SewOutCount = freshdataCount.sewOutJobsCount,
        this.BulkJobsCount = freshdataCount.bulkJobsCount;
      this.BulkUploadJobsCount = freshdataCount.bulkUploadJobsCount;
    });
  }
}



