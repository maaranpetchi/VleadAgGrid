import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-informationpopup',
  templateUrl: './informationpopup.component.html',
  styleUrls: ['./informationpopup.component.scss']
})
export class InformationpopupComponent {
  constructor(
    public dialogRef: MatDialogRef<InformationpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) {}

  close(): void {
    this.dialogRef.close();
  }
}
