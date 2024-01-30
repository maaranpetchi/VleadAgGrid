
import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { CustomerVSEmployeeService } from 'src/app/Services/CustomerVSEmployee/customer-vsemployee.service';
import { AddEditCustomerVSEmployeeComponent } from '../add-edit-customer-vsemployee/add-edit-customer-vsemployee.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import FileSaver from 'file-saver';
@Component({
  selector: 'app-customer-vsemployee',
  templateUrl: './customer-vsemployee.component.html',
  styleUrls: ['./customer-vsemployee.component.scss']
})
export class CustomerVSEmployeeComponent implements OnInit {

  displayedColumns: string[] = [
    'customerClassification',
    'employeeNameCode',
    'name',
    'shortName',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isDeletedInclude = false;
  isResignInclude = false;

  constructor(private _dialog: MatDialog,
    private spinnerService: SpinnerService,
    private _empService: CustomerVSEmployeeService,
    private _coreService: CoreService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditCustomerVSEmployeeComponent, {
       height: '70vh',
       width: '140vw'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this.spinnerService.requestStarted();

    this._empService.getEmployeeList().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({

      next: (res) => {

        this.dataSource = new MatTableDataSource(res);

        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinnerService.requestEnded();

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

  deleteEmployee(id: number) {
    this.spinnerService.requestStarted();

    this._empService.deleteEmployee(id).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();
        Swal.fire(
          'Done!',
          'Employee Deleted !',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.getEmployeeList();
          }
        });


      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    });
  }

  openEditForm(data: any) {

    const dialogRef = this._dialog.open(AddEditCustomerVSEmployeeComponent, {
      height: '70vh',
      width: '140vw',
      data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();

        }
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
  exportToCsv() {
    // Check if there is no data in the table
    if (this.dataSource.data.length === 0) {
      Swal.fire('Alert', 'No Records in the table', 'info');
      return;
    }

    const header = ['customerClassification', 'employeeNameCode', 'name', 'shortName'];

    // Access the data array from the MatTableDataSource
    const csvData = this.dataSource.data.map(row => {
      return [
        row.customerClassification,
        row.employeeName,
        row.name,
        row.shortName
      ].join(',');
    });

    const csv = [header.join(','), ...csvData].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    FileSaver.saveAs(blob, 'customerVsEmployee.csv');
  }

}
