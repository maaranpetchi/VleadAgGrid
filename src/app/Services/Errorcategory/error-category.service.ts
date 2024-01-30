import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorCategoryService {

  constructor(private http :HttpClient) { }


  // List of errorsCategoryService
  getErrorCategoryList(): Observable<any> {
    return this.http.get(environment.apiURL+'ErrorCategory/ListErrorCategory')
  }

  // ErrorCategoryLists
  getCategoryList(): Observable<any> {
    return this.http.get(environment.apiURL+'Scope/GetDropDownList')
  }

  //  ErrorCategory Details 
  getErrorCategoryDetails(id:any): Observable<any>{
    return this.http.get(environment.apiURL+`ErrorCategory/GetErrorCategoryDetails?Id= ${id}`)
  }
  // Update error category.
  updateErrorCategory(id:any):Observable<any>{
    return this.http.post(environment.apiURL+'ErrorCategory/Update-ErrorCategory' , id)
  }

   //Delete ErrorCategory
  deleteErrorCategoryDetails(id:any):Observable<any>{
    return this.http.get(environment.apiURL+`ErrorCategory/Delete-ErrorCategory?Id= ${id}`)
  }
}
