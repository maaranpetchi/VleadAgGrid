import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private currentUserUrl = environment.apiURL+'Employee/GetEmployeeList';

  private userchangepassword =environment.apiURL+'Account/ChangePassword';

  constructor(private http: HttpClient) { }


changepassword(userId:number,oldPassword:string,latestPassword:string,conformPassword:string){
  return this.http.post<any>(`${this.userchangepassword}`,{userId,oldPassword,latestPassword,conformPassword});
}


  logout(): Observable<any> {
    return this.http.get(environment.apiURL+'Account/logout', {});
  }
 

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.currentUserUrl,);
  }

}
