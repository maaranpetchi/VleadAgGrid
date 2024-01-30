import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CustomerreceiptsService {
  public sharedData:any;
  shouldFetchData: boolean = true;

  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post(environment.apiURL+'Employee/AddEmployee', data);
  }

  updateEmployee(employeeId: number, data: any): Observable<any> {
    return this._http.put(environment.apiURL+`Employee/EditEmployee/${employeeId}`, data);
  }

  getEmployeeList(): Observable<any> {

     return this._http.get(environment.apiURL+'Receivable/GetAllReceivables');
    // return fetch('https://localhost:7208/api/Employee/GetEmployeeList').then(res => res.json());
  }


  

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(environment.apiURL+`Employee/PostDeleteEmployee?data=${id}&data1=152`);
  }

  
  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }
  
  
}
