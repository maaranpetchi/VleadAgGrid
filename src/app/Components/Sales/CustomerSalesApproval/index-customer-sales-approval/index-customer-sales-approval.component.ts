
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { environment } from 'src/Environments/environment';
import { TabcustomertableComponent } from '../tabcustomertable/tabcustomertable.component';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-index-customer-sales-approval',
  templateUrl: './index-customer-sales-approval.component.html',
  styleUrls: ['./index-customer-sales-approval.component.scss']
})
export class IndexCustomerSalesApprovalComponent implements OnInit {
  @ViewChild(TabcustomertableComponent) TabcustomertableComponent: TabcustomertableComponent;
  constructor(private http: HttpClient, private loginservice: LoginService) {        
  }

  DivisionApiData: any[];
  ngOnInit(): void {
    this.getmattabcount();
  }



  onTabChange(event: any) {
    // Update the REST API based on the selected tab

    switch (event.index) {
      case 0: // Fresh Jobs tab
        // Call your REST API for Fresh Jobs
        this.ApprovedCustomer();
        break;
      case 1: // Revision Jobs tab

        // Call your REST API for Revision Jobs
        this.UnApprovedCustomer();
        break;
      default:
        break;
    }
  }

  ApprovedCustomer() {
    this.TabcustomertableComponent.tab('1');
  };
  UnApprovedCustomer() {
    this.TabcustomertableComponent.tab('2');
  }



  ApprovedCustomerCount: number;
  UnApprovedCustomerCount: number;


  getmattabcount() {
    this.http.get<any>(environment.apiURL + `Customer/getCustomerUnapprovalcount?EmpId=${this.loginservice.getUsername()}`).subscribe(responsedata1 => {
      this.ApprovedCustomerCount = responsedata1.approvedListCount;
      this.UnApprovedCustomerCount = responsedata1.unapprovedcusCount;
    });
  }
}