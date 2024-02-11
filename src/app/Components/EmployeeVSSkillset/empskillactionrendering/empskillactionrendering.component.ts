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

@Component({
  selector: 'app-empskillactionrendering',
  templateUrl: './empskillactionrendering.component.html',
  styleUrls: ['./empskillactionrendering.component.scss']
})
export class EmpskillactionrenderingComponent implements ICellRendererAngularComp {

  gettingData: any;
  componentParent: any;
  params: ICellRendererParams<any, any, any>;
  private dialog: MatDialog;
  Context: any;

  constructor(private sharedService: SharedService, private injector: Injector, private spinnerService: SpinnerService, private http: HttpClient, private loginservice: LoginService, private _empService: EmployeevsskillsetService, private router: Router, private sharedDataService: SharedService, private _dialog: MatDialog, private checklistservice: CustomervschecklistService, private employeeservice: EmployeeService) { }
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
    // Set the flag to true when the icon is clicked
    this.iconClicked = true;
    let viewData = params.data;
    console.log(viewData, "ViewData");
    this.Context = params.context;
    console.log(this.Context, "params");
    ///EmployeeVSSKillsetEdit
    if (this.Context == 'EmployeeVSSkillset') {
      this.employeevsskillsetview()
    }
    if (this.Context == 'CustomerVSChecklist') {
      this.CustomerVSChecklistview()
    }

    if (this.Context == 'employee') {
      this.viewEmployee(params);
    }


  }


  editbutton(params) {
    this.iconClicked = true;
    let viewData = params.data;
    console.log(viewData, "ViewData");
    this.Context = params.context;
    console.log(this.Context, "params");
    ///EmployeeVSSKillsetEdit
    if (this.Context == 'EmployeeVSSkillset') {
      this.employeevsskillsetedit()
    }
    //CustomerVSChecklist
    if (this.Context == 'CustomerVSChecklist') {
      this.CustomerVSChecklistedit()
    }
    if (this.Context == 'employee') {
      this.openEmployeeEditForm(params);
    }



  }


  deleteButton(params) {
    this.iconClicked = true;
    let viewData = params.data;
    console.log(viewData, "ViewData");
    this.Context = params.context;
    console.log(this.Context, "params");


    ///EmployeeVSSKillsetEdit
    if (this.Context == 'EmployeeVSSkillset') {
      this.employeevsskillsetDelete()
    }
    //CustomerVSChecklist
    if (this.Context == 'CustomerVSChecklist') {
      this.CustomerVSChecklistDelete()
    }
    if (this.Context == 'employee') {
      this.deleteEmployee(params);
    }


  }

  ////////////////////////Employee vs Skillset functions strated////////////////////
  employeevsskillsetedit() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/GetEmployeeVsSkillsetbyId?id=${this.gettingData.id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (results) => {
        this.spinnerService.requestEnded();
        this._empService.setData({ type: 'EDIT', data: results });
        this._empService.shouldFetchData = true;
        this.router.navigate(['/topnavbar/updateskillset']);
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

  employeevsskillsetview() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/GetEmployeeVsSkillsetbyId?id=${this.gettingData.id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (results) => {
        this.spinnerService.requestEnded();

        this._empService.setData({ type: 'EDIT', data: results });
        this._empService.shouldFetchData = true;
        this.router.navigate(['/topnavbar/viewskillset']);
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

  employeevsskillsetDelete() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/Delete-Skill?id=${this.gettingData.id}`).pipe(catchError((error) => {
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
  ////////////////////////Employee vs Skillset functions ended////////////////////



  ////////////////////////CustomerVSChecklist functions started////////////////////

  CustomerVSChecklistedit() {
    const dialogRef = this._dialog.open(AddchecklistComponent, {
      width: '50vw',
      height: '80vh',
      data: {
        type: "edit",
        data: this.gettingData,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log("After closing!");
          this.sharedDataService.triggerRefresh();

        }
      },
    });

  }
  CustomerVSChecklistview() {
    const dialogRef = this._dialog.open(ViewchecklistComponent, {
      height: '60vh',
      width: '50vw',
      data: this.gettingData
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log("After closing!");
          this.sharedDataService.triggerRefresh();

        }
      },
    });
  }
  CustomerVSChecklistDelete() {
    this.spinnerService.requestStarted();

    this.checklistservice.deleteEmployee(this.gettingData.id).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        Swal.fire(
          'Done!',
          'Employee deleted!',
          'success'
        ).then((response) => {
          if (response.isConfirmed) {
            this.sharedDataService.triggerRefresh();

          }
        })
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }

    });
  }
  ////////////////////////CustomerVSChecklist functions ended////////////////////


  ////////////////////Employee Controller Started///////////////////
  openEmployeeEditForm(params) {
    this.spinnerService.requestStarted();
    this.http.get<any[]>(environment.apiURL + `Employee/GetEmployeeDetailsByID?employeeID=${params.data.employeeId}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.spinnerService.requestEnded();
      this.employeeservice.setData({ type: 'EDIT', data: results });
      this.employeeservice.shouldFetchData = true;
      this.router.navigate(['/topnavbar/Emp-editaddEmpcontroller']);
    });

  }
  viewEmployee(params) {
    console.log(params, "Paramete");

    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Employee/GetEmployeeDetailsByID?employeeID=${params.data.employeeId}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.spinnerService.requestEnded();
      this.employeeservice.setViewData({ type: 'View', data: results });

      this.employeeservice.shouldFetchViewData = true;
      this.router.navigate(['/topnavbar/Emp-addeditEmpcontroller']);

    })
  }
  deleteEmployee(params) {
    this.spinnerService.requestStarted();

    this.employeeservice.deleteEmployee(params.data.employeeId).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        Swal.fire('Done!', 'Employee Data Deleted Successfully!', 'success').then((response) => {
          if (response.isConfirmed) {
            this.sharedDataService.triggerRefresh();
          }
        });
      },
      error: console.log,
    });
  }

  ////////////////////Employee Controller Ended/////////////////////
}