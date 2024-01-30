import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { VendorComponent } from '../vendor/vendor.component';
import { VendorService } from 'src/app/Services/Vendor/vendor.service';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit {
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceValue: number;
  pendingAmount: number;
  amtTobePaid: number;
  amtPaidHide: boolean = true;
  constructor(
    private loginservice: LoginService,
    private _fb: FormBuilder,
    private router: Router,
    private spinnerService: SpinnerService,
    private http: HttpClient,
    private _dialogRef: MatDialogRef<EditVendorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
  ) {
  }
  @ViewChild(VendorComponent, { static: false }) VendorComponent: VendorComponent;

  ngOnInit(): void {
  }

  calculatePendingAmount(): void {
    this.pendingAmount = this.invoiceValue - this.amtTobePaid;
  }

  onFormSubmit(): void {
    const requiredFields: string[] = [];
    if (!this.invoiceNumber) {
        requiredFields.push('Invoice Number');
    }
    if (!this.invoiceValue) {
        requiredFields.push('Invoice Value');
    }
    
    
    if (requiredFields.length === 0) {
        const payload = {
            id: 0,
            vendorName: this.vendorName ? this.vendorName:'',
            invoiceNumber: this.invoiceNumber ? this.invoiceNumber:"",
            invoiceDate: this.invoiceDate !== null ? this.invoiceDate : '',
            invoiceValue: this.invoiceValue ? this.invoiceValue:0,
            pendingAmount: this.pendingAmount ?this.pendingAmount:0,
            amountbePaid: this.amtTobePaid ? this.amtTobePaid:0,
            amountPaid: 0,
            employeeId: this.loginservice.getUsername(),
          };
      
          this.spinnerService.requestStarted();
          this.http.post<any>(environment.apiURL + `ITAsset/nSetVendorDetails`, payload).pipe(catchError((error) => {
            this.spinnerService.requestEnded();
            return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
          })).subscribe({
            next: (val: any) => {
              this.spinnerService.requestEnded();
              Swal.fire(
                'Done!',
                val.setVDetailList,
                'success'
              ).then((response) => {
                if (response.isConfirmed) {
                  this._dialogRef.close();
      
                  window.location.reload();
                }
              })
            },
            error: (err: any) => {
              this.spinnerService.resetSpinner();
              Swal.fire(
                'info!!',
                'No Changes Occured',
                'info'
              ).then((response) => {
                if (response.isConfirmed) {
                  this._dialogRef.close();
      
                  window.location.reload();          }
              })
            }
          });
    
    } else {
        // Show validation error message with missing field names
        const missingFields = requiredFields.join(', ');
        Swal.fire('Required Fields', `Please fill in the following required fields: ${missingFields}.`, 'error');
    }
    
  }
}
