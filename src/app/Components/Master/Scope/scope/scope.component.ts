import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { ScopeService } from 'src/app/Services/Scope/scope.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss']
})
export class ScopeComponent {

  //  Table view heading
  displayedColumns: string[] = [
    'DepartmentName',
    'Description',
    'action',
  ]

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _scopeService: ScopeService,
    private builder: FormBuilder,
    private router: Router,
    private _coreService: CoreService,
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) { }
  scopeRegistrationForm = this.builder.group({

  });

  ngOnInit() {
    this.listScope()
  }

  listScope() {
    this.spinnerService.requestStarted();
    this._scopeService.getListScope().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(data);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addItem() {
    this.router.navigate(['/topnavbar/master-scopeAdd']);
  }

  openViewForm(data: any) {
    this.spinnerService.requestStarted();
    this.http.get(environment.apiURL + `Scope/GetScopeDetails?Id=${data.id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response: any) => {
      this.spinnerService.requestEnded();
      this.router.navigate(['/topnavbar/master-scope/view'], { state: { data: response } });
    })
  }

  openEditForm(id: any) {
    this.spinnerService.requestStarted();
    this.http.get(environment.apiURL + `Scope/GetScopeDetails?Id=${id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response: any) => {
      this.spinnerService.requestEnded();
      this.router.navigate(["topnavbar/master-scope/edit"], { state: { data: response } });
    })
    //  Below method is used to get data from serice using behaviour subject
    // this.dataSource.filteredData.forEach((data:any)=>{
    //   if(data.id === id){
    //     this._scopeService.setScopeData(data);
    //   }
    // })
  }


  deleteScopeUser(id: number) {
    this.spinnerService.requestStarted();
    this._scopeService.deleteScope(id).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();
        Swal.fire('Done!', 'Employee Deleted', 'success').then((response) => {
          if (response.isConfirmed) {
            this.listScope();
          }
        });
      },
      error: console.log,
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
