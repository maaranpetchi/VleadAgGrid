import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CreditnoteService {

  constructor(private _http: HttpClient) {}
 


  getcustomerdropdown():Observable<any>{

    return this._http.get(environment.apiURL+'Customer/GetCustomers')
  }
  addEmployee(data: any): Observable<any> {
    return this._http.post(environment.apiURL+'Employee/AddEmployee', data);
  }

  updateEmployee(data: any): Observable<any> {
    return this._http.post(environment.apiURL+`Employee/EditEmployee`, data);
  }

  getEmployeeList(): Observable<any> {
     return this._http.get(environment.apiURL+'Receivable/GetAllCreditNotes');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(environment.apiURL+`Employee/PostDeleteEmployee?data=${id}&data1=152`);
  }
}
