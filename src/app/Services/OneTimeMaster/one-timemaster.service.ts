import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OneTimemasterService {

  constructor(
    private http:HttpClient
  ) { }

  //  Create oneTimemasterService
  oneTimemasterService(id:any):Observable<any>{
    return this.http.post(environment.apiURL+`SingleEntry/postSingleEntryData`, id)
  }
  // getTable Value
  getTableValue(id:any):Observable<any>{
    return this.http.get(environment.apiURL+`SingleEntry/getTableValue?tableName=${id}`)
  }
}
