import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { environment } from 'src/Environments/environment';
import { WorkflowService } from 'src/app/Services/CoreStructure/WorkFlow/workflow.service';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
    selector: 'app-actionrendering',
    template: `<a style="color: skyblue;cursor:pointer"> Bulk Upload</a>`,
})
export class bulkuploadrendering implements ICellRendererAngularComp {
    storedProcessId: string | null;

    constructor(private workflowservice:WorkflowService,private http:HttpClient,private loginservice:LoginService,private router:Router){

    }
  public cellValue!: string;

  gettingData: any;
  componentParent: any;
  params: ICellRendererParams<any, any, any>;
  private dialog: MatDialog;

  agInit(params: ICellRendererParams): void {
    this.gettingData = params.data;
    console.log(this.gettingData, "GettingData");
    this.params = params;
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }


  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

}