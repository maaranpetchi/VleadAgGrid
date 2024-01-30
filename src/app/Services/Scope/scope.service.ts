import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../Login/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScopeService {

  constructor(private _http: HttpClient, private loginservice: LoginService) { }
  public content =new BehaviorSubject('');
  getListScope(): Observable<any>{
    return this._http.get(environment.apiURL+'Scope/ListScope')
  }
  // update Scope .
  updateScope(id:any): Observable<any>{
   return this._http.post(environment.apiURL+`Scope/Update-Scope`, id)
  }
  // list of Scopes.
  listScopes(): Observable<any>{
    return this._http.get(environment.apiURL+'Scope/GetDropDownList')
  }
  //  Delete the Scope.
  deleteScope(id:number):Observable<any>{
    return this._http.get(environment.apiURL+`Scope/Delete-Scope?Id=${id}`)
  }
  getScopeData() {
    return this.content.asObservable(); 
 }

 setScopeData(data: any) {
    this.content.next(data);
 }
}
