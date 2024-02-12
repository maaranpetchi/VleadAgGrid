import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupinvoiceComponent } from '../popupinvoice/popupinvoice.component';
import { environment } from 'src/Environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PricingcalculationService } from 'src/app/Services/AccountController/PricingCalculation/pricingcalculation.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { DetailsComponent } from '../details/details.component';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  clientId: any;

  // Paginator for Table 1
  @ViewChild('table1Paginator') table1Paginator: MatPaginator;

  // Paginator for Table 2
  @ViewChild('table2Paginator') table2Paginator: MatPaginator;
  @ViewChild('table3Paginator') table3Paginator: MatPaginator;
  selectedInvoiceJobs: any;
  selectedGeneratedInvoiceJobs: any[];
  selectedConfirmInvoiceJobs: any[];
  totalRate: number = 0;
  SelectedListItem: number = 0;
  sendinginvoiceNumber: any;


  constructor(private http: HttpClient, private loginservice: LoginService, private _empService: PricingcalculationService, private dialog: MatDialog, private spinnerService: SpinnerService, private router: Router) { }

  displayedColumns: string[] = [
    'selected',
    'Client',
    'Jobid',
    'Jobdate',
    'FileName',
    'ProjectCode',
    'Department',
    'JobStatus',
    'scope',
    'StitchCount',
    'estimatedtime',
    'rate',
    'ESTFileReceivedDate',
    'ESTDateofUpload',
    'nonbillableupload'
  ];










  selectedInvoices: any[] = [];
  // setAll(completed: boolean, item: any) {

  //   if (completed == true) {
  //     this.selectedInvoices.push(item)
  //   }
  //   else {

  //     if (this.selectedInvoices.find(x => x.id == item.id)) {
  //       this.selectedInvoices = this.selectedInvoices.filter(x => {
  //         if (x.id != item.id) {
  //           return item
  //         }
  //       })
  //     }
  //   }

  // }



  selectedGeneratedInvoices: any[] = [];
  setGeneratedAll(completed: boolean, item: any) {

    if (completed == true) {
      this.selectedGeneratedInvoices.push({ ...item, BillingCycleType: item.BillingCycleType ? item.BillingCycleType : 0, specialPrice: item.specialPrice ? item.specialPrice : 0 })
    }
    else {

      if (this.selectedGeneratedInvoices.find(x => x.id == item.id)) {
        this.selectedGeneratedInvoices = this.selectedGeneratedInvoices.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }

  }



  openDialog() {

    if (this.selection.selected.length === 0) {
      // Show alert message
      Swal.fire(
        'Alert!',
        'Please select the list item!',
        'info'
      )
      return;
    }
    else {
      this.spinnerService.requestStarted();

      this.selection.selected.forEach(x => this.setAll(x));
      if (this.selectedInvoice.length > 0) {
        this.selectedInvoiceJobs = this.selectedInvoice;
      }
      let result: any = {
        "jobId": " ",
        "shortName": " ",
        "scopeId": 0,
        "scopeDesc": " ",
        "clientId": this.myForm.value?.ClientId,
        "billingCycleType": "",
        "dateofUpload": "2023-04-06T08:51:10.069Z",
        "createdBy": this.loginservice.getUsername(),
        "departmentId": 0,
        "tranId": 0,
        "id": 0,
        "jId": 0,
        "pricingTypeId": 0,
        "getInvoice": this.selectedInvoiceJobs,
        "fileReceivedDate": "2023-04-06T08:51:10.069Z",
        "isBillable": true,
        "specialPrice": 0,
        "estimatedTime": 0,
        "isWaiver": true,
        "jobStatusId": 0
      }


      this.http.post<any>(environment.apiURL + 'Invoice/GenerateInvoice', result).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe((results: any) => {
        // Set the search results in the data source
        this.spinnerService.requestEnded();

        Swal.fire(
          '',
          results.stringList,
          'info'
        ).then((response) => {
          if (response.isConfirmed) {
            this.ngOnInit()
          }
        })
      }
      )
    }

  }



  ngOnInit(): void {
    this.getClient();
    this.getConfirmInvoiceTable();
  }
  getClient() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'Invoice/GetClient').subscribe(data => {
      this.spinnerService.requestEnded();
      this.data = data;
      this.ClientGeneratedata = data;
    }, error => {
      this.spinnerService.resetSpinner();
    });
  }
  data: any = {
    clientList: [],
  };
  ClientGeneratedata: any = {
    clientList: [],
  };

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  myForm = new FormGroup({

    fromDate: new FormControl("", Validators.required),
    toDate: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required)
  });





  getEmployeeList() {
    this.spinnerService.requestStarted();
    this._empService.getEmployeeList().subscribe({

      next: (res) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(res);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.table1Paginator;


      }
    });
  }
  onSubmit() {
    // Call the API to get the search results
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'Invoice/GetClientDetails', {
      "clientId": this.myForm.value?.ClientId,
      "fromDate": this.myForm.value?.fromDate,
      "toDate": this.myForm.value?.toDate
    }).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((results: any) => {
      // Set the search results in the data source
      this.spinnerService.requestEnded();
      this.dataSource.data = results.getInvoice;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.table1Paginator;

    }
    )
  }



  ///Genrated Invoice
  Clientid: any;
  GenratedInvoicedataSource = new MatTableDataSource();
  displayedGenaratedInvoiceColumns: string[] = [
    'selected', 'Client', 'JobId', 'JobDate', 'FileName', 'ProjectCode',
    'Department', 'JobStatus', 'Scope', 'StitchCount',
    'EstimatedTime', 'PricingType', 'ESTFileReceived', 'ESTDateofUpload',
    'Rate'
  ];

  getGeneratedInvoice() {
    let payload = {
      "clientId": this.ClientGeneratedId
    }
    this.spinnerService.requestStarted();

    this.http.post<any>(environment.apiURL + `Invoice/GetCalculatedPrice`, payload).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(result => {
      this.spinnerService.requestEnded();

      // Calculate the total rate
      this.totalRate = result.getInvoice.reduce((acc, row) => acc + row.rate, 0);


      this.GenratedInvoicedataSource.data = result.getInvoice;
      this.GenratedInvoicedataSource.paginator = this.table2Paginator;
    })
  }

  ///confirm invoicr////
  ConfirmInvoicedataSource = new MatTableDataSource();

  getConfirmInvoiceTable() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Invoice/GetAllInvoiceMasterDetails`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.spinnerService.requestEnded();
      this.ConfirmInvoicedataSource = new MatTableDataSource(results.getInvoice);
      this.ConfirmInvoicedataSource.sort = this.sort;
      this.ConfirmInvoicedataSource.paginator = this.table3Paginator;
    })
  }

  displayedConfirmInvoiceColumns: string[] = [
    'selected', 'Client', 'InvoiceNo', 'InvoiceDate', 'ProductValue', 'WaiverAmount',
    'RoundOff', 'ArtInvoiceAmount', 'DigiInvoiceAmount', 'Invoice',
    'Discount', 'ArtPayableAmount', 'ArtFileCount', 'DigiPayableAmount',
    'DigiFileCount', 'Payable', 'PaymentMode'
  ];

  openConfirmDialog(data) {

    const dialogRef = this.dialog.open(DetailsComponent, {
      data
    });


    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getConfirmInvoiceTable();

        }
      },
    });
  }
  ClientGeneratedId: number = 0;



  btnSubmitRecalculate() {

    if (this.selection1.selected.length === 0) {
      Swal.fire(
        'Alert!',
        'Please Select a Client.',
        'info'
      )
    }
    else {
      this.selection1.selected.forEach(x => this.setEmployeeAll(x));
      if (this.selectedGeneratedInvoice.length > 0) {
        this.selectedGeneratedInvoiceJobs = this.selectedGeneratedInvoice;
      }

      let payload = {
        "jobId": "",
        "shortName": "",
        "scopeId": 0,
        "scopeDesc": "",
        "clientId": this.ClientGeneratedId,
        "billingCycleType": "",
        "dateofUpload": "2023-08-21T11:59:16.821Z",
        "createdBy": this.loginservice.getUsername(),
        "departmentId": 0,
        "tranId": 0,
        "id": 0,
        "jId": 0,
        "pricingTypeId": 0,
        "getInvoice": this.selectedGeneratedInvoiceJobs,
        "fileReceivedDate": "2023-08-21T11:59:16.821Z",
        "isBillable": true,
        "specialPrice": 0,
        "estimatedTime": 0,
        "isWaiver": true,
        "jobStatusId": 0
      }
      this.spinnerService.requestStarted();

      this.http.post<any>(environment.apiURL + `Invoice/GenerateReCalculateInvoice`, payload).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(results => {
        this.spinnerService.requestEnded();

        Swal.fire(
          'Done!',
          results.stringList,
          'success'
        ).then((res) => {
          if (res.isConfirmed) {
            this.getGeneratedInvoice();
            this.ClientGeneratedId = 0;
          }
        })
      })
    }


  }


  btnSubmitConfirm() {

    if (this.selection1.selected.length === 0) {
      Swal.fire(
        'Alert!',
        'Please Select a Client.',
        'info'
      )
    }
    else {

      this.selection1.selected.forEach(x => this.setEmployeeAll(x));
      if (this.selectedGeneratedInvoice.length > 0) {
        this.selectedGeneratedInvoiceJobs = this.selectedGeneratedInvoice;
      }
      let payload = {
        "jobId": "string",
        "shortName": "string",
        "scopeId": 0,
        "scopeDesc": "string",
        "clientId": this.clientId,
        "billingCycleType": "",
        "dateofUpload": "2023-08-21T13:54:54.873Z",
        "createdBy": this.loginservice.getUsername(),
        "departmentId": 0,
        "tranId": 0,
        "id": 0,
        "jId": 0,
        "pricingTypeId": 0,
        "getInvoice": this.selectedGeneratedInvoiceJobs,
        "fileReceivedDate": "2023-08-21T13:54:54.873Z",
        "isBillable": true,
        "specialPrice": 0,
        "estimatedTime": 0,
        "isWaiver": true,
        "jobStatusId": 0
      }
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + `Invoice/GenerateConfirmInvoice`, payload).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(results => {
        this.spinnerService.requestEnded();

        if (results.stringList == "VoucherControl is Missing") {
          Swal.fire(
            'alert!',
            results.stringList,
            'info'
          )
        }
        else {
          Swal.fire(
            'Done!',
            results.stringList,
            'success'
          )
        }
      })
    }
  }



  /////////////SelectedAll function////
  selection = new SelectionModel<any>(true, []);
  selection1 = new SelectionModel<any>(true, []);
  selection3 = new SelectionModel<any>(true, []);
  selection4 = new SelectionModel<any>(true, []);
  filterValue: any
  filterValue1: any
  filterValue2: any




  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.SelectedListItem = numSelected;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    else if (this.filterValue) {
      this.selection.clear();
      this.dataSource.filteredData.forEach(x => this.selection.select(x));
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }



  }

  employeeFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectedInvoice: any[] = [];

  setAll(item: any) {
    console.log(item, "InvoiceItems")
    this.selectedInvoice.push({
      ...item,
      specialPrice: item.specialPrice ? item.specialPrice : 0,
      billingCycleType: item.billingCycleType ? item.billingCycleType : " ",
      ScopeDesc: ''
    });
  }








  ////2nd taBLE
  isEmplSelected() {
    const numSelected = this.selection1.selected.length;
    const numRows = this.GenratedInvoicedataSource.data.length;
    return numSelected === numRows;
  }

  emplMasterToggle() {
    if (this.isEmplSelected()) {
      this.selection1.clear();
    }
    else if (this.filterValue1) {
      this.selection1.clear();
      this.GenratedInvoicedataSource.filteredData.forEach(x => this.selection1.select(x));
    } else {
      this.GenratedInvoicedataSource.data.forEach(row => this.selection1.select(row));
    }

  }

  applyFilter(event: Event) {
    this.filterValue1 = (event.target as HTMLInputElement).value;
    this.GenratedInvoicedataSource.filter = this.filterValue1.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.GenratedInvoicedataSource.paginator) {
      this.GenratedInvoicedataSource.paginator.firstPage();
    }
  }
  selectedGeneratedInvoice: any[] = [];
  setEmployeeAll(item: any) {
    console.log(item, "generatedInvoices");

    this.selectedGeneratedInvoice.push({
      ...item,
      billingCycleType: item.billingCycleType ? item.billingCycleType : " ",
      specialPrice: item.specialPrice ? item.specialPrice : 0


    });
  }





  ///3rd 

  isConfirmSelected() {
    const numSelected = this.selection3.selected.length;
    const numRows = this.ConfirmInvoicedataSource.data.length;
    return numSelected === numRows;
  }

  confcMasterToggle() {
    if (this.isConfirmSelected()) {
      this.selection3.clear();
    }
    else if (this.filterValue2) {
      this.selection3.clear();
      this.ConfirmInvoicedataSource.filteredData.forEach(x => this.selection3.select(x));
    } else {
      this.ConfirmInvoicedataSource.data.forEach(row => this.selection3.select(row));
    }

  }

  confirmFilter(event: Event): void {
    this.filterValue2 = (event.target as HTMLInputElement).value;
    this.ConfirmInvoicedataSource.filter = this.filterValue2.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.ConfirmInvoicedataSource.paginator) {
      this.ConfirmInvoicedataSource.paginator.firstPage();
    }
  }
  selectedConfirmInvoice: any[] = [];
  setConfirmAll(item: any) {
    console.log(item, "selectedConfirmInvoice");

    this.selectedConfirmInvoice.push({
      ...item,

    });
  }


  openArtInvoice() {

    if (this.selection3.selected.length === 0) {
      // Show alert message
      Swal.fire(
        'Alert!',
        'Please select the list item!',
        'info'
      )
      return;
    }
    else {
      // this.spinnerService.requestStarted();
      this.selection3.selected.forEach(x => this.setConfirmAll(x));
      if (this.selectedConfirmInvoice.length > 0) {
        const invoiceNumber = this.selectedConfirmInvoice[0].invoiceNo;
        const url = this.router.serializeUrl(
          this.router.createUrlTree(['/topnavbar/acc-SSRS'], { queryParams: { InvoiceNo: invoiceNumber } })
        );
         const redirectURL = document.location.origin + '/#' + url;
        window.open(redirectURL, '_blank');
      //  this.router.navigate([url], { queryParams: { InvoiceNo: invoiceNumber } });
      }
    }
  }

  DigiArtInvoice() {

    if (this.selection3.selected.length === 0) {
      // Show alert message
      Swal.fire(
        'Alert!',
        'Please select the list item!',
        'info'
      )
      return;
    }
    else {
      // this.spinnerService.requestStarted();

      this.selection3.selected.forEach(x => this.setConfirmAll(x));
      if (this.selectedConfirmInvoice.length > 0) {
        this.selectedConfirmInvoiceJobs = this.selectedConfirmInvoice;

        const params = new HttpParams().set('InvoiceNo', this.selectedConfirmInvoice[0].invoiceNo);

        this.sendinginvoiceNumber = this.selectedConfirmInvoice[0].invoiceNo

        const invoiceNumber = this.selectedConfirmInvoice[0].invoiceNo;
        console.log(invoiceNumber, "invoiceNumber");

        const url = this.router.serializeUrl(
          this.router.createUrlTree(['/topnavbar/acc-generatedinvoice'], { queryParams: { InvoiceNo: invoiceNumber } })
        );
        const redirectURL = document.location.origin + '/#' + url;
        window.open(redirectURL, '_blank');

      }
    }
  }
  Invoice() {

    if (this.selection3.selected.length === 0) {
      // Show alert message
      Swal.fire(
        'Alert!',
        'Please select the list item!',
        'info'
      )
      return;
    }
    else {
      // this.spinnerService.requestStarted();

      this.selection3.selected.forEach(x => this.setConfirmAll(x));
      if (this.selectedConfirmInvoice.length > 0) {
        this.selectedConfirmInvoiceJobs = this.selectedConfirmInvoice;

        const params = new HttpParams().set('InvoiceNo', this.selectedConfirmInvoice[0].invoiceNo);

        this.sendinginvoiceNumber = this.selectedConfirmInvoice[0].invoiceNo

        const invoiceNumber = this.selectedConfirmInvoice[0].invoiceNo;
        console.log(invoiceNumber, "invoiceNumber");

        const url = this.router.serializeUrl(
          this.router.createUrlTree(['/topnavbar/acc-popupinvoice'], { queryParams: { InvoiceNo: invoiceNumber } })
        );
        const redirectURL = document.location.origin + '/#' + url;
        window.open(redirectURL, '_blank');

      }
    }
  }


}