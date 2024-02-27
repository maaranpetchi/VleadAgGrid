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
import { CustomerVSEmployeeService } from 'src/app/Services/CustomerVSEmployee/customer-vsemployee.service';
import { EditService } from 'src/app/Services/Displayorhideform/edit-service.service';
import { UserMasterService } from 'src/app/Services/Master/user-master.service';
import { BenchStatusService } from 'src/app/Services/Benchstatus/bench-status.service';
import { WorkflowService } from 'src/app/Services/CoreStructure/WorkFlow/workflow.service';

@Component({
  selector: 'app-customernormsrendering',
  template: `
    <div class="actionbutton">

    <span class="total-value-renderer">
      <i class="fa fa-edit" matTooltip="edit" style="cursor: pointer;color:green" (click)=" EditButton(params)"></i>
    </span>
   
</div>
  `,
  styles: [`.actionbutton {
        display: flex;
        gap: 13px;
    }`]
})
export class jobfilerenderingcomponent implements ICellRendererAngularComp {

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
    private viewDataService: EditService,
    private usermasterservice: UserMasterService,
    private benchstatusservice: BenchStatusService,
    private workflowservice: WorkflowService
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

    this.customerSalesApprovalContext = params.context.context;
    this.customerSalesApprovalCustomerId = params.context.CustomerId;

    console.log(this);

    ///EmployeeVSSKillsetEdit
    if (this.Context == 'jobFilesLocation') {
      this.jobFileEdit(params)
    }
   
  }
  jobFileEdit(params){
    this.http.get<any>(environment.apiURL + `Customer/CustomerJobLocUpdate?id=${params.data.id}`).subscribe(results => {
        this.viewDataService.setViewData(params.data);
        let sendData = this.viewDataService.setViewData(params.data);
        console.log(sendData, "Customersalesapproval");
        this.viewDataService.triggerEdit();
    
      }
      )
  }




  
  ////////////////////billingCycleMonthly//////////////////////////
}