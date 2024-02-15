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
  ///CustomerSalesApproval
  private selectcustomersalesapproval = new BehaviorSubject<number>(0);
  selectcustomersalesapproval$ = this.selectcustomersalesapproval.asObservable();
  private customersalesapprovalrefreshDataSubject = new BehaviorSubject<boolean>(false);

  customersalesapprovalrefreshData$ = this.customersalesapprovalrefreshDataSubject.asObservable();

  customersalesapprovaltriggerRefresh() {
    this.customersalesapprovalrefreshDataSubject.next(true);
  }
  customersalesapprovalsetData(value: number) {
    this.selectcustomersalesapproval.next(value);
  }
  ///CustomerSalesApprovalEdit
  private selectcustomersalesapprovaledit = new BehaviorSubject<number>(0);
  selectcustomersalesapprovaledit$ = this.selectcustomersalesapprovaledit.asObservable();
  private selectcustomersalesapprovaleditrefreshDataSubject = new BehaviorSubject<boolean>(false);

  customersalesapprovaleditrefreshData$ = this.selectcustomersalesapprovaleditrefreshDataSubject.asObservable();

  customersalesapprovaledittriggerRefresh() {
    this.selectcustomersalesapprovaleditrefreshDataSubject.next(true);
  }
  customersalesapprovaleditsetData(value: number) {
    this.selectcustomersalesapprovaledit.next(value);
  }
}

