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

  setData(value: number) {
    this.selectDivisionSource.next(value);
  }
}

