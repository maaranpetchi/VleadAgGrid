import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { LoginService } from '../Login/login.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

   public sharedData:any;
   shouldFetchData: boolean = true;
   shouldFetchViewData: boolean = true;
  constructor(private _http: HttpClient,private loginservice:LoginService) {}
 
 

  addEmployee(data: any): Observable<any> {
    return this._http.post(environment.apiURL+'Employee/AddEmployee', data);
  }

  updateEmployee(data: any): Observable<any> {
    //  // Set the request headers
    //  const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this._http.post(environment.apiURL+`Employee/EditEmployee`, data);
  }

  getEmployeeList(): Observable<any> {

     return this._http.get(environment.apiURL+'Employee/GetEmployee');
  }


  

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(environment.apiURL+`Employee/PostDeleteEmployee?data=${id}&data1=${this.loginservice.getUsername()}`);
  }


  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }
  
  
  
  
  
  setViewData(data: any) {
    this.sharedData = data;
  }

  getViewData() {
    return this.sharedData;
  }

  clearData() {
    this.sharedData = null;
  }

}
