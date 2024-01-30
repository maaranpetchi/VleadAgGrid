import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PricingcalculationService  {
  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post(environment.apiURL+'Employee/AddEmployee', data);
  }

  updateEmployee(employeeId: number, data: any): Observable<any> {
    return this._http.put(environment.apiURL+`Employee/EditEmployee/${employeeId} `, data);
  }

  getEmployeeList(): Observable<any> {

     return this._http.get('');
    // return fetch('https://localhost:7208/api/Employee/GetEmployeeList').then(res => res.json());
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.post(environment.apiURL+'CustomerVsEmployee/DeleteCustomerVsEmpById',{id:id});
  }
}
