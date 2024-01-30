import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { CustomerNormsService } from 'src/app/Services/CustomerNorms/customer-norms.service';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
@Component({
  selector: 'app-add-customer-norms',
  templateUrl: './add-customer-norms.component.html',
  styleUrls: ['./add-customer-norms.component.scss']
})
export class AddCustomerNormsComponent implements OnInit {
  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchProcess();
    this.fetchJobStatus();
    this.fetchDivision();
  }
  constructor(private loginservice: LoginService, private http: HttpClient, private router: Router, private spinnerService: SpinnerService, private _empService: CustomerNormsService) { }

  //Array declaration
  departments: any[] = [];
  customers: any[] = [];
  scopes: any[] = [];
  jobstatus: any[] = [];
  process: any[] = [];
  CustomerDivisions: any[] = [];
  //ngmodel
  selectedDepartment: any;
  selectedCustomer: any;
  selectedScope: any;
  selectedJobStatus: any;
  selectedProcess: any;
  selectedDivision: any;
  norms: any;
  //Method
  fetchDepartments(): void {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Pricing/pricingList`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next:(data) => {
      this.spinnerService.requestEnded();
      this.departments = data.departments;
      this.customers = data.customers;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }
  onSelectCode(id) {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Pricing/ScopeByDeptCustId?clientid=${id}&departmentId=${this.selectedDepartment}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next:(results) => {
      this.spinnerService.requestEnded();

      this.scopes = results;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    })
  }
  fetchJobStatus(): void {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Pricing/GetJobStatusList`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next:(data) => {
      this.spinnerService.requestEnded();
      this.jobstatus = data.jsList;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }
  fetchProcess(): void {
    this.spinnerService.requestStarted();

    this.http.get<any>(environment.apiURL + `Pricing/GetProcessListforNorms`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next:(data) => {
      this.spinnerService.requestEnded();
      this.process = data.prList;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }
  fetchDivision(): void {
    this.spinnerService.requestStarted();

    this.http.get<any>(environment.apiURL + `Pricing/GetCusDvisionforNorms`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next:(data) => {
      this.spinnerService.requestEnded();
      this.CustomerDivisions = data.divList;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }

  onSubmit() {
    let payload = {
      "id": 0,
      "customerId": this.selectedCustomer,
      "customerShortName": "string",
      "departmentId": this.selectedDepartment,
      "processId": this.selectedProcess,
      "jobStatusId": this.selectedJobStatus,
      "scopeId": this.selectedScope,
      "norms": this.norms,
      "divisionId": this.selectedDivision,
      "createdBy": this.loginservice.getUsername(),
      "createdUTC": "2023-08-28T07:48:36.543Z",
      "updatedBy": 0,
      "updatedUTC": "2023-08-28T07:48:36.543Z",
      "isDeleted": true
    }

    this.spinnerService.requestStarted();

    this.http.post<any>(environment.apiURL + `Pricing/CreateCustomerNormDetails`, payload).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (results) => {
        this.spinnerService.requestEnded();
if(results.stringList =="Customer Norms Details created successfully"){
        Swal.fire(
          'Done!',
          results.stringList,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/topnavbar/customerNorms']);
          }
        })
      }
      else{
        Swal.fire(
          'Alert!',
          results.stringList,
          'info'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/topnavbar/customerNorms']);
          }
        })
      }
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    })

  }
}
