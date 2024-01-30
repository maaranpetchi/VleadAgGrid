import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
