import { HttpClient } from '@angular/common/http';
import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { ClientorderviewComponent } from '../../TopToolbarComponents/ClientCordination/ClientOrder/clientorderview/clientorderview.component';
import { EmployeevsskillsetService } from 'src/app/Services/EmployeeVsSkillset/employeevsskillset.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import { AddchecklistComponent } from '../../CustomerVSChecklist/addchecklist/addchecklist.component';
import { CustomervschecklistService } from 'src/app/Services/CustomerVSChecklist/customervschecklist.service';
import { ViewchecklistComponent } from '../../CustomerVSChecklist/viewchecklist/viewchecklist.component';
import { EmployeeService } from 'src/app/Services/EmployeeController/employee.service';
import { EmpvsdivService } from 'src/app/Services/EmployeeVSDivision/empvsdiv.service';
import { EmployeevsprocessService } from 'src/app/Services/CustomerVSProcess/employeevsprocess.service';

@Component({
  selector: 'app-delete-action-rendering',
  templateUrl: './delete-action-rendering.component.html',
  styleUrls: ['./delete-action-rendering.component.scss']
})
export class DeleteActionRenderingComponent implements ICellRendererAngularComp {

  gettingData: any;
  componentParent: any;
  params: ICellRendererParams<any, any, any>;
  private dialog: MatDialog;
  Context: any;

  constructor(private sharedService: SharedService, private injector: Injector, private spinnerService: SpinnerService, private http: HttpClient, private loginservice: LoginService, private empvsdivservice: EmpvsdivService, private router: Router, private sharedDataService: SharedService, private _dialog: MatDialog, private checklistservice: CustomervschecklistService, private employeeservice: EmployeeService,
    private empvsprocesssservice: EmployeevsprocessService,
 
    ) { }
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



  deleteButton(params) {
    this.iconClicked = true;
    let viewData = params.data;
    console.log(viewData, "ViewData");
    this.Context = params.context;
    console.log(this.Context, "params");


    ///EmployeeVSDivision
    if (this.Context == 'EmployeeVsDivision') {
      this.empvsdivdelete(params)
    }

    ///customervsprocess
    if (this.Context == 'customervsprocess') {
      this.customervsprocessDelete(params)
    }
    
  }
/////////EmployeeVSDivision Delete//////////////
  empvsdivdelete(params){
    this.spinnerService.requestStarted();
    this.empvsdivservice.deleteEmployee(params.data.id).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        Swal.fire('Done!', 'Division deleted successfully', 'success').then((response) => {
          if (response.isConfirmed) {
            this.sharedDataService.triggerRefresh();

          }
        });
      },
      error: console.log,
    });
  }


  //////////////////////customervsproces//////////////////////
  customervsprocessDelete(params){
    console.log(params,"Parameter");
    
    this.spinnerService.requestStarted();
    this.empvsprocesssservice.deleteEmployee(params.data.id).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();
        this.empvsprocesssservice.changeapi({
          "customerId": this.gettingData.customerId ? this.gettingData.customerId: 0,
           "deptId": this.gettingData.departmentId ? this.gettingData.departmentId:0,
          "customerJobType": this.gettingData.customJobType,
        }).subscribe(data => {
          this.sharedDataService.triggerRefresh();
        })

      },
      error: console.log,
    });
  }
}