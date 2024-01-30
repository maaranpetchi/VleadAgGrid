import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../Login/login.service';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProofReadingService {

  
  constructor(private http:HttpClient,private loginservice:LoginService) { }

  getScopeDropdown():Observable<any> {
  return this.http.get(environment.apiURL+`Allocation/getScopeValues/${this.loginservice.getUsername()}`)
  }

  getTabValue1():Observable<any> {
  return this.http.get(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`)
  }
  getTabValue2():Observable<any> {
  return this.http.get(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/2/1`)
  }
  getTabValue3():Observable<any> {
  return this.http.get(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/3/1`)
  }
  getTabValue4():Observable<any> {
  return this.http.get(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/4/1`)
  }
  getTabValue5():Observable<any> {
  return this.http.get(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/5/1`)
  }
  getTabValue6():Observable<any> {
    return this.http.get(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/6/1`) 
   }
  getTabValue7():Observable<any> {
    return this.http.get(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/7/1`) 
   }
}
