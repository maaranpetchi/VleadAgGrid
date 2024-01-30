import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CustomerSalesApprovalService } from 'src/app/Services/sales/CustomerSalesApproval/customer-sales-approval.service';

@Component({
  selector: 'app-tabcustomertable',
  templateUrl: './tabcustomertable.component.html',
  styleUrls: ['./tabcustomertable.component.scss']
})
export class TabcustomertableComponent implements OnInit {
  ngOnInit(): void {
 
    this.ApprovedCustomer()
    }
  constructor(private router: Router, private _coreService: CoreService, private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private _dialog: MatDialog, private spinnerService: SpinnerService, private sharedDataService: CustomerSalesApprovalService) {   this.dataSource.paginator = this.paginator1;}
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumnsvisibility: any = {
    companyname: true,
    customername: false,
    address: true,
    customershortname: false,
    classification: false,
    emailid: true,
    phonenumber: true,
    approvedphonenumber: false,
    salesemployee: true,
    action: true,

  };

  visibility() {
    let result: string[] = [];
    if (this.displayedColumnsvisibility.companyname) {
      result.push('companyname');
    }
    if (this.displayedColumnsvisibility.customername) {
      result.push('customername');
    }
    if (this.displayedColumnsvisibility.address) {
      result.push('address');
    }
    if (this.displayedColumnsvisibility.customershortname) {
      result.push('customershortname');
    }
    if (this.displayedColumnsvisibility.classification) {
      result.push('classification');
    }
    if (this.displayedColumnsvisibility.emailid) {
      result.push('emailid');
    }
    if (this.displayedColumnsvisibility.salesemployee) {
      result.push('salesemployee');
    }
    if (this.displayedColumnsvisibility.instruction) {
      result.push('instruction');
    }
    if (this.displayedColumnsvisibility.salespersonname) {
      result.push('salespersonname');
    }
    if (this.displayedColumnsvisibility.action) {
      result.push('action');
    }
    return result;
  }

  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  openEditForm(id: number) {
    let payload = {
      "id": id,
    }
    this.http.get<any>(environment.apiURL + `Customer/getAppAllCustomerContactDetails?customerId=${id}`,).subscribe(results => {
      this.sharedDataService.setData(results);
      this.router.navigate(['/topnavbar/multistepform']);
    });
  }

  tab(action) {
    if (action == '1') {
      this.ApprovedCustomer();
    }
    else if (action == '2') {
      this.UnApprovedCustomer();
    }
  }


  ApprovedCustomer() {
    // this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Customer/getCustomerUnapproval?EmpId=${this.loginservice.getUsername()}`).subscribe(unapprovedCustomer => {
 

      this.displayedColumnsvisibility.customername = false; //
      this.displayedColumnsvisibility.companyname = true;
      this.displayedColumnsvisibility.approvedphonenumber = false;

      this.displayedColumnsvisibility.customershortname = false; //
      this.displayedColumnsvisibility.address = true;
      this.displayedColumnsvisibility.classification = false;//
      this.displayedColumnsvisibility.emailid = true;
      this.displayedColumnsvisibility.phonenumber = true;//
      this.displayedColumnsvisibility.salesemployee = true;//
      this.displayedColumnsvisibility.action = true;//
      this.dataSource = new MatTableDataSource(
        unapprovedCustomer
      );
      this.dataSource.paginator = this.paginator1;
      // this.dataSource.sort = this.sort;
    });
  }
  UnApprovedCustomer() {
    // this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Customer/GetAllCustomers?EmpId=${this.loginservice.getUsername()}`).subscribe(approvedCustomer => {
      this.dataSource = new MatTableDataSource(
        approvedCustomer
      );
      this.dataSource.paginator = this.paginator1;
      // this.dataSource.sort = this.sort;

      // this.spinnerService.requestEnded();
      this.displayedColumnsvisibility.customername = true; //
      this.displayedColumnsvisibility.companyname = false;
      this.displayedColumnsvisibility.customershortname = true; //
      this.displayedColumnsvisibility.address = false;
      this.displayedColumnsvisibility.classification = true;//
      this.displayedColumnsvisibility.emailid = false;
      this.displayedColumnsvisibility.phonenumber = false;//
      this.displayedColumnsvisibility.approvedphonenumber = true;//
      this.displayedColumnsvisibility.salesemployee = true;//
      this.displayedColumnsvisibility.action = true;//
   
    },
      error => {
        // this.spinnerService.resetSpinner();
      });
  }

}
