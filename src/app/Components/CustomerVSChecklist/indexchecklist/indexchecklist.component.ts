import { Component } from '@angular/core';
import { AddchecklistComponent } from '../addchecklist/addchecklist.component';
import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomervschecklistService } from 'src/app/Services/CustomerVSChecklist/customervschecklist.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { ViewchecklistComponent } from '../viewchecklist/viewchecklist.component';
import Swal from 'sweetalert2/src/sweetalert2.js';
@Component({
  selector: 'app-indexchecklist',
  templateUrl: './indexchecklist.component.html',
  styleUrls: ['./indexchecklist.component.scss']
})
export class IndexchecklistComponent implements OnInit {
  ngOnInit(): void {
    this.fetchtableData();
  }
  constructor(private _coreService: CoreService, private checklistservice: CustomervschecklistService, private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private _dialog: MatDialog, private spinnerService: SpinnerService) { }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(AddchecklistComponent) AddchecklistComponent: AddchecklistComponent;

  displayedColumns: string[] = ['shortname', 'description', 'department', 'Action'];

  fetchtableData() {
    this.checklistservice.getEmployeeList().subscribe(data => {
      
      this.dataSource = new MatTableDataSource(data.gCvCList);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openvendor() {
    const dialogRef = this._dialog.open(AddchecklistComponent, {
      height: '70vh',
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchtableData();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddchecklistComponent, {
      height: '70vh',
      width: '50vw',
      data: {
        type: "edit",
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchtableData();
        }
      },
    });
  }

  deleteEmployee(id: number) {
    this.spinnerService.requestStarted();

    this.checklistservice.deleteEmployee(id).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        Swal.fire(
          'Done!',
          'Employee deleted!',
          'success'
        )
        this.fetchtableData();
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


  openViewForm(data: any){
    const dialogRef = this._dialog.open(ViewchecklistComponent, {
     height: '40vh',
     width: '50vw',
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchtableData();
        }
      },
    });
  }
}
