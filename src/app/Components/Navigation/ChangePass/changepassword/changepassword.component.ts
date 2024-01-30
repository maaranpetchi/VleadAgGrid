import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  passwordForm: FormGroup;
  passwordsMatch: boolean = true;
  dialogRef: MatDialogRef<ChangepasswordComponent>;


  constructor(private fb: FormBuilder, private getCookie:CookieService ,private snackBar: MatSnackBar,private http: HttpClient, private loginservice: LoginService,private spinnerService:SpinnerService) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.checkPasswords
    });
  }
  getloginusername(): string {
    return this.loginservice.getToken();
  }

  checkPasswords(group: FormGroup) {
    let newPassword = group.get('newPassword')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const userId = this.loginservice.getUserId();
      const oldPassword = this.passwordForm.value.oldPassword; 
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL+'Account/ChangePassword', {
        "userId": userId,
        "oldPassword": oldPassword,
        "latestPassword": this.passwordForm.value.newPassword,
        "conformPassword": this.passwordForm.value.confirmPassword
      }).subscribe(response => {
          this.spinnerService.requestEnded();
       if(response.result == true){
          Swal.fire(
            'Done!',
            'Password Changed Successfully!',
            'success'
          )
          this.dialogRef.close()
       }
       else{
        Swal.fire(
          'Error!',
          'Password Not Changed Successfully!',
          'error'
        )
       }
        }
       
      );
    }
  } 
}
