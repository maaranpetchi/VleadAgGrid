import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobTransferService {
  constructor(private http: HttpClient) {}

  getJobTransferDetails(): Observable<any> {
    return this.http.get(environment.apiURL+'JobTransfer/Clients');
  }
  jobOrderDetails(data:any): Observable<any>{
    return this.http.post(environment.apiURL+'JobTransfer/JobOrderDetails', data);
  }
}
// updateBenchStatus(id:any):Observable<any>{
//   return this.http.post(`https://localhost:7208/api/Scope/UpdateBenchStatus`, id)
// }
// }
