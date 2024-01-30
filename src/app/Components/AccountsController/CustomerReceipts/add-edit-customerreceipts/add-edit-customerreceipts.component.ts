import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CustomerreceiptsService } from 'src/app/Services/AccountController/CustomerReceipts/customerreceipts.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-edit-customerreceipts',
  templateUrl: './add-edit-customerreceipts.component.html',
  styleUrls: ['./add-edit-customerreceipts.component.scss']
})

export class AddEditCustomerreceiptsComponent implements OnInit {
  apiResponseData: any;
  ngOnInit(): void {
    const data = this._empservice.getData();
    
    this.apiResponseData = data.data;
    
    this.voucherNumber= this.apiResponseData.voucherNo
    this.voucherDate= this.apiResponseData.collectionDate;
    this.referenceNumber=this.apiResponseData.referenceNo;
    this.referenceDate= this.apiResponseData.referenceDate;
    this.customerName=this.apiResponseData.customer.name;
    this.receiptAmount=this.apiResponseData.collectionAmount;
    this.description=this.apiResponseData.description;
    this._empservice.shouldFetchData = false;

    this.getinvoicetable();
  }
 

    constructor(private http: HttpClient, private formBuilder: FormBuilder,private _empservice:CustomerreceiptsService,private location: Location) { }

    displayedColumns: string[] = [
      'invoicetype',
      'invoicenumber',
      'adjustedamount'
    ];
    displayedReceiptColumns: string[] = [
      'bankname',
      'transactiondate',
      'receiptmode',
      'transactionnumber',
      'amount'
    ];
  //stringinterpolation
  voucherNumber:string='';
  voucherDate:string='';
  referenceNumber:string='';
  referenceDate:string='';
  customerName:string='';
  receiptAmount:string='';
  description:string='';

  dataSource!: MatTableDataSource<any>;
  dataSourceReceipt!: MatTableDataSource<any>;
  @ViewChild('paginatorOne') paginatorOne: MatPaginator;
  @ViewChild('paginatorTwo') paginatorTwo: MatPaginator;

  @ViewChild('sortOne') sortOne: MatSort;
  @ViewChild('sortTwo') sortTwo: MatSort;



  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

getinvoicetable(){
  this.http.get<any>(environment.apiURL +`Receivable/GetReceivableById?receivableId=${this.apiResponseData.id}`).subscribe(results =>{
    this.dataSource = new MatTableDataSource(results.receivableAdjustments);
    this.dataSourceReceipt = new MatTableDataSource(results.receivableExts);
  })
}

goBack(): void {
  this.location.back();
}
  }