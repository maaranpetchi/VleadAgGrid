import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-add-receivables',
  templateUrl: './add-receivables.component.html',
  styleUrls: ['./add-receivables.component.scss']
})
export class AddReceivablesComponent implements OnInit {
  InvoiceDetailsPanel: boolean = false; // to display the invoice div
  RemoveInvoiceId: any;
  isInputDisabled: boolean = true; // Set this based on your logic
  InvoiceDetails: any;
  TotalAdjustedAmount: number = 0;
  CollectionBalanceAmount: number = 0;

  constructor(private http: HttpClient, private loginservice: LoginService, private router: Router, private spinnerservice: SpinnerService) { }
  ngOnInit(): void {
    this.getCustomerDropdown();
  }


  //dropdown restapi of customername
  selectedCustomerNameOption: any = '';
  CustomerNamedropdownvalues: any[] = [];
  AddedInvoice: any[] = [];
  AddedPayment: any[] = [];

  //ngmodel
  voucherdate: string = '';
  referenceNumber: any;
  referencedate: any;
  CustomerId: any;
  destinationBank: any;
  exchangerate: number;
  totalreceiptamount: number = 0;
  description: any;
  selectedInvoiceType: any;
  //ngmodel invoice details
  selectedInvoiceNumberNameOption: any = '';
  invoiceDate: Date;
  invoiceValue: any;
  amounttobeadjusted: any;
  amountadjusted: any;
  adjustedamount: any;
  balanceadjusted: any;
  invoiceNumber: any;

  //ngmodel receiptdetails
  bankName: any;
  transactionNo: any;
  transactionDate: any;
  amount: any;
  receiptMode: any;
  //dropdown array declaration
  invoicenumberdropdownvalue: any[] = [];
  ///methods
  getCustomerDropdown() {
    // customername dropdown fetch the values from the API
    this.http.get<any>(environment.apiURL + 'Invoice/getCustomers').subscribe(customernamedata => {
      this.CustomerNamedropdownvalues = customernamedata.stringList;
    });
  }

  CustomerInvoice(id) {
    this.InvoiceDetailsPanel = true;

    //invoicenumber
    this.http.get<any>(environment.apiURL + `Receivable/GetCustomerInvoice?CustomerId=${id}`)
      .subscribe(invoicenumberdata => {


        this.invoicenumberdropdownvalue = invoicenumberdata;
      });
  }

  RemoveInvoice(index: number) {
    this.AddedInvoice.splice(index, 1);
    this.TotalAdjustedAmount = 0;
    this.CollectionBalanceAmount = 0;
  }


  InvoiceDetailsChanges() {
    this.http.get<any>(environment.apiURL + `Receivable/GetInvoice?invoiceNo=${this.invoiceNumber}&customerId=${this.CustomerId}`).subscribe(result => {
      this.InvoiceDetails = result;
      this.invoiceDate = result.invoiceDate,
        this.invoiceValue = result.invoiceValue,
        this.amounttobeadjusted = result.invoiceValue
      this.adjustedamount = result.adjustmentAmount,
        this.balanceadjusted = this.invoiceValue - this.amounttobeadjusted
    });
  }


  totalAdjustedAmount: number = 0;

  addInvoice() {
    // Create an object to store the entered invoice details
    if (this.totalreceiptamount === 0) {
      Swal.fire(
        'Alert!',
        ' Please enter the total receipt amount!',
        'warning'
      )
    }
    if (this.totalreceiptamount < this.amounttobeadjusted) {
      Swal.fire(
        'Alert!',
        ' Adjustment Amount should not be greater than Receipt amount!',
        'warning'
      )
    }
    else {
      const newInvoice = {
        IsInvoiceAdjustment: this.selectedInvoiceType,
        InvoiceNo: this.invoiceNumber,
        InvoiceDate: this.invoiceDate,
        InvoiceValue: this.invoiceValue,
        InvoiceId: this.invoicenumberdropdownvalue.find(x => x.invoiceNo == this.invoiceNumber).id,
        AdjustmentAmount: this.adjustedamount,
        CurrentAdjustedAmount: this.amounttobeadjusted
      };

      // Push the new invoice details into the AddedInvoice array
      this.AddedInvoice.push(newInvoice);
      this.TotalAdjustedAmount = this.TotalAdjustedAmount + parseFloat(newInvoice.CurrentAdjustedAmount);
      this.CollectionBalanceAmount = this.totalreceiptamount - this.TotalAdjustedAmount;
    }
  }


