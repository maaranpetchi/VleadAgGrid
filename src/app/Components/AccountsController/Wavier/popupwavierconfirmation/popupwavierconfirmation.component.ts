import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popupwavierconfirmation',
  templateUrl: './popupwavierconfirmation.component.html',
  styleUrls: ['./popupwavierconfirmation.component.scss']
})
export class PopupwavierconfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupwavierconfirmationComponent>,
    @Inject(MAT_DIALOG_DATA)  public message: string) {}

  close(): void {
    this.dialogRef.close();
  }
}
