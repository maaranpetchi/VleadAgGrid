import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Injectable({
  providedIn: 'root'
})
export class VendorService {
  public showDiv: boolean = false;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private spinnerService:SpinnerService,private http:HttpClient) { }
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
      this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        this.spinnerService.resetSpinner();
      }
    });
  }

}
