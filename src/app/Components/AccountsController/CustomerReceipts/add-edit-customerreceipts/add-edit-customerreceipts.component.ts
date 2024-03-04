import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CustomerreceiptsService } from 'src/app/Services/AccountController/CustomerReceipts/customerreceipts.service';
import { Location } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';


@Component({
  selector: 'app-add-edit-customerreceipts',
  templateUrl: './add-edit-customerreceipts.component.html',
  styleUrls: ['./add-edit-customerreceipts.component.scss']
})

export class AddEditCustomerreceiptsComponent implements OnInit {
  apiResponseData: any;
context: any;
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
    this.rowData = results.receivableAdjustments;
    this.table2rowData = results.receivableExts;
  })
}

goBack(): void {
  this.location.back();
}


 /////////////////////////Ag-grid module///////////////////////////////
 @ViewChild('agGrid1') agGrid1: AgGridAngular;
 @ViewChild('agGrid2') agGrid2: AgGridAngular;

 private gridApi1!: GridApi;
 private gridApi2!: GridApi;

 public defaultColDef: ColDef = {
   flex: 1,
   minWidth: 100,
   headerCheckboxSelection: isFirstColumn,
   checkboxSelection: isFirstColumn,
 };
 public table2defaultColDef: ColDef = {
   flex: 1,
   minWidth: 100,
   headerCheckboxSelection: isSecondColumn,
   checkboxSelection: isSecondColumn,
 };

 table1def: ColDef[] = [
  { headerName: 'Invoice Type', field: 'Adjustment', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Invoice Number', field: 'invoiceNo', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Adjusted Amount', field: 'adjustmentAmount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
];

table2def: ColDef[] = [
  { headerName: 'Bank Name', field: 'bankName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Transaction Date', field: 'transactionDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Receipt Mode', field: 'receiptMode', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Transaction Number', field: 'transactionNo', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Amount', field: 'amount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
];





 public rowSelection: 'single' | 'multiple' = 'multiple';
 public table2rowSelection: 'single' | 'multiple' = 'multiple';

 public rowData: any[]=[];
 public table2rowData: any[]=[];

 public themeClass: string =
   "ag-theme-quartz";

 onGridReady1(params: GridReadyEvent) {
   this.gridApi1 = params.api;
 }

 onGridReady2(params: GridReadyEvent) {
   this.gridApi2 = params.api;
 }

 handleCellValueChanged(params: { colDef: ColDef, newValue: any, data: any }) {
   console.log(params, "Parameter");
   console.log(params.data, "ParameterData");
   let parameterData = params.data
   if (params.colDef.field === 'filecount') { // Check if the changed column is 'price'

   }
 }


 handlePress(newvalue, parameterData) {
   console.log(newvalue, "HandlepressNewValue");
   console.log(parameterData, "ParameterValue");

 }
 selectedRows1: any;
 selectedRows2: any;

}
function isFirstColumn(
 params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams
) {
 var displayedColumns = params.api.getAllDisplayedColumns();
 var thisIsFirstColumn = displayedColumns[0] === params.column;
 return thisIsFirstColumn;
}

function isSecondColumn(
 params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams
) {
 var displayedColumns = params.api.getAllDisplayedColumns();
 var thisIsSecondColumn = displayedColumns[0] === params.column;
 return thisIsSecondColumn;
}