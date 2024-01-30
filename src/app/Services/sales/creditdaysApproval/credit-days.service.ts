import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { LoginService } from '../../Login/login.service';

@Injectable({
  providedIn: 'root',
})
export class CreditDaysService {
  constructor(private http: HttpClient, private loginservice: LoginService) {}

  checkAdmin(): Observable<any> {
    return this.http.get(
      environment.apiURL +
        `Account/checkIsAdmin/${this.loginservice.getUsername()}`
    );
  }
  checkUserName(): Observable<any> {
    return this.http.get(
      environment.apiURL +
        `Account/getEmployeeProcess/${this.loginservice.getUsername()}`
    );
  }
  getAllApprovals(): Observable<any> {
    let data = {
      // creditDays: 0,
      // remarks: 'string',
      // approvalType: 'string',
      // clientId: 0,
      employeeId:this.loginservice.getUsername(),
      // creditLimit: 0,
    };
    return this.http.post(
      environment.apiURL + `ClientOrderService/GetAllApproval`,
      data
    );
  }
}
