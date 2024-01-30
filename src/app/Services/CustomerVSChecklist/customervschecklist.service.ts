import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomervschecklistService {

  constructor(private http:HttpClient) { }

  getEmployeeList(): Observable<any> {

    return this.http.get(environment.apiURL+'CustomerVsChecklist/CustomerVsChecklist');
   // return fetch(environment.apiURL+'Employee/GetEmployeeList').then(res => res.json());
 }
  

 deleteEmployee(id: number): Observable<any> {
  return this.http.get(environment.apiURL+`CustomerVsChecklist/Delete-Check?id=${id}`);
}
}
