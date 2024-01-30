import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItassetsService {

  private sharedData: any;
  shouldFetchData: boolean = true;
  constructor() { }

  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }

  clearData() {
    this.sharedData = null;
  }

  deleteEmployee(){
    
  }

}
