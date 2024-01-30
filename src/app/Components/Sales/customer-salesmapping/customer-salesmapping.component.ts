import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, catchError } from 'rxjs';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-customer-salesmapping',
  templateUrl: './customer-salesmapping.component.html',
  styleUrls: ['./customer-salesmapping.component.scss'],
})
export class CustomerSalesmappingComponent implements OnInit {
  dropdownValues: any[] = [];
  selectedValue: string = '';
  selectedJobs: any;
  selectedCustomers: any;
  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private loginservice: LoginService,
  ) { }

  ngOnInit(): void {
    this.GetAllddlList();
  }
  selectedQuery: any[] = [];
  selectedEmployee: any[] = [];

  displayedColumns: string[] = [
    'selected',
    'customerName',
    'shortname',
    'classification',
    'salesemployee',
  ];
  displayedEmployeeColumns: string[] = [
    'selected',
    'employeecode',
    'salesemployee',
  ];

  dataSource: MatTableDataSource<any>;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // employee
  employeeDaSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  filterValue: any
  filterValue1: any
  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyEmployeeFilter(event: Event) {
    this.filterValue1 = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue1.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  checkAdmin(): Observable<any> {
    return this.http.get(
      environment.apiURL +
      `Account/checkIsAdmin/${this.loginservice.getUsername()}`
    );
  }
  checkUserName(): Observable<any> {
    return this.http.get(
      environment.apiURL +
      `Account/getEmployeeProcess/${this.loginservice.getUsername()}`
    );
  }

  setAll(item: any) {
    console.log(item)
    if (item.allocatedEstimatedTime == null) item.allocatedEstimatedTime = 0;
    if (item.employeeId == null) item.employeeId = 0;
    if (item.estimatedTime == null) item.estimatedTime = 0;
    this.selectedQuery.push({
      ...item,
      CategoryDesc: '',
      Comments: '',
      CommentsToClient: '',
      Remarks: '',
      SelectedEmployees: [],
      SelectedRows: [],
      customerId: [item.id],
      EmployeeName: "",
      EmployeeCode: item.employeeCode ? item.employeeCode : '',
      CustomerName: item.employeeName ? item.employeeName : '',
      ShortName: item.shortName ? item.shortName : '',
      isActive: false,
      isDeleted: false,
    });
  }

  setEmployeeAll(item: any) {
    this.selectedEmployee.push({
      ...item,
      // CategoryDesc: '',
      // Comments: '',
      // CommentsToClient: '',
      // FileInwardType: '',
      // JobId: 0,
      // Remarks: '',
      SelectedEmployees: [],
      SelectedRows: [],
      CustomerId: [0],
      CustomerName: item.employeeName ? item.employeeName:'',
      Description: item.employeeName ? item.employeeName:'',
      Name: item.employeeName ? item.employeeName:'',
      ShortName: item.employeeCode ? item.employeeCode:'',
      TimeStamp: '',
    });
  }
  onDropdownChange(): void {
    this.spinner.requestStarted();
    this.http
      .get<any[]>(
        environment.apiURL +
        `CustomerMapping/GetAllCustomerEmployee?Id=${this.selectedValue}`
      ).pipe(catchError((error) => {
        this.spinner.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      }))
      .subscribe({
        next: (response: any) => {
          this.spinner.requestEnded();
          this.dataSource = new MatTableDataSource(response);
          // this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator1;
          // this.employeeDaSource = new MatTableDataSource(response);
          // this.employeeDaSource.sort = this.sort;
          // this.employeeDaSource.paginator = this.paginator1;
          this.GetAllddlList();
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log('Error loading table values:', err);
        },
      });
  }

  GetAllddlList() {
    this.spinner.requestStarted();
    this.http
      .get(environment.apiURL + 'CustomerMapping/GetAllddlList').pipe(catchError((error) => {
        this.spinner.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      }))
      .subscribe({
        next: (response: any) => {
          this.spinner.requestEnded();
          this.employeeDaSource = new MatTableDataSource(response.employeeList);
          this.employeeDaSource.sort = this.sort;
          this.employeeDaSource.paginator = this.paginator2;
        },
        error(err) {
          console.log(err);
        },
      });
  }
  onSubmit() {
    this.spinner.requestStarted();
    this.selection.selected.forEach(x => this.setAll(x));
    this.selection1.selected.forEach(x => this.setEmployeeAll(x));
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
    let selectedCustomerCount = this.selectedQuery.length;
    let selectedEmployeeCount = this.selectedEmployee.length;
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
    if (selectedCustomerCount != 0 && selectedEmployeeCount != 0) {
      // if (selectedCustomerCount > 1) {
      if (selectedEmployeeCount > 1) {
        alert('Please select one Employee!');
      } else {
        var savecustomervsSalesemp = {
          selectedCustomers: this.selectedJobs,
          selectedEmployee: this.selectedEmployee,
          // customerId: this.selectedCustomers.customerId,
          createdBy: this.loginservice.getUsername(),
        };
        this.http
          .post(
            environment.apiURL +
            `CustomerMapping/CreateCustomerVsSalesEmployee`,
            savecustomervsSalesemp
          ).pipe(catchError((error) => {
            this.spinner.requestEnded();
            return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
          }))
          .subscribe((response: any) => {
            if (response.message === "Salesperson assigned successfully") {
              // alert('added');
              this.spinner.requestEnded();

              Swal.fire(
                'Done!',
                'Salesperson assigned successfully!',
                'success'
              ).then((response) => {
                if (response.isConfirmed) {
                  window.location.reload();
                }
              })
            } else {
              Swal.fire(
                'Done!',
                'Salesperson assigned Failed!',
                'error'
              )
              this.spinner.resetSpinner()
            }
          });
        // }
      }
    } else {
      alert('Please select Customer and Employee');
    }
  }
  //  CreateCustomerVsSalesEmployee = function () {
  //     var selectedCustomerCount = JSON.stringify(selectedCustomers.length);
  //     var selectedEmployeeCount = JSON.stringify(gridallocateApi.selection.getSelectedRows().length);
  //     if (selectedCustomerCount != 0 && this.selectedEmployeeCount != 0) {
  //         if (selectedEmployeeCount > 1) {
  //           //  alertMessage = 'Please select one Employee!';
  //           //   $('#alertPopup').modal('show');
  //           alert('Please select one Employee!')
  //         }
  //         else {
  //             var savecustomervsSalesemp = {
  //                 selectedCustomers:selectedCustomers,
  //                 SelectedEmployee:selectedEmployee,
  //                 customerId:selectedCustomers.CustomerId,
  //                 createdBy:EmployeeId,
  //             }

  // CustomerMappingFactory.CreateCustomerVsSalesEmployee('CreateCustomerVsSalesEmployee', savecustomervsSalesemp).$promise.then(function (result) {
  //     if (result.Success == true) {
  //        confirmationMessage = result.Message;
  //         $('#confirmedPopup').modal('show');
  //     }
  //     else {
  //        confirmationMessage = result.Message;
  //         $('#confirmedPopup').modal('show');
  //     }
  // });
  //         }
  //     }
  //     else {
  //        alertMessage = 'Please select Customer and Employee';
  //         $('#alertPopup').modal('show');
  //     }
  // }
  selection = new SelectionModel<Element>(true, []);
  selection1 = new SelectionModel<Element>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    else if (this.filterValue) {
      this.selection.clear();
      this.dataSource.filteredData.forEach(x => this.selection.select(x));
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }

  }
  isEmplSelected() {
    const numSelected = this.selection1.selected.length;
    const numRows = this.employeeDaSource.data.length;
    return numSelected === numRows;
  }

  emplMasterToggle() {
    if (this.isEmplSelected()) {
      this.selection1.clear();
    }
    else if (this.filterValue1) {
      this.selection1.clear();
      this.employeeDaSource.filteredData.forEach(x => this.selection1.select(x));
    } else {
      this.employeeDaSource.data.forEach(row => this.selection1.select(row));
    }

  }
}
