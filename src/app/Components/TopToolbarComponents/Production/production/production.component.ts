import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductiontableComponent } from '../productiontable/productiontable.component';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { catchError, throwError } from 'rxjs';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit{
  @ViewChild(ProductiontableComponent) ProductiontableComponent: ProductiontableComponent;

 constructor(private http:HttpClient,private loginservice:LoginService, private spinnerService:SpinnerService,private sharedDataService:SharedService){
  this.sharedDataService.refreshData$.subscribe(() => {
    // Update your data or call the necessary methods to refresh the data
    this.getCount();

    // ... other refresh logic
  });
 }
  ngOnInit(): void {
  this.getCount();
  this.freshJobs();
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


freshJobs(){
  this.ProductiontableComponent.tab('1');
}
revisionJobs(){
  this.ProductiontableComponent.tab('2');
}
reworkJobs(){
  this.ProductiontableComponent.tab('3');
}
quoteJobs(){
  this.ProductiontableComponent.tab('4');
}
bulkJobs(){
  this.ProductiontableComponent.tab('5');
}
bulkUploadJobs(){
  this.ProductiontableComponent.tab('6');
}

freshJobsCount:number;
RevisionJobsCount:number;
ReworkJobsCount:number;
QuoteJobsCount:number;
BulkJobsCount:number;
BulkUploadJobsCount:number;
getCount() {
  this.spinnerService.requestStarted();
  this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).subscribe(freshdataCount => {
      this.spinnerService.requestEnded();
      this.freshJobsCount = freshdataCount.freshJobsCount;
      this.RevisionJobsCount = freshdataCount.revisionJobsCount;
      this.ReworkJobsCount = freshdataCount.reworkJobsCount;
      this.QuoteJobsCount = freshdataCount.quoteJobsCount;
      this.BulkJobsCount = freshdataCount.bulkJobsCount;
      this.BulkUploadJobsCount = freshdataCount.bulkUploadJobsCount;
    });
};
 };

