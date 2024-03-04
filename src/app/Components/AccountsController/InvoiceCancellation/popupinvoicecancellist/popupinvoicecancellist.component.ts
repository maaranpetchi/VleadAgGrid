import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
@Component({
  selector: 'app-popupinvoicecancellist',
  templateUrl: './popupinvoicecancellist.component.html',
  styleUrls: ['./popupinvoicecancellist.component.scss']
})
export class PopupinvoicecancellistComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['quantity', 'rate', 'value', 'pricingtype', 'scope', 'department', 'invoicenumber', 'invoicedate'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnApi: any;

  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const request = {
      // your request body goes here
      "id": 0,
      "invoiceNo": this.data.invoiceNo
    };

    this.http.post<any>(environment.apiURL + 'Invoice/GetInvoiceTranforSalesCancel', request).subscribe(data => {
      const invoicedata = data.invoicesc
      this.rowData = invoicedata;

    });
  }
  ////////////////////Aggrid Module///////////////////

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
    { headerName: 'Quantity', field: 'qty', filter: 'agTextColumnFilter',
      floatingFilter: true, },

    { headerName: 'Rate', field: 'rate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Value', field: 'value', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Pricing Type ', field: 'pricingType', filter: 'agTextColumnFilter',
      floatingFilter: true, },

    { headerName: 'Scope', field: 'scope', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Department', field: 'departmentName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'invoice Number', field: 'invoiceNo', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Invoice Date', field: 'invoiceDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[]=[];
  public themeClass: string =
    "ag-theme-quartz";

  onCellClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'InvoiceNo') {
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