import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditService {
  private editFormVisible$ = new BehaviorSubject<boolean>(false);
  editFormVisible = this.editFormVisible$.asObservable();

  showEditForm() {
    this.editFormVisible$.next(true);
  }

  hideEditForm() {
    this.editFormVisible$.next(false);
  }



  private viewData: any;
  setViewData(data: any) {
    this.viewData = data;
  }

  getViewData() {
    return this.viewData;
  }


  private editTriggeredSource = new Subject<void>();

  editTriggered$ = this.editTriggeredSource.asObservable();

  triggerEdit() {
    this.editTriggeredSource.next();
  }
}
