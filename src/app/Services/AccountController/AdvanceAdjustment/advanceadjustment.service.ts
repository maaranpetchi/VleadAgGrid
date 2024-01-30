import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvanceadjustmentService {
  public departmentoptionapiurl=environment.apiURL+"Customer/GetCustomers";
  
  constructor(private _http: HttpClient) {}

  getdropdownvalues(): Observable<any> {
    return this._http.get(environment.apiURL+`Customer/GetCustomers`);
  }

}
