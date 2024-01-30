import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-customervsdivisionindex',
  templateUrl: './customervsdivisionindex.component.html',
  styleUrls: ['./customervsdivisionindex.component.scss']
})
export class CustomervsdivisionindexComponent implements OnInit {
  ngOnInit(): void {
    this.fetchShortName();
    this.fetchtableData();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  constructor(private http: HttpClient, private spinnerService: SpinnerService, private loginservice: LoginService) { }
 
  //ngmodel
  selectedShortname: any;
  selectedDepartment: number;
  selectedDivision: number;
  //dropdown array declarations
  customers: any[] = [];
  departments = [
    { name: 'Artwork', value: 1 },
    { name: 'Digitizing', value: 2 }
  ];
  divisions: any[] = []
  
  // input filter
  myControl = new FormControl('');
  filteredOptions:any;
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(option => option.toLowerCase().includes(filterValue));
  }

  fetchShortName() {
    this.http.get<any>(environment.apiURL + `Report/GetProcess`).subscribe(response => {
      this.customers = response.customerList;
      this.divisions = response.divisionList;
    })
  }
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'customershortname',
    'department',
    'division',
    'action',
  ];
  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchtableData() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `CustomerVsDivision/GetCustomerVsDivision`).subscribe(res => {
      this.spinnerService.requestEnded();
      this.dataSource = new MatTableDataSource(res.gCvDList);
      this.dataSource.paginator = this.paginator;
    })
  }
  deleteEmployee(id: number) {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `CustomerVsDivision/RemoveCvsD?id=${id}`).subscribe(results => {
      this.spinnerService.requestEnded();
      if (results == true) {
        Swal.fire(
          'Done!',
          'Employee Deleted Successfully',
          'success'
        )
      }
      else {
        Swal.fire(
          'Error!',
          'Employee Not Deleted ',
          'error'
        )
      }
    })

  }
  submit() {
    let payload = {
      "customerId": this.selectedShortname,
      "departmentId": this.selectedDepartment,
      "divisionId": this.selectedDivision,
      "employeeId": this.loginservice.getUsername()
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `CustomerVsDivision/SetCustomerVsDivision`, payload).subscribe(results => {
      this.spinnerService.requestEnded();
      Swal.fire(
        'Done!',
        'Inserted Sucessfully',
        'success'
      )
      this.selectedDepartment = 0;
      this.selectedDivision = 0;
      this.selectedShortname = 0;
      this.fetchtableData();

    }, error => {
      Swal.fire(
        'Error!',
        'Error Occured',
        'error'
      )
      this.spinnerService.resetSpinner();
    });

  }
}

