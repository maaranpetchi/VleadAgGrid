import { HttpClient } from '@angular/common/http';
import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CustomerNormsService } from 'src/app/Services/CustomerNorms/customer-norms.service';
import { CustomerVSEmployeeService } from 'src/app/Services/CustomerVSEmployee/customer-vsemployee.service';
import { ItassetsService } from 'src/app/Services/ITAssets/itassets.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customersales-rendering',
  templateUrl: './customersales-rendering.component.html',
  styleUrls: ['./customersales-rendering.component.scss']
})
export class CustomersalesRenderingComponent implements ICellRendererAngularComp {

  gettingData: any;
  componentParent: any;
  params: ICellRendererParams<any, any, any>;
  private dialog: MatDialog;
  Context: any;
  customerSalesApprovalContext: any;
  customerSalesApprovalCustomerId: any;

  constructor(private sharedService: SharedService,
    private injector: Injector, private spinnerService: SpinnerService, private http: HttpClient, private loginservice: LoginService,
    private sharedDataService: SharedService, private _empService: CustomerNormsService, private router: Router,
    private ITAssetService: ItassetsService,
    private customervsemployeeservice: CustomerVSEmployeeService,

  ) {

  }
  iconClicked: boolean = false;
  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    console.log(params, "Getting Params");

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


    //customersalesapproval
    if (this.Context == "customersalesapproval") {
      this.customersalesapprovaledit(params)
    }
  }
  DeleteButton(params) {
    // Set the flag to true when the icon is clicked
    this.iconClicked = true;
    let viewData = params.data;
    console.log(viewData, "ViewData");
    this.Context = params.context;
    console.log(this.Context, "params");

    //customersalesapproval
    if (this.Context == "customersalesapproval") {
      this.customersalesapprovaldelete(params)
    }

  }



  customersalesapprovaledit(params) {
    this.spinnerService.requestStarted();
    let payload = {
      "id": params.data.id,
      "customerJobType": "Live",
      "updatedBy": this.loginservice.getUsername()
    }
    this.http.post<any>(environment.apiURL + `CustomerMapping/EditCustomerVsScope`,payload).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        Swal.fire('Done', 'Status Updated Successfully', 'success').then((res) => {
          if (res.isConfirmed) {
            this.sharedDataService.triggerRefresh();
          }
        })
      }
    });
  }

  customersalesapprovaldelete(params) {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `CustomerMapping/RemoveCustomerScope?custScopeId=${params.data.id}`).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        Swal.fire('Done', 'Employee Deleted Successfully', 'success').then((res) => {
          if (res.isConfirmed) {
            this.sharedDataService.triggerRefresh();
          }
        })
      }
    });
  }



}