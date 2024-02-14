
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PricingcalculationService } from 'src/app/Services/AccountController/PricingCalculation/pricingcalculation.service';
import { PopupinvoiceComponent } from '../popupinvoice/popupinvoice.component';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  clientId: any;

  formData: any = {};

  constructor(private http: HttpClient, private _empService: PricingcalculationService, private dialog: MatDialog, private spinnerService: SpinnerService, @Inject(MAT_DIALOG_DATA)
  public data1: any,public dialogRef: MatDialogRef<DetailsComponent>) {  }
  ngOnInit(): void {

    this.formData.clientName = this.data1.clientName;
    this.formData.invoiceNumber = this.data1.invoiceNumber;
    this.formData.invoiceDate = this.data1.invoiceDate;
    // Populate other fields as needed

  }

  selectedOption:any; 
    txtdiscount:number = 0;
  lbldiscount: any;
  lblamount: any;


  discountamount: any;
  amount: any;


  //
  displayLastInvoice: boolean = false;
  displayFirstInvoice: boolean = true;

  submitForm() {
    let payload={
      "invoiceNo": this.data1.invoiceNumber,
      "discount": this.discountamount,
      "totalInvoiceValue": this.amount
    }
    this.spinnerService.requestStarted();
this.http.post<any>(environment.apiURL +`Invoice/Getselectedinvoicediscount`,payload).subscribe(results =>{
  this.spinnerService.requestEnded();

  Swal.fire(
    'Done!',
    `Discount Applied For ${this.data1.invoiceNumber}` ,
    'success'
  ).then((res)=>{
    if(res.isConfirmed){
      this.dialogRef.close(true);
    }
  })
})
  }


  /////teextcountchaneg

  txtcountchange() {
    this.displayLastInvoice = true;
    this.displayFirstInvoice = false;


    if (this.selectedOption != null) {
      if (this.selectedOption == 0 && this.txtdiscount >= 0 && this.txtdiscount <= 100) {
        
        this.discountamount = (this.txtdiscount / 100) * this.data1.invoiceValue;
        this.amount = this.data1.invoiceValue - this.discountamount;
      }
      else if (this.selectedOption == 0 && this.txtdiscount < 0 || this.txtdiscount > 100) {
        
        Swal.fire(
          'Alert!',
          'Discount should be between 0 and 100',
          'info'
        )
        this.discountamount = '';
        this.amount = '';
      }
      if (this.selectedOption == 1 && this.txtdiscount < this.data1.invoiceValue) {
        this.discountamount = this.txtdiscount;
        this.amount = this.data1.invoiceValue - this.txtdiscount;
      }
      else if (this.selectedOption == 1 && this.txtdiscount > this.data1.invoiceValue) {

        Swal.fire(
          'Alert!',
          'Discount should be less then invoice number',
          'info'
        )
       
        this.discountamount = '';
        this.amount = '';
      }
    }
    else {
      Swal.fire(
        'Alert!',
        'Choose Discount Type',
        'info'
      )
    }
  }
}
