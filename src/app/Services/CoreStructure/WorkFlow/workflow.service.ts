import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  public sharedData: any;

  constructor() { }

    
  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }
  
}