import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { CustomerNormsService } from 'src/app/Services/CustomerNorms/customer-norms.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
@Component({
  selector: 'app-update-customer-norms',
  templateUrl: './update-customer-norms.component.html',
  styleUrls: ['./update-customer-norms.component.scss']
})
export class UpdateCustomerNormsComponent implements OnInit {
  apiResponseData: any;
  ngOnInit(): void {
    let data: any[] = [];
    if (this._empservice.shouldFetchData) {
      const data = this._empservice.getViewData();
      this.apiResponseData = data.data;
      this.fetchUpdateData();
      this._empservice.shouldFetchData = false;
    }
  }

  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerService, private _empservice: CustomerNormsService, private loginservice: LoginService) { }

  employeeSkill: any;
  selectedProficiency: any
  fetchUpdateData() {
    this.Departmentname = this.apiResponseData.getNormsList[0].departmentname;
    this.CustomerShortName = this.apiResponseData.getNormsList[0].customerShortName;
    this.ScopeName = this.apiResponseData.getNormsList[0].scopeName;
    this.Jobstatus = this.apiResponseData.getNormsList[0].jobstatus;
    this.Processname = this.apiResponseData.getNormsList[0].processname;
    this.DivisionName = this.apiResponseData.getNormsList[0].divisionName;
    this.Norms = this.apiResponseData.getNormsList[0].norms;
  }


  //ngmodel
  Departmentname: any;
  CustomerShortName: any;
  ScopeName: any;
  Jobstatus: any;
  Processname: any;
  DivisionName: any;
  Norms: any;


  update() {
    let payload = {
      "id": this.apiResponseData.getNormsList[0].id,
      "customerId": 0,
      "customerShortName": "string",
      "departmentId": 0,
      "processId": 0,
      "jobStatusId": 0,
      "scopeId": 0,
      "norms": this.Norms,
      "divisionId": 0,
      "isDeleted": true,
      "createdBy": 0,
      "createdUtc": "2023-08-28T09:05:51.829Z",
      "updatedBy": this.loginservice.getUsername(),
      "updatedUtc": "2023-08-28T09:05:51.829Z"
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `CustomerVsEmployee/EditCustomerNorms`, payload).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next:(results) => {
      this.spinnerService.requestEnded();

      Swal.fire(
        'Done!',
        'Updated Data Successfully!',
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/topnavbar/customerNorms']);
        }
      })
    },
    error: (err) => {
      this.spinnerService.resetSpinner(); // Reset spinner on error
      console.error(err);

      Swal.fire(
        'Error!',
        'An error occurred .',
        'error'
      );
    }
    })
  }


  Cancel() {
    this.router.navigate(['/topnavbar/customerNorms']);

  }
}
