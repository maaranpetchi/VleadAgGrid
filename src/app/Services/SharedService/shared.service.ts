import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sharedData: any;

  constructor() { }

  private selectDivisionSource = new BehaviorSubject<number>(0);
  selectDivision$ = this.selectDivisionSource.asObservable();
  private refreshDataSubject = new BehaviorSubject<boolean>(false);

  refreshData$ = this.refreshDataSubject.asObservable();

  triggerRefresh() {
    this.refreshDataSubject.next(true);
  }
  setData(value: number) {
    this.selectDivisionSource.next(value);
  }
}

