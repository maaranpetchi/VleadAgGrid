import { HttpClient } from '@angular/common/http';
import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CustomerreceiptsService } from 'src/app/Services/AccountController/CustomerReceipts/customerreceipts.service';
import { CustomervschecklistService } from 'src/app/Services/CustomerVSChecklist/customervschecklist.service';
import { EmployeevsprocessService } from 'src/app/Services/CustomerVSProcess/employeevsprocess.service';
import { EmployeeService } from 'src/app/Services/EmployeeController/employee.service';
import { EmpvsdivService } from 'src/app/Services/EmployeeVSDivision/empvsdiv.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-view-action-rendering',
  templateUrl: './view-action-rendering.component.html',
  styleUrls: ['./view-action-rendering.component.scss']
})
export class ViewActionRenderingComponent implements ICellRendererAngularComp {

  gettingData: any;
  componentParent: any;
  params: ICellRendererParams<any, any, any>;
  private dialog: MatDialog;
  Context: any;

  constructor(private sharedService: SharedService, private injector: Injector, private spinnerService: SpinnerService, private http: HttpClient, private loginservice: LoginService, private empvsdivservice: EmpvsdivService, private router: Router, private sharedDataService: SharedService, private _dialog: MatDialog, private checklistservice: CustomervschecklistService, private employeeservice: EmployeeService, private _empService:CustomerreceiptsService) { }
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



  viewButton(params) {
    this.iconClicked = true;
    let viewData = params.data;
    console.log(viewData, "ViewData");
    this.Context = params.context;
    console.log(this.Context, "params");


    ///customerreceipts
    if (this.Context == 'customerreceipts') {
      this.customerreceiptsview(params)
    }

  }
  customerreceiptsview(params){
    this.http.get<any>(environment.apiURL + `Receivable/GetReceivableById?receivableId=${params.data.id}`).subscribe(results => {
      this._empService.setData({ type: 'View', data: results });
      this._empService.shouldFetchData = true;
      this.router.navigate(['/topnavbar/acc-viewcustomer']);

    })
  }
}