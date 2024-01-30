import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { ErrorCategoryService } from 'src/app/Services/Errorcategory/error-category.service';

@Component({
  selector: 'app-error-category',
  templateUrl: './error-category.component.html',
  styleUrls: ['./error-category.component.scss']
})
export class ErrorCategoryComponent implements OnInit{

  //  Table view heading
  displayedColumns:string[] = [
    'DepartmentName',
    'Description',
    'action',
  ]

  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router:Router,
    private builder: FormBuilder,
    private _service:ErrorCategoryService,
    private http :HttpClient,
    private _coreService: CoreService
  ){}
  
  ngOnInit(): void {
    this.getErrorCategory();
  }

  scopeRegistrationForm = this.builder.group({})

  getErrorCategory(){
    this._service.getErrorCategoryList().subscribe({
      next:(data)=>{
        this.dataSource = new MatTableDataSource(data);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(err:any) => {
        console.log(err);
      }
    })
  }

  addItem(){
    this.router.navigate(['/topnavbar/error-Categoryadd']);
  }

  openViewForm(data:any){
    this.http.get(environment.apiURL+`ErrorCategory/GetErrorCategoryDetails?Id=${data.id}`).subscribe((response:any) =>{
    this.router.navigate(['/topnavbar/error-Categoryview'], {state:{data:response}});
  })
  }
  openEditForm(id:any){
    this.http.get(environment.apiURL+`ErrorCategory/GetErrorCategoryDetails?Id=${id}`).subscribe((response:any) =>{
    this.router.navigate(['/topnavbar/error-Categoryedit'], {state:{data:response}});
  })
  }

  deleteScopeUser(id:number){
    this._service.deleteErrorCategoryDetails(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar('Error Category deleted!', 'done');
        if(res.status === 'success'){
          this.getErrorCategory();
        }
        window.location.reload();
      },
      error:(err:any)=>{
        console.log(err);
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
