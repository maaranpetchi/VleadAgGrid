import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CreditDaysService } from 'src/app/Services/sales/creditdaysApproval/credit-days.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { VendoractionrenderingComponent } from '../../Vendor/vendor/Vendoractionrendering.component';

@Component({
  selector: 'app-creditdays-approval',
  templateUrl: './creditdays-approval.component.html',
  styleUrls: ['./creditdays-approval.component.scss'],
})
export class CreditdaysApprovalComponent implements OnInit, OnDestroy {
context: any="creditdaysapproval";
  constructor(
    private _service: CreditDaysService,
    private loginservice: LoginService,
    private http: HttpClient,
    private spinner: SpinnerService
  ) {}

  displayedColumns: string[] = [
    'customerName',
    'Creditdays',
    'creditLimit',
    'remarks',
    'approvedBy',
    'approveddate',
    'createdBy',
    'createddate',
    'approvalType',
    'action',
  ];


  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.getAllApprovals();
  }
  checkAdmin(): Observable<any> {
    return this.http.get(
      environment.apiURL +
        `Account/checkIsAdmin/${this.loginservice.getUsername()}`
    );
  }
  checkUserName(): Observable<any> {
    return this.http.get(
      environment.apiURL +
        `Account/getEmployeeProcess/${this.loginservice.getUsername()}`
    );
  }
  getAllApprovals() {
    this.spinner.requestStarted();
    let saveData = {
      creditDays: 0,
      remarks: 'string',
      approvalType: 'string',
      clientId: 0,
      employeeId: this.loginservice.getUsername(),
      creditLimit: 0,
    };
    this.http
      .post(environment.apiURL + 'ClientOrderService/GetAllApproval', saveData)
      .subscribe({
        next: (response: any) => {
          this.spinner.requestEnded();
          this.rowData = response.approvalDetails;
      
        },
        error: (err) => {
          this.spinner.resetSpinner();

          console.log(err);
        },
      });
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
   { headerName: 'Customer Name ', field: 'client.shortName', filter: true, },
   { headerName: 'Credit Days ', field: 'creditDays', filter: true, },
   { headerName: 'Credit Limit', field: 'creditLimit', filter: true, },
   { headerName: 'Remarks', field: 'remarks', filter: true, },
   { headerName: 'Approved By', field: 'approvedBy', filter: true, },
   { headerName: 'Approved Date', field: 'approvedDate', filter: true, },
   { headerName: 'Created By', field: 'createdBy', filter: true, },
   { headerName: 'Create Date', field: 'createdDate', filter: true, },
   { headerName: 'Approval Type', field: 'approvalType', filter: true, },
   {
     headerName: 'Actions',
     field: 'action',
     autoHeight: true,
   }
 ];

 public rowSelection: 'single' | 'multiple' = 'multiple';
 public rowData!: any[];
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