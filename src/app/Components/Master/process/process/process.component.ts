import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { ProcessService } from 'src/app/Services/Process/process.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit{


  displayedColumns:string[] = [
    'Name',
    'ShortName',
    'Description', 
    'IsActive',
    'Action' 
  ]

  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _service:ProcessService,
    private route:Router,
    private _coreService:CoreService,
    private http:HttpClient,
    private spinnerService:SpinnerService
  ){}
  
  ngOnInit(): void {
    this.getListProcess()
  }

  getListProcess(){
    this.spinnerService.requestStarted();
    this._service.getProcessList().pipe(catchError((error) => {
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


  addItem(){
    this._service.setFormData(null);
    this.route.navigate(['/topnavbar/process-addEdit'])
  }


  openViewForm(data:any){
    this.spinnerService.requestStarted();
    this.http.get(environment.apiURL+`Process/ProcessDetails?Id=${data.id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response:any) =>{
      this.spinnerService.requestEnded();

    this.route.navigate(['/topnavbar/process-view'], {state:{data:response}});
  })
}
  openEditForm(id:any){
    this._service.setFormData(id);
    this.spinnerService.requestStarted();

    this.http.get(environment.apiURL+`Process/ProcessDetails?Id=${id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response:any) =>{
      this.spinnerService.requestEnded();

      this.route.navigate(['/topnavbar/process-addEdit'], {state:{data:response}});
  })
  }



  deleteScopeUser(id:any){        this.spinnerService.requestStarted();

    this._service.deleteProcess(id).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (response) => {
        this.spinnerService.requestEnded();

        if(response === true){
        this._coreService.openSnackBar('Process deleted!', 'done');
        window.location.reload()
        }
        else{
        this._coreService.openSnackBar('Failed!', 'done');
        }
        this.getListProcess();
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
