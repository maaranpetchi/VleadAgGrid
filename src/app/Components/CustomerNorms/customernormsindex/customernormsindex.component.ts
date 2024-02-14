import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from '../../Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { CustomerNormsService } from 'src/app/Services/CustomerNorms/customer-norms.service';
import { catchError } from 'rxjs';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { VendoractionrenderingComponent } from '../../Vendor/vendor/Vendoractionrendering.component';
import { EmpskillactionrenderingComponent } from '../../EmployeeVSSkillset/empskillactionrendering/empskillactionrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import { customernormsrenderingcomponent } from './customerNormsRendering.component';
@Component({
  selector: 'app-customernormsindex',
  templateUrl: './customernormsindex.component.html',
  styleUrls: ['./customernormsindex.component.scss']
})
export class CustomernormsindexComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Department','CustomerShortName','Process','JobStatus', 'Scope', 'Norms', 'CustomerDivisions', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
context: any="CustomerNorms";

  constructor(private http:HttpClient,private router:Router,private spinnerService:SpinnerService,private _empService:CustomerNormsService,private sharedDataService:SharedService) {

    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.getFetchTables();
    });
   }

  ngOnInit(): void {
   this.getFetchTables();
  }
getFetchTables(){
  this.spinnerService.requestStarted();
  this.http.get<any>(environment.apiURL+`CustomerVsEmployee/GetCustomerNorms`).pipe(catchError((error) => {
    this.spinnerService.requestEnded();
    return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
  })).subscribe({
    next:(employees) => {
    this.spinnerService.requestEnded();
    this.rowData = employees;
  
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



OpenNewForm(){
  this.router.navigate(['/topnavbar/addcustomerNorms']);
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
  { headerName: 'Department Name ', field:'departmentname', filter: true, },
  { headerName: 'Customer Short Name ', field:'customerShortName', filter: true, },
  { headerName: 'Process Name', field:'processname', filter: true, },
  { headerName: 'Job Status', field:'jobstatus', filter: true, },
  { headerName: 'Scope Name', field:'scopeName', filter: true, },
  { headerName: 'Norms', field:'norms', filter: true, },
  { headerName: 'Division Name', field:'divisionName', filter: true, },
  {
    headerName: 'Actions',
    field: 'action',
    cellRenderer: customernormsrenderingcomponent, // JS comp by Direct Reference
    autoHeight: true,
  }
];

public rowSelection: 'single' | 'multiple' = 'multiple';
public rowData!: any[];
public themeClass: string =
  "ag-theme-quartz";

onGridReady(params: GridReadyEvent<any>) {
  this.gridApi = params.api;
  this.http.get<any>(environment.apiURL+`CustomerVsEmployee/GetCustomerNorms`).subscribe((response) => (this.rowData = response));
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