import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { EmployeevsskillsetService } from 'src/app/Services/EmployeeVsSkillset/employeevsskillset.service';
import { TransitionCheckState } from '@angular/material/checkbox';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingCycleMonthlyService } from 'src/app/Services/BillingCycleMonthly/billing-cycle-monthly.service';

@Component({
  selector: 'app-addedit-billing',
  templateUrl: './addedit-billing.component.html',
  styleUrls: ['./addedit-billing.component.scss']
})
export class AddeditBillingComponent implements OnInit {

  form: FormGroup;
  customers: any[];
  departments: any[];
  CustomerId: any;
  DepartmentId: any;
  billingDate: any;
  ngOnInit() {
    this.loadCustomers();
  }
  constructor(private http: HttpClient, private router: Router,private spinnerService: SpinnerService, private _empservice: EmployeevsskillsetService, private fb: FormBuilder, private loginservice: LoginService, private billingService: BillingCycleMonthlyService) { 


  }





  loadCustomers() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `user/getallcustomers`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response) => {
      this.spinnerService.requestEnded();

      this.customers = response
    })

  }


  submit() {
    this.spinnerService.requestStarted();

    let payload = {
      customerId: this.CustomerId.customerId,
      departmentId: this.DepartmentId.departmentId,
      billingDate: this.billingDate,
      createdBy: this.loginservice.getUsername(),
      updateBy: 0,
      customername: this.CustomerId.Customername,
      departmentname: this.DepartmentId.Departmentname,
    }

    this.billingService.FormSubmit(payload).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response) => {
      this.spinnerService.requestEnded();
      const statusCode = response.status;
      console.log('Status Code:', statusCode);

      if(statusCode === 200){
      Swal.fire('Done', 'Billing Added Sucessfully', 'success').then((result) => {
        if (result.isConfirmed) {
          this.form.reset();
        }
      })
    }
    else{
      Swal.fire('Info', 'Billing Not Added', 'info').then((result) => {
        if (result.isConfirmed) {
          this.form.reset();
        }
      })
    }
    })

  }
}
