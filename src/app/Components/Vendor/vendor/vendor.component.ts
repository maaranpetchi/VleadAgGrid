import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { EditVendorComponent } from '../edit-vendor/edit-vendor.component';
import { MatDialog } from '@angular/material/dialog';
import { VendorService } from 'src/app/Services/Vendor/vendor.service';
import { UpdatevendorComponent } from '../updatevendor/updatevendor.component';
import { SpinnerService } from '../../Spinner/spinner.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  ngOnInit(): void {
    this.fetchtableData();
  }
  constructor(private spinnerService:SpinnerService, private VendorService:VendorService,  private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private _dialog: MatDialog) { }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['VendorName', 'InvoiceNumber', 'InvoiceDate', 'InvoiceValue', 'PendingAmount', 'AmountPaid', 'Action'];
  btnAccountEEdit(id: string) {
    // Implement your edit logic here
  }

  fetchtableData() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `ITAsset/nGetVendorData`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next:(data) => {
        this.spinnerService.requestEnded();
      this.dataSource = new MatTableDataSource(data.vendorGDetailList);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        this.spinnerService.resetSpinner();
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

  openvendor(){
    const dialogRef = this._dialog.open(EditVendorComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchtableData();
        }
      },
    });
  }

  openEditForm(data:any){
    const dialogRef = this._dialog.open(UpdatevendorComponent, {
      data:{
        type:"edit",
        data:data
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchtableData();
        }
      }
    });
  }
}
