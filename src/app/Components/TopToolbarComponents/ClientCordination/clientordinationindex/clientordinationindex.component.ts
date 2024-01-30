import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryToClientComponent } from '../query-to-client/query-to-client.component';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { ClientcordinationService } from 'src/app/Services/CoreStructure/ClientCordination/clientcordination.service';

@Component({
  selector: 'app-clientordinationindex',
  templateUrl: './clientordinationindex.component.html',
  styleUrls: ['./clientordinationindex.component.scss']
})
export class ClientordinationindexComponent implements OnInit {
  @ViewChild(QueryToClientComponent) QueryToClientComponent: QueryToClientComponent;
  SetIndex: any;
  clientOrderCount: any;
  constructor(private http: HttpClient, private loginservice: LoginService, private spinnerService: SpinnerService, private _empService: ClientcordinationService) { }

  ngOnInit(): void {
    this.onTabChange(event);
    this.queriesToClient();

    this.getclientordercount();
    this.getcompleteordercount();
    this.getquerytoclientcount();
  }



  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    
    this.SetIndex = event.index ?  event.index:0
   
    
    
    this._empService.setData({ data: this.SetIndex ? this.SetIndex:0 });

    switch (event.index) {
      case 0: // Fresh Jobs tab
        // Call your REST API for Fresh Jobs
        this.queriesToClient();
        break;
      case 1: // Revision Jobs tab

        // Call your REST API for Revision Jobs
        this.queryResponse();
        break;
      case 2: // Rework Jobs tab
        // Call your REST API for Rework Jobs
        this.cancelledJobs();
        break;
      case 3: // Quote Jobs tab
        // Call your REST API for Quote Jobs
        this.quotationJobs();
        break;
      default:
        break;
    }
  }

  setndexData() {


  }

  queriesToClient() {
    if (this.QueryToClientComponent) {
      this.QueryToClientComponent.tab('1');
    }
  };

  queryResponse() {
    if (this.QueryToClientComponent) {
      this.QueryToClientComponent.tab('2');
    }
  };
  cancelledJobs() {
    if (this.QueryToClientComponent) {
      this.QueryToClientComponent.tab('3');
    }
  };
  quotationJobs() {
    if (this.QueryToClientComponent) {
      this.QueryToClientComponent.tab('4');
    }
  }

  CompletedJobsCount: number;
  getcompleteordercount() {
    this.http.get<any>(environment.apiURL + `Allocation/getCompletedJobs?EmpId=${this.loginservice.getUsername()}`).subscribe(response => {
      this.CompletedJobsCount = response.clientDetails.resultForCompletedList;
    });
  }
  NewJobCount: number  = 0;
  QuoteJobCount: number = 0;
  getclientordercount() {
    this.http.get<any>(environment.apiURL + `ClientOrderService/ClientOrdersCount/1`).subscribe(responsedata1 => {
      
      this.NewJobCount = responsedata1.count;

  
    this.http.get<any>(environment.apiURL + `ClientOrderService/ClientOrdersCount/2`).subscribe(responsedata2 => {
      
      this.QuoteJobCount = responsedata2.count;
      this.clientOrderCount = this.NewJobCount+ this.QuoteJobCount

    });
  });
  
    
  }




  QueryJobCount: any;
  querycount: any;
  cancelledcount: any;
  quotationcount: any;

  getquerytoclientcount() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getcountforcc/${this.loginservice.getUsername()}/1`).subscribe(getquerycount => {
      this.spinnerService.requestEnded();
      this.QueryJobCount = getquerycount.queriesJobsCount;
      this.querycount = getquerycount.queryResponseJobsCount;
      this.cancelledcount = getquerycount.cancelledJobsCount
      this.quotationcount = getquerycount.quotationJobCount;
    }, error => {
      this.spinnerService.resetSpinner();
    });
  }



}
