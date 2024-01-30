import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { HttpClient } from '@angular/common/http';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { environment } from 'src/Environments/environment';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-viewchecklist',
  templateUrl: './viewchecklist.component.html',
  styleUrls: ['./viewchecklist.component.scss']
})
export class ViewchecklistComponent implements OnInit {
  shortname: any;
  department: any;
  description: any;

  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService, private loginservice: LoginService, private spinnerService: SpinnerService,  private router: Router,public dialogRef: MatDialogRef<ViewchecklistComponent>) {this.viewData()}

  ngOnInit(): void {

  }


  viewData(){
    this.spinnerService.requestStarted();
    this.http.get(environment.apiURL + `CustomerVsChecklist/GetChecklistDetails?id=${this.data.id}`).subscribe({
      next:(data: any) => {
        this.spinnerService.requestEnded();
      this.shortname= data.customer.shortName;
      this.department= data.dept.description;
      this.description= data.description;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        Swal.fire(
          'Error!',
          'An error occurred while deleting data.',
          'error'
        );
      }
  
  });
}
}