import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { BenchStatusService } from 'src/app/Services/Benchstatus/bench-status.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bench-status',
  templateUrl: './bench-status.component.html',
  styleUrls: ['./bench-status.component.scss'],
})
export class BenchStatusComponent implements OnInit {
  editDescription: string = '';
  responseData: any;

  //  Table view heading
  displayedColumns: string[] = ['BenchStatus', 'Action'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loginservice: LoginService,
    private _service: BenchStatusService,
    private _coreService: CoreService,// private modalService: NgbModal
    private spinnerService: SpinnerService
  ) { }
  ngOnInit(): void {
    this.viewBenchStatus();
    this.responseData = history.state.data;
  }

  viewBenchStatus() {
    this.spinnerService.requestStarted();
    this._service.viewBenchStatusDescription().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(data);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  id: any;
  openEditForm(row: any) {
    this.spinnerService.requestStarted();

    this._service.editBenchStatus(row).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response: any) => {
      this.spinnerService.requestEnded();
      this.editDescription = response.description;
      this.id = response.id;
    });
  }

  deleteBenchStatus(id: any) {
    this.spinnerService.requestStarted();

    this._service.deleteBenchStatusDescription(id).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();
        Swal.fire('Done!', 'Data deleted Successfully', 'success');
        if (res.status === 'success') {
          this.viewBenchStatus();
        }
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  upateChanges() {

    let updateData = {
      id: this.id,
      description: this.editDescription,
      division: 'string',
      createdBy: this.loginservice.getUsername(),
      createdUtc: new Date().toISOString(),
      updatedBy: this.loginservice.getUsername(),
      updatedUtc: null,
      isDeleted: false,
    };
    this.spinnerService.requestStarted();

    this._service.updateBenchStatus(updateData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (response) => {
        this.spinnerService.requestEnded();

        if (response.message === "Updated Bench Status Successfully....!") {
          Swal.fire('Donr!', 'Updated Bench Status Successfully', 'success').then((response) => {
            if (response.isConfirmed) {
              this.viewBenchStatus();
            }
          });
          // window.location.reload();
        }
        else {
          return
        }
      },
      error: (err) => {
        throw new Error('API Error', err);

      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