  addPayment() {
    const newInvoice = {
      ReceiptMode: this.receiptMode,
      BankName: this.bankName,
      TransactionNumber: this.transactionNo,
      TransactionDate: this.transactionDate,
      Amount: this.totalreceiptamount,
    };

    // Push the new invoice details into the AddedInvoice array
    this.AddedPayment.push(newInvoice);

  }

  RemovePayment(index: number) {
    this.AddedPayment.splice(index, 1);
  }

  AddReceivable() {
    let adjustedAmount: any[] = [];
    let receivableAdjustment: any[] = [];
    if (this.CollectionBalanceAmount == 0) {
      console.log(this.AddedInvoice.length, "AddedInvoice");


      if (this.AddedInvoice.length != 0) {
        this.AddedInvoice.forEach(function (adjustments) {

          console.log(adjustments, "Adjustment");

          var isInvoiceAdjustment: Boolean;
          var adjustmentDetails: any;
          if (adjustments.IsInvoiceAdjustment == "adjustment") {
            console.log("Adjuateenter");

            adjustmentDetails = {
              IsInvoiceAdjustment: true,
              InvoiceId: adjustments.InvoiceId,
              InvoiceNo: adjustments.InvoiceNo,
              AdjustmentAmount: adjustments.CurrentAdjustedAmount
            };
          }
          else {
            console.log("advanceenter");

            isInvoiceAdjustment = false;
            adjustmentDetails = {
              IsInvoiceAdjustment: isInvoiceAdjustment,
              InvoiceId: null,
              InvoiceNo: adjustments.InvoiceNo,
              AdjustmentAmount: adjustments.CurrentAdjustedAmount
            };
          }
          var AlreadyAdjustedDetails = {
            InvoiceId: adjustments.InvoiceId,
            InvoiceNo: adjustments.InvoiceNo,
            AlreadyAdjustedAmount: adjustments.AdjustmentAmount,
            InvoiceValue: adjustments.InvoiceValue,
            CurrentAdjustedAmount: adjustments.CurrentAdjustedAmount,
          };
          adjustedAmount.push(AlreadyAdjustedDetails);
          receivableAdjustment.push(adjustmentDetails);
        });
      }

      var receivable = {
        ReceivableExts: this.AddedPayment,
        ReceivableAdjustments: receivableAdjustment,
        Receivables: {
          CollectionDate: this.voucherdate,
          CollectionAmount: this.totalreceiptamount,
          ExchangeRate: this.exchangerate,//
          DestinationBank: this.destinationBank,//
          ReferenceNo: this.referenceNumber,
          ReferenceDate: this.referencedate,
          Description: this.description,
          CreatedBy: this.loginservice.getUsername(),
          CustomerId: this.CustomerId,

        },
        AlreadyAdjusted: adjustedAmount,


      };




      this.http.post<any>(environment.apiURL + `Receivable/CreateReceivable`, receivable).subscribe(result => {
        //alert(JSON.stringify(result.Receivables));


        if (result.receivables == "False") {

          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Update Voucher No',
            showConfirmButton: false,
            timer: 2500
          })


        }
        else {
          this.router.navigate(['/topnavbar/acc-customer']);

        }
      });

    }
    else {

      Swal.fire(
        '',
        'Tally the Pending Receipt Amount',
        'question'
      )
    }
  }


  BackButton() {
    this.router.navigate(['/topnavbar/acc-customer']);

  }
}