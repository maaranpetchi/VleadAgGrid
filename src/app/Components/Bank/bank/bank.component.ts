import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['bankname', 'closingdate', 'closingbalance'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private spinnerService: SpinnerService) { }
  ngOnInit(): void {
    this.fetchData();
  }
  BankName: string = '';
  selectedDate: string = '';
  ClosingBalance: string = '';



  BankSubmit() {
    var postData = {
      "id": 0,
      "bankName": this.BankName,
      "closingDate": this.selectedDate,
      "closingBalance": this.ClosingBalance,
      "employeeId": this.loginservice.getUsername()
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `ITAsset/nSetBankDetails`, postData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();

        if (data.setBDetailList == "Record Added Successfully!") {
          Swal.fire(
            'Done!',
            data.setBDetailList,
            'success'
          ).then((result) => {

            if (result.isConfirmed) {
              this.BankName = '';
              this.selectedDate = '';
              this.ClosingBalance = '';
              this.fetchData();
            }

          })
        }
        else {
          Swal.fire(
            'Error!',
            'An error occurred !.',
            'error'
          );
        }


      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error

      }

    });
  }

  fetchData() {
    // Make an HTTP request to your REST API and fetch the data
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'ITAsset/nGetBankDetails').pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(data.getBDetailList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }



  //to save the checkbox value
  selectedQuery: any[] = [];

  setAll(completed: boolean, item: any) {
    if (completed == true) {
      this.selectedQuery.push(item)
    }
    else {

      if (this.selectedQuery.find(x => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
  }


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
