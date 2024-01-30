import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { LoginService } from '../Login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BillingCycleMonthlyService {

  constructor(private http: HttpClient,private loginservice:LoginService) {}


  FormSubmit(payload): Observable<any> {
    // You can customize the headers if needed
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // add more headers as needed
    });

    // Make the API request and observe the response
    return this.http.post(environment.apiURL+'BillingCycleMonthly/Creation', payload, { headers, observe: 'response' });
  }


  public sharedData:any;
  shouldFetchData: boolean = true;
  shouldFetchViewData: boolean = true;


 setData(data: any) {
  this.sharedData = data;
}

getData() {
  return this.sharedData;
}


 setViewData(data: any) {
  this.sharedData = data;
}

getViewData() {
  return this.sharedData;
}

clearData() {
  this.sharedData = null;
}
}
