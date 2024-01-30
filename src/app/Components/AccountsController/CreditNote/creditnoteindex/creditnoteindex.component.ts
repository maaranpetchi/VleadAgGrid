import { Component, Inject,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCreditnoteComponent } from '../add-creditnote/add-creditnote.component';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreditnoteService } from 'src/app/Services/AccountController/CreditNote/creditnote.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-creditnoteindex',
  templateUrl: './creditnoteindex.component.html',
  styleUrls: ['./creditnoteindex.component.scss']
})
export class CreditnoteindexComponent {
  displayedColumns: string[] = [
    'employeeCode',
    'employeeName',
    'departmentId',
    'designationId',
    'profiencyId',
    'reportingManager1',
    'reportLeader1',
    'invoicenumber'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog,
    private spinnerservice:SpinnerService,
    private _empService: CreditnoteService,
    private _coreService: CoreService,
    private http: HttpClient,) { }


  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddCreditnoteComponent,{
      height: '80vh',
      //width: '80vw'
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
    this.spinnerservice.requestStarted();

    this._empService.getEmployeeList().subscribe({

      next: (res) => {
        this.spinnerservice.requestEnded();

        this.dataSource = new MatTableDataSource(res);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        this.spinnerservice.resetSpinner(); // Reset spinner on error
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




  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddCreditnoteComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();

        }
      },
    });
  }

}
