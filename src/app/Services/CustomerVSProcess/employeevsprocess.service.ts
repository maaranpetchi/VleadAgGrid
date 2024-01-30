
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../Login/login.service';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeevsprocessService {
  public departmentoptionapiurl=environment.apiURL+"CustomerVsProcess/GetAllddlList";
  
  constructor(private _http: HttpClient, private loginservice:LoginService) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post(environment.apiURL+'Employee/AddEmployee', data);
  }

  updateEmployee(employeeId: number, data: any): Observable<any> {
    return this._http.put(environment.apiURL+`Employee/EditEmployee/${employeeId}`, data);
  }

  getEmployeeList(): Observable<any> {

     return this._http.get(environment.apiURL+'CustomerVsProcess/CustomerVsProcess');
    // return fetch(environment.apiURL+'Employee/GetEmployeeList').then(res => res.json());
  }
  getOptions(): Observable<any[]> {
    return this._http.get<any[]>(this.departmentoptionapiurl);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.get(environment.apiURL+`CustomerVsProcess/DeleteProcessworkflow?Id=${id}&EmployeeId=${parseInt(this.loginservice.getUsername())}`);
  }


  changeapi(data):Observable<any>{
   return  this._http.post<any>(environment.apiURL+'CustomerVsProcess/GetScopeList', data)
  }
}
