import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { AddeditemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/addeditemployeevsdivision/addeditemployeevsdivision.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CreditnoteService } from 'src/app/Services/AccountController/CreditNote/creditnote.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-add-creditnote',
  templateUrl: './add-creditnote.component.html',
  styleUrls: ['./add-creditnote.component.scss']
})
export class AddCreditnoteComponent implements OnInit {
  Empregister: FormGroup<any>;

  //customerdropdown
  selectedCustomerOption: any = 0;
  Customerdropdownvalues: any[] = [];

  //Invoidedropdown
  selectedinvoiceoption: any = '';
  invoicedropdownvalues: any[] = [];


  adjustedAmount1: any[] = [];
  receivableAdjustment: any[] = [];
  invoiceDetails: any;


  constructor(private builder: FormBuilder,
    private loginservice: LoginService,
    private http: HttpClient,
    private router: Router,
    private spinnerservice:SpinnerService,
    private _empservice: CreditnoteService,
    private dialogRef: MatDialogRef<AddeditemployeevsdivisionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.Empregister = new FormGroup({
      vouchernumber: new FormControl('', Validators.required),
      voucherdate: new FormControl('', Validators.required),
      referencedate: new FormControl('', Validators.required),
      referencenumber: new FormControl('', Validators.required),
      customer: new FormControl('', Validators.required),
      creditnoteamount: new FormControl('', Validators.required),
      invoicenumber: new FormControl(''),
      description: new FormControl(''),
      exchangerate: new FormControl(''),
    });
  }
  ngOnInit(): void {
    // customer dropdown fetch the values from the API
this.fetchCustomerData();

    //Invoice number dropdown

  }

fetchCustomerData(){
  this.spinnerservice.requestStarted();
  this._empservice.getcustomerdropdown().subscribe({next:(customerdata) => {
    this.spinnerservice.requestEnded();

    this.Customerdropdownvalues = customerdata;
    // Sort the array by a specific property
    this.Customerdropdownvalues.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  },
  error: (err) => {
    this.spinnerservice.resetSpinner(); // Reset spinner on error
    console.error(err); 
    Swal.fire(
      'Error!',
      'An error occurred !.',
      'error'
    );
  }
  });
}
  selectedValue: any;

  invoiceDate: any = ""
  invoiceValue: any = 0
  adjustedAmount: number = 0;
  amountToBeAdjusted: number = 0;
  invoicenumberdetails() {
    this.spinnerservice.requestStarted();
    this.http.get<any>(environment.apiURL + `Receivable/GetInvoice?invoiceNo=${this.selectedinvoiceoption}&customerId=${this.selectedCustomerOption}`).subscribe({next:(data) => {
      this.spinnerservice.requestEnded();
      this.invoiceDetails = data
      this.invoiceDate = new Date(data.invoiceDate).toLocaleDateString()
      this.invoiceValue = data.invoiceValue
      this.adjustedAmount = data.adjustmentAmount
      this.amountToBeAdjusted = data.invoiceValue - data.adjustmentAmount
    },
    error: (err) => {
      this.spinnerservice.resetSpinner(); // Reset spinner on error
      console.error(err); 
      Swal.fire(
        'Error!',
        'An error occurred !.',
        'error'
      );
    }
    });

  }

  onchangesubmit() {
    this.spinnerservice.requestStarted();
    this.http.get<any[]>(environment.apiURL + `Receivable/GetCustomerInvoice?CustomerId=${this.selectedCustomerOption}`).subscribe({next:(data) => {
      this.spinnerservice.requestEnded();
      this.invoicedropdownvalues = data;
    },
    error: (err) => {
      this.spinnerservice.resetSpinner(); // Reset spinner on error
      console.error(err); 
      Swal.fire(
        'Error!',
        'An error occurred !.',
        'error'
      );
    }
    });

  }

  //ngmodel
  exchangerate: any;
  creditnoteamount: any;
  referencenumber: any;
  description: string;
  onFormSubmit() {
    if (this.creditnoteamount > this.amountToBeAdjusted) {
      Swal.fire(
        'Alert!',
        'Credit Note Amount should not be Zero or greater than Balance Invoice Amount',
        'info'
      )

    }

    let adjustmentDetails = {
      IsInvoiceAdjustment: true,
      InvoiceId: this.invoiceDetails.invoiceId,
      InvoiceNo: this.invoiceDetails.invoiceNo,
      AdjustmentAmount: this.creditnoteamount,
    };

    let AlreadyAdjustedDetails = {
      InvoiceId: this.invoiceDetails.invoiceId,
      InvoiceNo: this.invoiceDetails.invoiceNo,
      AlreadyAdjustedAmount: this.invoiceDetails.adjustmentAmount,
      InvoiceValue: this.invoiceDetails.invoiceValue,
      CurrentAdjustedAmount: this.creditnoteamount,
    };


    this.adjustedAmount1.push(AlreadyAdjustedDetails);
    this.receivableAdjustment.push(adjustmentDetails);
    let receivable = {
      ReceivableAdjustments: this.receivableAdjustment,
      Receivables: {
        CollectionDate: this.Empregister.value.voucherdate,
        CollectionAmount: this.creditnoteamount,
        ExchangeRate: this.exchangerate,
        ReferenceNo: this.referencenumber,
        ReferenceDate: this.Empregister.value.referencedate,
        Description: this.description,
        CreatedBy: this.loginservice.getUsername(),
        CustomerId: this.selectedCustomerOption,
      },
      AlreadyAdjusted: this.adjustedAmount1,
      receivableExts: [
        {
          id: 0,
          receivableId: 0,
          receiptMode: "",
          transactionNo: "",
          transactionDate: new Date().toISOString,
          amount: 0,
          bankName: ""
        }
      ],

    };
    this.spinnerservice.requestStarted();
    this.http.post<any>(environment.apiURL + `Receivable/CreateCreditNote`, receivable).subscribe(data => {
      this.spinnerservice.requestEnded();
      if (data.creditNoteList == "False") {

        Swal.fire(
          'Alert!',
          'Update Voucher No & Try again',
          'info'
        )
      }
      else {
        Swal.fire(
          'Done!',
          'Credit Note Created Successfully',
          'success'
        )
      }

    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
