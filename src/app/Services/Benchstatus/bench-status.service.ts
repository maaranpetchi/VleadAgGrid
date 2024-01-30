import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BenchStatusService {

  constructor( 
    private http: HttpClient
  ) { }

  viewBenchStatusDescription():Observable<any>{
    return this.http.get(environment.apiURL+'Scope/ListofBenchStatus')
  }
  // Delete Bench Status
   deleteBenchStatusDescription(id:any):Observable<any>{
    return this.http.get(environment.apiURL+`Scope/DeleteBenchStatus?id=${id}`)
   }
  //  Edit Bench Status
  editBenchStatus(id:any):Observable<any>{
    return this.http.get(environment.apiURL+`Scope/GetEditBenchStatus?id=${id}`)
  }
  //  Update Bench Status
  updateBenchStatus(id:any):Observable<any>{
    return this.http.post(environment.apiURL+`Scope/UpdateBenchStatus`, id)
  }
}
