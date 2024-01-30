import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-actions-cell-renderer',
  template: `
    <span class="total-value-renderer">
      <i class="fa fa-share-square" matTooltip="Convert" style="cursor: pointer;color:green" (click)="buttonClicked()"></i>
    </span>
    <span class="total-value-renderer">
      <i class="fa fa-eye" matTooltip="View" style="cursor: pointer;color:green" (click)="viewButton()"></i>
    </span>
  `,
  styleUrls: ['./actions-cell-renderer.component.scss']
})
export class ActionsCellRendererComponent implements ICellRendererAngularComp {
  gettingData: any;
  componentParent: any;
  params: ICellRendererParams<any, any, any>;

  constructor(private sharedService: SharedService) {}
  iconClicked: boolean = false;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.gettingData = params.data;
    console.log(this.gettingData,"GettingData");
    this.params = params;



  }


  refresh(params: ICellRendererParams) {
    return false;
  }

  buttonClicked() {
    alert(` medals won!`);
  }

  viewButton() {
    // Set the flag to true when the icon is clicked
    this.iconClicked = true;

    this.sharedService.selectDivision$.subscribe((selectdivision) => {
      if (this.iconClicked) {
        if (selectdivision === 0) {
          alert('Please select a division');
        } else {
          alert('Action performed successfully');
          // Reset the flag after the action is performed
        }
        this.iconClicked = false;

      }
    });
  }
}