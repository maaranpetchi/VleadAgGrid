
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmpvsdivService } from 'src/app/Services/EmployeeVSDivision/empvsdiv.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/Services/EmployeeVSDivision/Core/core.service'; 
import { AddeditemployeevsdivisionComponent } from '../addeditemployeevsdivision/addeditemployeevsdivision.component';
import { SpinnerService } from '../../Spinner/spinner.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-indexemployeevsdivision',
  templateUrl: './indexemployeevsdivision.component.html',
  styleUrls: ['./indexemployeevsdivision.component.scss']
})
export class indexemployeevsdivisionComponent implements OnInit {
  displayedColumns: string[] = [
    'employeeCode',
    'employeeName',
    'divisionName',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spinnerService: SpinnerService,
    private _dialog: MatDialog,
    private _empService: EmpvsdivService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddeditemployeevsdivisionComponent,{
      //height: '80vh',
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
    this.spinnerService.requestStarted();

    this._empService.getEmployeeList().pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        this.dataSource = new MatTableDataSource(res.gEvDList);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:console.log,
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
    this._empService.deleteEmployee(id).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        Swal.fire('Done!','Division deleted successfully','success').then((response)=>{
          if(response.isConfirmed){
            this.getEmployeeList();
          }
        });
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddeditemployeevsdivisionComponent, {
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
