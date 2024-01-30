import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'jquery';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.scss']
})
export class TallyComponent implements OnInit {
  exchangeHeader: number;

  constructor(private http: HttpClient, private dialog: MatDialog, private spinnerService: SpinnerService) { }

  displayedColumns: string[] = [
    'selected',
    'ClientName',
    'invoiceno',
    'invoicedate',
    'productamount',
    'roundoff',
    'waiver',
    'discount',
    'invoiceamout',
    'paymentmode',
    'exchangerate',
  ];

  selectedInvoices: any[] = [];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setAll(completed: boolean, item: any) {

    if (completed == true) {
      this.selectedInvoices.push(item)
    }
    else {

      if (this.selectedInvoices.find(x => x.id == item.id)) {
        this.selectedInvoices = this.selectedInvoices.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }


  }

  setExchangeHeader() {
    let temparray: any[] = [];
    let skip: boolean;
    this.dataSource.data.filter((y: any) => {
      skip = false;
      this.selectedInvoices.forEach((x) => {
        if (y.id === x.id) {
          temparray.push({
            ...y,
            exchangeRate: this.exchangeHeader,
            isSelected: true
          });
          skip = true;
        }
      });
      if (!skip) {
        temparray.push(y);
      }
    });


    this.dataSource.data = temparray;

  }

  ngOnInit(): void {
    this.getClient();
  }
  getClient() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'Invoice/GetClient').subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.data = data;

      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }
  data: any = {
    clientList: [],
  };

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm = new FormGroup({

    fromDate: new FormControl("", Validators.required),
    toDate: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required)
  });





  onSubmit() {
    // Call the API to get the search results
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'Invoice/GetInvoiceIntegrationMaster', {
      "customerID": this.myForm.value?.ClientId,
      "fromDate": this.myForm.value?.fromDate,
      "toDate": this.myForm.value?.toDate
    }).subscribe({
      next: (results: any) => {
        // Set the search results in the data source
        this.spinnerService.requestEnded();
        this.dataSource.data = results.getInvoice;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }

    })
  }


  updateintegration() {

    var invintigxchange = this.selectedInvoices.map(x => {
      return {
        "id": x.id,
        "invoiceNo": "",
        "exchangeRate": this.exchangeHeader,
        "invintigxchange": []
      }
    })
    var data = {
      "id": 0,
      "invoiceNo": "",
      "exchangeRate": 0,
      "invintigxchange": invintigxchange
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'Invoice/GetExchangeRatetoInvoice', data).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        Swal.fire(
          'Done!',
          data.stringList,
          'success'
        ).then((result)=>{
          if(result.isConfirmed){
            this.selectedInvoices = [];
            this.onSubmit();
          }
        });

      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }

    })
  }


  movetointegration() {

    let invintiglist = this.selectedInvoices.map(x => {
      return {
        "id": x.id,
        "invoiceNo": x.invoiceNo,
        "invoiceDate": x.invoiceDate,
        "estInvoiceDate": x.estInvoiceDate,
        "referenceDate": x.referenceDate,
        "shortName": x.shortName,
        "description": x.description,
        "productValue": x.productValue,
        "discount": x.discount,
        "invoiceValue": x.invoiceValue,
        "createdUTC": x.createdUTC,
        "createdBy": 0,
        "employeeId": 0,
        "updatedBy": 0,
        "invintiglist": [],
        "updatedUTC": x.updatedUTC,
        "primaryDateTime": x.primaryDateTime,
        "secondaryDateTime": x.secondaryDateTime,
        "artInvoiceAmount": x.artInvoiceAmount,
        "digiInvoiceAmount": x.digiInvoiceAmount,
        "roundOff": x.roundOff,
        "artWaiver": x.artWaiver,
        "digiWaiver": x.digiWaiver,
        "waiver": x.waiver,
        "receivableValue": x.receivableValue,
        "totalInvoiceValue": x.totalInvoiceValue,
        "transactionId": x.transactionId,
        "exchangeRate": x.exchangeRate
      }


    })
    let data = {
      "id": 0,
      "invoiceNo": "string",
      "invoiceDate": "2023-04-25T12:46:24.137Z",
      "estInvoiceDate": "2023-04-25T12:46:24.137Z",
      "referenceDate": "2023-04-25T12:46:24.137Z",
      "shortName": "string",
      "description": "string",
      "productValue": 0,
      "discount": 0,
      "invoiceValue": 0,
      "createdUTC": "2023-04-25T12:46:24.137Z",
      "createdBy": 0,
      "employeeId": 152,
      "updatedBy": 0,
      "invintiglist": invintiglist,
      "updatedUTC": "2023-04-25T12:46:24.137Z",
      "primaryDateTime": "2023-04-25T12:46:24.137Z",
      "secondaryDateTime": "2023-04-25T12:46:24.137Z",
      "artInvoiceAmount": 0,
      "digiInvoiceAmount": 0,
      "roundOff": 0,
      "artWaiver": 0,
      "digiWaiver": 0,
      "waiver": 0,
      "receivableValue": 0,
      "totalInvoiceValue": 0,
      "transactionId": 0,
      "exchangeRate": 0
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'Invoice/GetCopytoIntegration', data).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        Swal.fire(
          'Done!',
          data.stringList,
          'success'
        ).then((result)=>{
          if(result.isConfirmed){
            this.selectedInvoices = [];
            this.onSubmit();
          }
        });
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }

    })
  }
}