import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerService } from '../../Spinner/spinner.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-un-approvaljobs',
  templateUrl: './un-approvaljobs.component.html',
  styleUrls: ['./un-approvaljobs.component.scss']
})
export class UnApprovaljobsComponent implements OnInit {
  constructor(
    private spinner:SpinnerService,
    private http:HttpClient,
    private loginService:LoginService,
    private router:Router
  ){}
  
  ngOnInit(): void {
    this.getPendingJobApproval()
  }

  displayedColumns:string[] = [
    'fileName',
    'po',
    'CustomerName',
    'Instruction',
    'Salespersonname',
    'Jobstatus',
    'action'
  ]

  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openViewForm(data:any){
    // this.http.get(environment.apiURL+`Customer/getpendingapprovaljobs?EmpId=${this.loginService.getUsername()}`).subscribe((response:any) =>{
      this.router.navigate(["topnavbar/view-unapprovalJobs"], {state:{data:data}});
  // })
  }
  getPendingJobApproval(){
    this.spinner.requestStarted();
    this.http.get(environment.apiURL+`Customer/getpendingapprovaljobs?EmpId=${this.loginService.getUsername()}`).subscribe({
      next: (response: any) => {
        this.spinner.requestEnded();
        this.dataSource = new MatTableDataSource(response);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.spinner.resetSpinner();

        console.log(err);
      },
    })
  }
}
// Process/Delete-Process?id=${id}`)