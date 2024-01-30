import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'


@Component({
  selector: 'app-add-scope',
  templateUrl: './add-scope.component.html',
  styleUrls: ['./add-scope.component.scss']
})
export class AddScopeComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private loginservice: LoginService,
    private _coreService: CoreService,
    private router :Router,
    private spinnerService:SpinnerService
  ) {}

  ngOnInit(): void {}

  userRegistrationForm = this.builder.group({
    departmentName:['', Validators.required],
    description: ['', Validators.required],
  });
  onFormSubmit() {
    let SaveScope = {
      // id: 0,
      departmentId: this.userRegistrationForm.value.departmentName,
      description:this.userRegistrationForm.value.description,
      // isDeleted: true,
      // createdUtc: new Date().toISOString(),
      // updatedUtc: '',
      createdBy: this.loginservice.getUsername(),
      // updatedBy: 0,
      // needTraining: true,
      // scopeGroupId: '',
      // department: {
      //   id: 0,
      //   departmentId: '',
      //   description: this.userRegistrationForm.value.departmentName,
      //   isDeleted: false,
      //   createdUtc: new Date().toISOString(),
      //   createdBy: this.loginservice.getUsername(),
      //   updatedBy:0,
      // },
    };
    this.spinnerService.requestStarted();
    this.http
      .post(environment.apiURL+'Scope/CreateScope', SaveScope).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe({
        next: (response: any) => {
          this.spinnerService.requestEnded();

          // const departmentId = response.department?.departmentId;
          Swal.fire('Done!', 'Scope added successfully!', 'success').then((response)=>{
            this.router.navigate(['/topnavbar/master-scope']);
          });        },
        error: (err: any) => {
          throw new Error('API Error', err);
        },
      });
  }

  onCancel() {
    this.router.navigate(['/topnavbar/master-scope']);
  }
}
