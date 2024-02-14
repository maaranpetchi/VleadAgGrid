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
import { ItassetsService } from 'src/app/Services/ITAssets/itassets.service';
import { AddEditCustomerVSEmployeeComponent } from '../../CustomerController/CustomerVSEmployee/add-edit-customer-vsemployee/add-edit-customer-vsemployee.component';
import { CustomerVSEmployeeService } from 'src/app/Services/CustomerVSEmployee/customer-vsemployee.service';

@Component({
    selector: 'app-customernormsrendering',
    template: `
    <div class="actionbutton">

    <span class="total-value-renderer">
      <i class="fa fa-edit" matTooltip="edit" style="cursor: pointer;color:green" (click)=" EditButton(params)"></i>
    </span>
    <span class="total-value-renderer">
      <i class="fa fa-trash-o" matTooltip="delete" style="cursor: pointer;color:green" (click)="DeleteButton(params)"></i>
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
    Context: any;

    constructor(private sharedService: SharedService,
     private injector: Injector, private spinnerService: SpinnerService, private http: HttpClient, private loginservice: LoginService, 
     private sharedDataService: SharedService,private _empService:CustomerNormsService,private router:Router,
      private ITAssetService:ItassetsService  ,
      private customervsemployeeservice:CustomerVSEmployeeService,
        
        ) { 

        }
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



    EditButton(params) {
        // Set the flag to true when the icon is clicked
        this.iconClicked = true;
        let viewData = params.data;
        console.log(viewData, "ViewData");
        this.Context = params.context;
        console.log(this.Context, "params");
        ///EmployeeVSSKillsetEdit
        if (this.Context == 'CustomerNorms') {
          this.CustomerNormsedit(params)
        }
        //ITASSET
        if (this.Context == 'ITASSET') {
          this.ITASSETedit(params)
        }
        //customervsemployee
        if (this.Context == 'customervsemployee') {
          this.customervsemployeeEdit(params)
        }
        //
    }
    DeleteButton(params) {
        // Set the flag to true when the icon is clicked
        this.iconClicked = true;
        let viewData = params.data;
        console.log(viewData, "ViewData");
        this.Context = params.context;
        console.log(this.Context, "params");
        ///EmployeeVSSKillsetEdit
        if (this.Context == 'CustomerNorms') {
          this.CustomerNormsDelete(params)
        }
        //ITASSET
        if (this.Context == 'ITASSET') {
            this.ITASSETDelete(params)
          }
        //customervsemployee
        if (this.Context == 'customervsemployee') {
            this.customervsemployeeDelete(params)
          }
    }




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


    //////////////////////////ITASSET Started///////////////////////////////////////

  
  ITASSETedit(params){
    let payload = {
        "id": this.gettingData.id,
      }
      this.http.post<any>(environment.apiURL + `ITAsset/nGetEditedITAsset`,payload).subscribe(results => {
        this.ITAssetService.setData({ type: 'EDIT', data: results });
        this.ITAssetService.shouldFetchData = true;
  
        this.router.navigate(['/topnavbar/addITAsset']);
      });
  }


  ITASSETDelete(params){

    let payload = {
        "id": this.gettingData.id
      }
      this.http.post<any>(environment.apiURL + `ITAsset/nDeleteITHAsset`, payload).subscribe({
        next: (res) => {
            Swal.fire(
                'Deleted!',
                'Data deleted successfully!',
                'success'
              ).then((response) => {
               if (response.isConfirmed) {
                 this.sharedDataService.triggerRefresh();
               }
             })
        }
      });
  }
  //////////////////////////ITASSET Ended///////////////////////////////////////






  /////////////////////////////customervsemployee started//////////////////////////
  customervsemployeeEdit(params){
    const dialogRef = this.dialog.open(AddEditCustomerVSEmployeeComponent, {
      height: '70vh',
      width: '140vw',
      data:params.data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.sharedDataService.triggerRefresh();
        }
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
  customervsemployeeDelete(params){
    this.spinnerService.requestStarted();

    this.customervsemployeeservice.deleteEmployee(this.gettingData.id).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();
        Swal.fire(
          'Done!',
          'Employee Deleted !',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.sharedDataService.triggerRefresh();
          }
        });


      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    });
  }
  /////////////////////////////customervsemployee Ended//////////////////////////

}