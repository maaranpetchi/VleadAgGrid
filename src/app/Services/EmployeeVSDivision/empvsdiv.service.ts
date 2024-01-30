import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpvsdivService {

  constructor(private _http: HttpClient) {}

  private apiUrl = 'https://example.com/api';

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(environment.apiURL+'EmployeeVsDivision/GetEmployeeVsDivision');
  }


  

  deleteEmployee(id: number): Observable<any> {
    return this._http.post(environment.apiURL+`EmployeeVsDivision/DeleteEmployeeVsDivision/`,{
      Delete:id
    });
  }
}
