import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../../Spinner/spinner.service';
import { environment } from 'src/Environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pricing-approvalprocess',
  templateUrl: './pricing-approvalprocess.component.html',
  styleUrls: ['./pricing-approvalprocess.component.scss'],
})
export class PricingApprovalprocessComponent implements OnInit {
  selectedValue: string = '';
  dropdownValues: any;
  customers: any[] = [];
  constructor(
    private spinner: SpinnerService,
    private http: HttpClient,
    private loginservice: LoginService
  ) { }

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.loadDropdownValues();
  }

  loadDropdownValues(): void {
    this.http.get(environment.apiURL + 'Pricing/CustomerListinPrice').subscribe(
      (response: any) => {
        this.dropdownValues = response.customers;
      },
      (error) => {
        console.log('Error loading dropdown values:', error);
      }
    );
  }
  onDropdownChange() {
    this.spinner.requestStarted();
    this.http
      .get(
        environment.apiURL +
        `Pricing/ShowDetailsofPricing?clientid=${this.selectedValue}`
      )
      .subscribe({
        next: (response: any) => {
          this.customers = response;
          this.spinner.requestEnded();
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log(err, 'Error');
        },
      });
  }
  ApproveClick(id: any) {
    let ApproveData = {
      id: id,
      uId: 0,
      departmentId: 0,
      customerId: 0,
      employeeId: this.loginservice.getUsername(),
      pricingTypeId: 0,
      approve: 0,
      getCollection: [],
    };
    this.spinner.requestStarted();
    this.http
      .post(environment.apiURL + `Pricing/SetApproval`, ApproveData)
      .subscribe({
        next: () => {
          this.spinner.requestEnded();
          Swal.fire('Done','Pricing Approved Successfully', 'success')
        },
        error: (err) => {
          console.log(err);
          this.spinner.resetSpinner();
        },
      });
  }
  RejectClick(id: any) {
    let ApproveData = {
      id: id,
      uId: 0,
      departmentId: 0,
      customerId: 0,
      employeeId: this.loginservice.getUsername(),
      pricingTypeId: 0,
      approve: 0,
      getCollection: [],
    };
    this.spinner.requestStarted();
    this.http
      .post(environment.apiURL + `Pricing/SetReject`, ApproveData)
      .subscribe({

        next: (response) => {
          this.spinner.requestEnded();

          if (response === true) {
            Swal.fire('Pricing Reject', 'info')

          }
        },
        error: (err) => {
          console.log(err);
          this.spinner.resetSpinner();
        },
      });
  }
}
