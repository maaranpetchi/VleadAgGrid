import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { PopupinvoicecancellistComponent } from '../popupinvoicecancellist/popupinvoicecancellist.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
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


  openPopupForm(invoiceNo: string): void {
    const dialogRef = this.dialog.open(PopupinvoicecancellistComponent, {
      width: '1000px',
      height:'70vh',
      data: { invoiceNo: invoiceNo}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup form was closed');
    });
    this.invoiceNumberSelected.emit(invoiceNo);
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
        this.dataSource = new MatTableDataSource(data);
        // set the paginator and sort to the MatTableDataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  



  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}