import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerService } from '../../Spinner/spinner.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { Router } from '@angular/router';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { ViewActionRenderingComponent } from '../../AccountsController/CustomerReceipts/view-action-rendering/view-action-rendering.component';

@Component({
  selector: 'app-un-approvaljobs',
  templateUrl: './un-approvaljobs.component.html',
  styleUrls: ['./un-approvaljobs.component.scss']
})
export class UnApprovaljobsComponent implements OnInit {
context: any="customerunapprovaljobs";
  constructor(
    private spinner: SpinnerService,
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPendingJobApproval()
  }


  openViewForm(data: any) {
    // this.http.get(environment.apiURL+`Customer/getpendingapprovaljobs?EmpId=${this.loginService.getUsername()}`).subscribe((response:any) =>{
    this.router.navigate(["topnavbar/view-unapprovalJobs"], { state: { data: data } });
    // })
  }
  getPendingJobApproval() {
    this.spinner.requestStarted();
    this.http.get(environment.apiURL + `Customer/getpendingapprovaljobs?EmpId=${this.loginService.getUsername()}`).subscribe({
      next: (response: any) => {
        this.spinner.requestEnded();
        this.rowData = response;
  
      },
      error: (err) => {
        this.spinner.resetSpinner();

        console.log(err);
      },
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
    { headerName: 'File Name', field: 'fileName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'PO# ', field: 'pono', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Customer Name', field: 'companyName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Instructions', field: 'jobStatusDescription', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Sales Person Name', field: 'salesPersonName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Status', field: 'jobStatusDescription', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: ViewActionRenderingComponent, // JS comp by Direct Reference
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