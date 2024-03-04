import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams, RowNode } from 'ag-grid-community';
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
  columnApi: any;

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
    const selectedNodes: RowNode[] = this.gridApi.getSelectedNodes() as RowNode[]; // Cast to RowNode[]
    if (selectedNodes.length > 0) {
      selectedNodes.forEach((node: RowNode) => {
        node.setDataValue('exchangeRate', this.exchangeHeader);
      });
      // Refresh the grid after updating data
    }
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
        this.rowData = results.getInvoice;
        this.spinnerService.requestEnded();


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
console.log(this.gridApi.getSelectedRows(),"SelectedRows");

    var invintigxchange = this.gridApi.getSelectedRows().map(x => {
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
        ).then((result) => {
          if (result.isConfirmed) {
            this.onSubmit();

            this.selectedInvoices = [];
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
    console.log(this.gridApi.getSelectedRows(),"SelectedRows");

    let invintiglist = this.gridApi.getSelectedRows().map(x => {
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
        ).then((result) => {
          if (result.isConfirmed) {
            this.onSubmit();
            this.selectedInvoices = [];
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
  /////////////////////////Ag-grid module///////////////////////////////
  context: any;

  @ViewChild('agGrid') agGrid: any;

  private gridApi!: GridApi<any>;


  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  columnDefs: ColDef[] = [
    { headerName: 'Client Name', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { color: 'skyblue', 'cursor': 'pointer' } },
    { headerName: 'Invoice Number', field: 'invoiceNo', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Invoice Date', field: 'invoiceDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Product Amount', field: 'invoiceValue', filter: 'agTextColumnFilter',
      floatingFilter: true, },

    { headerName: 'Round Off', field: 'roundOff', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Waiver', field: 'waiver', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Discount', field: 'discount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Invoice Amount', field: 'invoiceValue', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Payment Mode', field: 'paymentMode', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Exchange Rate', field: 'exchangeRate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[] = [];
  public themeClass: string =
    "ag-theme-quartz";


  onCellClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'invoiceNo') {
      console.log(data, "PopupData");

    }
  }



  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

  }
}

function isFirstColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}