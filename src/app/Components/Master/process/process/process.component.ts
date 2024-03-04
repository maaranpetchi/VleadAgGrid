import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { EmpskillactionrenderingComponent } from 'src/app/Components/EmployeeVSSkillset/empskillactionrendering/empskillactionrendering.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { ProcessService } from 'src/app/Services/Process/process.service';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit{


context: any="process";


  constructor(
    private _service:ProcessService,
    private route:Router,
    private _coreService:CoreService,
    private http:HttpClient,
    private spinnerService:SpinnerService,
    private sharedDataService:SharedService
  ){
    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.getListProcess();
    });
  }
  
  ngOnInit(): void {
    this.getListProcess()
  }

  getListProcess(){
    this.spinnerService.requestStarted();
    this._service.getProcessList().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.rowData =data;

      },
      error: (err) => {
        console.log(err);
      }
    })  
  }


  addItem(){
    this._service.setFormData(null);
    this.route.navigate(['/topnavbar/process-addEdit'])
  }


  openViewForm(data:any){
    this.spinnerService.requestStarted();
    this.http.get(environment.apiURL+`Process/ProcessDetails?Id=${data.id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response:any) =>{
      this.spinnerService.requestEnded();

    this.route.navigate(['/topnavbar/process-view'], {state:{data:response}});
  })
}
  openEditForm(id:any){
    this._service.setFormData(id);
    this.spinnerService.requestStarted();

    this.http.get(environment.apiURL+`Process/ProcessDetails?Id=${id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response:any) =>{
      this.spinnerService.requestEnded();

      this.route.navigate(['/topnavbar/process-addEdit'], {state:{data:response}});
  })
  }



  deleteScopeUser(id:any){        this.spinnerService.requestStarted();

    this._service.deleteProcess(id).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (response) => {
        this.spinnerService.requestEnded();

        if(response === true){
        this._coreService.openSnackBar('Process deleted!', 'done');
        window.location.reload()
        }
        else{
        this._coreService.openSnackBar('Failed!', 'done');
        }
        this.getListProcess();
      },
      error: console.log,
    })
  }




/////////////////////////Ag-grid module///////////////////////////////
@ViewChild('agGrid') agGrid: any;

private gridApi!: GridApi<any>;
public defaultColDef: ColDef = {
  flex: 1,
  minWidth: 100,
  headerCheckboxSelection: isFirstColumn,
  checkboxSelection: isFirstColumn,
};

columnDefs: ColDef[] = [
  { headerName: 'Name ', field: 'name', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Short Name ', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Description ', field: 'description', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Is Active ', field: 'isActive', filter: 'agTextColumnFilter',
      floatingFilter: true, },

  {
    headerName: 'Actions',
    cellStyle: { innerWidth: 20 },

    field: 'action',
    cellRenderer: EmpskillactionrenderingComponent, // JS comp by Direct Reference
    autoHeight: true,
  }
];

public rowSelection: 'single' | 'multiple' = 'multiple';
public rowData: any[]=[];
public themeClass: string =
  "ag-theme-quartz";

onGridReady(params: GridReadyEvent<any>) {
  this.gridApi = params.api;
}

handleCellValueChanged(params: { colDef: ColDef, newValue: any, data: any }) {
  console.log(params, "Parameter");
  console.log(params.data, "ParameterData");
  let parameterData = params.data
  if (params.colDef.field === 'filecount') { // Check if the changed column is 'price'

  }
}


handlePress(newvalue, parameterData) {
  console.log(newvalue, "HandlepressNewValue");
  console.log(parameterData, "ParameterValue");

}


}

function isFirstColumn(
params:
  | CheckboxSelectionCallbackParams
  | HeaderCheckboxSelectionCallbackParams
) {
var displayedColumns = params.api.getAllDisplayedColumns();
var thisIsFirstColumn = displayedColumns[0] === params.column;
return thisIsFirstColumn;
}
