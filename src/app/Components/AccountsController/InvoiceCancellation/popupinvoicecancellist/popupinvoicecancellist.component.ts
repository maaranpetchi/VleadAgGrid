import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
@Component({
  selector: 'app-popupinvoicecancellist',
  templateUrl: './popupinvoicecancellist.component.html',
  styleUrls: ['./popupinvoicecancellist.component.scss']
})
export class PopupinvoicecancellistComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['quantity', 'rate', 'value', 'pricingtype','scope','department','invoicenumber','invoicedate'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const request = {
      // your request body goes here
      "id":0,
      "invoiceNo":this.data.invoiceNo
    };

    this.http.post<any>(environment.apiURL+'Invoice/GetInvoiceTranforSalesCancel', request).subscribe(data => {
      const invoicedata = data.invoicesc
    this.dataSource = new MatTableDataSource(invoicedata);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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