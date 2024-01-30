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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-billing',
  templateUrl: './update-billing.component.html',
  styleUrls: ['./update-billing.component.scss']
})
export class UpdateBillingComponent implements OnInit {

  form: FormGroup;
  customers: any[];
  departments = [
    { id: 1, departmentname: 'Artwork' },
    { id: 2, departmentname: 'Digitizing' },
  ];
  ngOnInit() {
    this.initForm();
    this.loadCustomers();
    this.loadDepartments();
  }
  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerService, private _empservice: EmployeevsskillsetService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any, private loginservice: LoginService,public dialogRef: MatDialogRef<UpdateBillingComponent>) { 
  console.log(this.data ,"InjectedData");
  this.updateForm();
  }
  CustomerId:any;
  DepartmentId:any;
  billingDate:any;
  updateForm(){
    this.CustomerId = this.data.data.customerId;
    this.DepartmentId = this.data.data.departmentId;
    this.billingDate = this.data.data.billingDate;

  }


  initForm() {
    this.form = this.fb.group({
      customerId: [this.data.data.customerId, Validators.required],
      departmentId: ["", Validators.required],
      billingDate: ['', Validators.required],
      createdBy: [this.loginservice.getUsername()],
      updateBy: 0

    });
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

  loadDepartments() {

  }

  Update() {

   
  
      this.spinnerService.requestStarted();
      console.log(this.form.value,"UpdateForm");
      let payload =  {
        "customerId": this.CustomerId,
        "departmentId": this.DepartmentId,
        "billingDate": this.billingDate,
        "createdBy": 0,
        "updateBy": this.loginservice.getUsername()
      }
      this.http.put<any>(environment.apiURL +`BillingCycleMonthly/Updation?id=${this.data.data.id}`,payload).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe((response) => {
        this.spinnerService.requestEnded();
        Swal.fire('Done', 'Billing Updated Sucessfully', 'success').then((result) => {
          if (result.isConfirmed) {
            this.form.reset();
            this.dialogRef.close()
          }
        })
      })

    
  }
}
