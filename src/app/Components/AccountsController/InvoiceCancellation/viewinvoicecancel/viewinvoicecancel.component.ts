import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { PopupinvoicecancellistComponent } from '../popupinvoicecancellist/popupinvoicecancellist.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { ClientordinationindexComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/clientordinationindex/clientordinationindex.component';
import { JobDetailsClientIndexComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/query-to-client/job-details-client-index/job-details-client-index.component';
@Component({
  selector: 'app-viewinvoicecancel',
  templateUrl: './viewinvoicecancel.component.html',
  styleUrls: ['./viewinvoicecancel.component.scss']
})
export class ViewinvoicecancelComponent  implements OnInit {
  displayedColumns: string[] = ['CancellationNo', 'InvoiceNo', 'CancelledDate', 'CancelledBy', 'ProductValue', 'Wavier', 'RoundOff', 'Discount', 'Invoicevalue'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() invoiceNumberSelected = new EventEmitter<string>();
  columnApi: any;


  constructor(private http: HttpClient,private dialog:MatDialog) {}

  ngOnInit() {
    this.getData();
  }

  // getData() {
  //   this.http.get('https://myapi.com/data').subscribe((data: any[]) => {
  //     this.dataSource = new MatTableDataSource(data);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }


  openPopupForm(data): void {
    console.log(data,"InvoiceNumber");
    
    const dialogRef = this.dialog.open(PopupinvoicecancellistComponent, {
      width: '1000px',
      height:'70vh',
      data: { invoiceNo: data.InvoiceNo}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup form was closed');
    });
    this.invoiceNumberSelected.emit(data.InvoiceNo);
  }
  



  getData() {
    this.http.get(environment.apiURL+'Invoice/GetInvoiceMasterDetailforCancelled').subscribe((response: any) => {
      if (response && response.invoicesc.length>0) {
        // transform the API response if needed to match the structure of your table's columns
        const data = response.invoicesc.map(item => {
          return {
            CancellationNo: item.invoiceNo,
            InvoiceNo: item.originalNo,
            CancelledDate: item.invoiceDate,
            CancelledBy: item.employeeName,
            ProductValue: item.productValue,
            Wavier: item.waiver,
            RoundOff: item.roundOff,
            Discount: item.discount,
            Invoicevalue: item.totalInvoiceValue
          };
        });
        // assign the transformed data to the MatTableDataSource
        this.rowData = data;
 
      }
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
    { headerName: 'CancellationNo', field: 'CancellationNo', filter: true, },
 
    { headerName: 'InvoiceNumber', field: 'InvoiceNo', filter: true,cellStyle: {color: 'skyblue', 'cursor':'pointer'}  },
    { headerName: 'Cancelled Date', field: 'CancelledDate', filter: true, },
    { headerName: 'Cancelled By', field: 'CancelledBy', filter: true, },
 
    { headerName: 'Product Value', field: 'ProductValue', filter: true, },
    { headerName: 'Wavier', field: 'Wavier', filter: true, },
    { headerName: 'RoundOff', field: 'RoundOff', filter: true, },
    { headerName: 'Discount', field: 'Discount', filter: true, },
  ];
 
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: any[];
  public themeClass: string =
    "ag-theme-quartz";
  
   onCellClicked(event: CellClickedEvent) {
     const { colDef, data } = event;
     if (colDef.field === 'InvoiceNo') {
       console.log(data,"PopupData");
       
       this.openPopupForm(data);
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