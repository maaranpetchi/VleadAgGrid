import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-actions-cell-renderer',
  template: `
    <span class="total-value-renderer">
      <i class="fa fa-share-square" matTooltip="Convert" style="cursor: pointer;color:green" (click)="buttonClicked()"></i>
    </span>
    <span class="total-value-renderer">
      <i class="fa fa-eye" matTooltip="View" style="cursor: pointer;color:green" (click)="buttonClicked()"></i>
    </span>
  `,
  styleUrls: ['./actions-cell-renderer.component.scss']
})
export class ActionsCellRendererComponent implements ICellRendererAngularComp {
  gettingData: any;


  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.gettingData = params.data;
    console.log(this.gettingData,"GettingData");
    
  }

  refresh(params: ICellRendererParams) {
    return false;
  }

  buttonClicked() {
    alert(` medals won!`);
  }
}