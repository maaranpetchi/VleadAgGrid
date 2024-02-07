import { Component, Injector, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import Swal from 'sweetalert2';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { catchError } from 'rxjs';
import { CustomerNormsService } from 'src/app/Services/CustomerNorms/customer-norms.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customernormsrendering',
    template: `
    <div class="actionbutton">

    <span class="total-value-renderer">
      <i class="fa fa-edit" matTooltip="edit" style="cursor: pointer;color:green" (click)=" CustomerNormsedit(params)"></i>
    </span>
    <span class="total-value-renderer">
      <i class="fa fa-trash-o" matTooltip="delete" style="cursor: pointer;color:green" (click)=" CustomerNormsDelete(params)"></i>
    </span>
</div>
  `,
    styles: [`.actionbutton {
        display: flex;
        gap: 13px;
    }`]
})
export class customernormsrenderingcomponent implements ICellRendererAngularComp {

    gettingData: any;
    componentParent: any;
    params: ICellRendererParams<any, any, any>;
    private dialog: MatDialog;

    constructor(private sharedService: SharedService, private injector: Injector, private spinnerService: SpinnerService, private http: HttpClient, private loginservice: LoginService, private sharedDataService: SharedService,private _empService:CustomerNormsService,private router:Router) { }
    iconClicked: boolean = false;
    // gets called once before the renderer is used
    agInit(params: ICellRendererParams): void {
        this.gettingData = params.data;
        console.log(this.gettingData, "GettingData");
        this.params = params;
        this.dialog = this.injector.get(MatDialog);


    }


   
    refresh(params: ICellRendererParams) {
        return false;
    }
    selectedJobs: any[] = [];
    selectedQuery: any[] = [];




/////////////////////////////CustomerNorms Started///////////////////////////////////
CustomerNormsedit(params){
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `CustomerVsEmployee/GetCustomerNormsById?Id=${this.gettingData.id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next:(results) => {
      this.spinnerService.requestEnded();
      this._empService.setData({ type: 'EDIT', data: results });
      this._empService.shouldFetchData = true;
      this.router.navigate(['/topnavbar/updatecustomerNorms']);
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
  
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }
  
  CustomerNormsDelete(params){
    this.spinnerService.requestStarted();
    let payload={Id:this.gettingData.id}
  this.http.post<any>(environment.apiURL+`CustomerVsEmployee/DeleteCustomerNormById`,payload).pipe(catchError((error) => {
   this.spinnerService.requestEnded();
   return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
  })).subscribe({
     next: (res) => {
       this.spinnerService.requestEnded();
  
       Swal.fire(
         'Deleted!',
         'Data deleted successfully!',
         'success'
       ).then((response) => {
        if (response.isConfirmed) {
          this.sharedDataService.triggerRefresh();
  
        }
      })
     },
     error: (err) => {
       this.spinnerService.resetSpinner(); // Reset spinner on error
       console.error(err);
  
       Swal.fire(
         'Error!',
         'An error occurred !.',
         'error'
       );
     }
   });
  }
  
  /////////////////////////////CustomerNorms Ended///////////////////////////////////
  

}