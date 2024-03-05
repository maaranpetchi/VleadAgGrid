import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Services/AccountController/CustomerReceipts/Core/core.service';
import { CustomerreceiptsService } from 'src/app/Services/AccountController/CustomerReceipts/customerreceipts.service';


import { AddEditCustomerreceiptsComponent } from '../add-edit-customerreceipts/add-edit-customerreceipts.component';
import { environment } from 'src/Environments/environment';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { EmpskillactionrenderingComponent } from 'src/app/Components/EmployeeVSSkillset/empskillactionrendering/empskillactionrendering.component';
import { ViewActionRenderingComponent } from '../view-action-rendering/view-action-rendering.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
@Component({
  selector: 'app-customerreceiptsindex',
  templateUrl: './customerreceiptsindex.component.html',
  styleUrls: ['./customerreceiptsindex.component.scss']
})
export class CustomerreceiptsindexComponent implements OnInit{

  displayedColumns: string[] = [
    'voucherNo',
    'collectionDate',
    'shortName',
    'collectionAmount',
    'referenceNo',
    'referenceDate',
    'description',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isDeletedInclude = false;
  isResignInclude = false;
context: any="customerreceipts";


constructor( private _dialog: MatDialog,
  private router:Router,
  private _empService:CustomerreceiptsService ,
  private _coreService: CoreService,
  private http:HttpClient,private spinnerservice:SpinnerService){}

  
  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    this.router.navigate(['/topnavbar/addreceivables']);

  }

  getEmployeeList() {
    this.spinnerservice.requestStarted();
    this._empService.getEmployeeList().subscribe({
     
      next: (res) => {
        this.spinnerservice.requestEnded();
        this.rowData = res;     
      },
      error: console.log,
    });
  }
  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewEmployee(id: number) {
    this.http.get<any>(environment.apiURL + `Receivable/GetReceivableById?receivableId=${id}`).subscribe(results => {
      this._empService.setData({ type: 'View', data: results });
      this._empService.shouldFetchData = true;
      this.router.navigate(['/topnavbar/acc-viewcustomer']);

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
   { headerName: 'Voucher Number', field: 'voucherNo', filter: 'agTextColumnFilter',
      floatingFilter: true, },
   { headerName: 'Voucher Date ', field: 'collectionDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
   { headerName: 'Customer', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
   { headerName: 'Receipt Amount', field: 'collectionAmount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
   { headerName: 'Reference Number', field: 'referenceNo', filter: 'agTextColumnFilter',
      floatingFilter: true, },
   { headerName: 'Reference Date', field: 'referenceDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
   { headerName: 'Description', field: 'description', filter: 'agTextColumnFilter',
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
   this._empService.getEmployeeList().subscribe((response) => (this.rowData = response));
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