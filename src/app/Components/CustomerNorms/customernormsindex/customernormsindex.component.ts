import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from '../../Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { CustomerNormsService } from 'src/app/Services/CustomerNorms/customer-norms.service';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-customernormsindex',
  templateUrl: './customernormsindex.component.html',
  styleUrls: ['./customernormsindex.component.scss']
})
export class CustomernormsindexComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Department','CustomerShortName','Process','JobStatus', 'Scope', 'Norms', 'CustomerDivisions', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:HttpClient,private router:Router,private spinnerService:SpinnerService,private _empService:CustomerNormsService) { }

  ngOnInit(): void {
   this.getFetchTables();
  }
getFetchTables(){
  this.spinnerService.requestStarted();
  this.http.get<any>(environment.apiURL+`CustomerVsEmployee/GetCustomerNorms`).pipe(catchError((error) => {
    this.spinnerService.requestEnded();
    return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
  })).subscribe({
    next:(employees) => {
    this.spinnerService.requestEnded();
    this.dataSource = new MatTableDataSource(employees);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
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

  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

//aCTIONS
openEditForm(id: number) {
  this.spinnerService.requestStarted();
  this.http.get<any>(environment.apiURL + `CustomerVsEmployee/GetCustomerNormsById?Id=${id}`).pipe(catchError((error) => {
    this.spinnerService.requestEnded();
    return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
  })).subscribe({
    next:(results) => {
    this.spinnerService.requestEnded();
    this._empService.setData({ type: 'EDIT', data: results });
    this._empService.shouldFetchData = true;
    this.router.navigate(['/topnavbar/updatecustomerNorms']);
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
viewEmployee(id: number) {
  this.spinnerService.requestStarted();
  this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/GetEmployeeVsSkillsetbyId?id=${id}`).pipe(catchError((error) => {
    this.spinnerService.requestEnded();
    return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
  })).subscribe({
    next:(results) => {
    this.spinnerService.requestEnded();
    this._empService.setData({ type: 'EDIT', data: results });
    this._empService.shouldFetchData = true;
    this.router.navigate(['/topnavbar/viewskillset']);
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
deleteEmployee(id: number) {
   this.spinnerService.requestStarted();
   let payload={Id:id}
this.http.post<any>(environment.apiURL+`CustomerVsEmployee/DeleteCustomerNormById`,payload).pipe(catchError((error) => {
  this.spinnerService.requestEnded();
  return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
})).subscribe({
    next: (res) => {
      this.spinnerService.requestEnded();

      Swal.fire(
        'Deleted!',
        'Data deleted successfully!',
        'success'
      )
      this.getFetchTables();
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

OpenNewForm(){
  this.router.navigate(['/topnavbar/addcustomerNorms']);
}
}