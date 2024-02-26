import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { VendoractionrenderingComponent } from 'src/app/Components/Vendor/vendor/Vendoractionrendering.component';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CustomerSalesApprovalService } from 'src/app/Services/sales/CustomerSalesApproval/customer-sales-approval.service';

@Component({
  selector: 'app-tabcustomertable',
  templateUrl: './tabcustomertable.component.html',
  styleUrls: ['./tabcustomertable.component.scss']
})
export class TabcustomertableComponent implements OnInit {
  context: any = "customersalesapproval";
  ngOnInit(): void {

    this.ApprovedCustomer()
  }
  constructor(private router: Router, private _coreService: CoreService, private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private _dialog: MatDialog, private spinnerService: SpinnerService, private sharedDataService: CustomerSalesApprovalService) { this.dataSource.paginator = this.paginator1; }
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumnsvisibility: any = {
    companyname: true,
    customername: false,
    address: true,
    customershortname: false,
    classification: false,
    emailid: true,
    phonenumber: true,
    approvedphonenumber: false,
    salesemployee: true,
    action: true,

  };

  visibility() {
    let result: string[] = [];
    if (this.displayedColumnsvisibility.companyname) {
      result.push('companyname');
    }
    if (this.displayedColumnsvisibility.customername) {
      result.push('customername');
    }
    if (this.displayedColumnsvisibility.address) {
      result.push('address');
    }
    if (this.displayedColumnsvisibility.customershortname) {
      result.push('customershortname');
    }
    if (this.displayedColumnsvisibility.classification) {
      result.push('classification');
    }
    if (this.displayedColumnsvisibility.emailid) {
      result.push('emailid');
    }
    if (this.displayedColumnsvisibility.salesemployee) {
      result.push('salesemployee');
    }
    if (this.displayedColumnsvisibility.instruction) {
      result.push('instruction');
    }
    if (this.displayedColumnsvisibility.salespersonname) {
      result.push('salespersonname');
    }
    if (this.displayedColumnsvisibility.action) {
      result.push('action');
    }
    return result;
  }

  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openEditForm(id: number) {
    let payload = {
      "id": id,
    }
    this.http.get<any>(environment.apiURL + `Customer/getAppAllCustomerContactDetails?customerId=${id}`,).subscribe(results => {
      this.sharedDataService.setData(results);
      this.router.navigate(['/topnavbar/multistepform']);
    });
  }

  tab(action) {
    if (action == '1') {
      this.ApprovedCustomer();
    }
    else if (action == '2') {
      this.UnApprovedCustomer();
    }
  }


  ApprovedCustomer() {
    // this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Customer/getCustomerUnapproval?EmpId=${this.loginservice.getUsername()}`).subscribe(unapprovedCustomer => {
      this.gridApi.setColumnVisible('name', false);
      this.gridApi.setColumnVisible('companyName', true);
      this.gridApi.setColumnVisible('phone1', false);
      this.gridApi.setColumnVisible('shortName', false);
      this.gridApi.setColumnVisible('address', true);
      this.gridApi.setColumnVisible('description', false);
      this.gridApi.setColumnVisible('emailID', true);
      this.gridApi.setColumnVisible('phoneNo', true);
      this.gridApi.setColumnVisible('employeeName', true);
      this.gridApi.setColumnVisible('action', true);

      this.rowData = unapprovedCustomer ;

    });
  }
  UnApprovedCustomer() {
    // this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Customer/GetAllCustomers?EmpId=${this.loginservice.getUsername()}`).subscribe(approvedCustomer => {
      this.rowData =  approvedCustomer;
      
      this.gridApi.setColumnVisible('name', true);
      this.gridApi.setColumnVisible('companyName', false);
      this.gridApi.setColumnVisible('phone1', true);
      this.gridApi.setColumnVisible('shortName', true);
      this.gridApi.setColumnVisible('address', false);
      this.gridApi.setColumnVisible('description', true);
      this.gridApi.setColumnVisible('emailID', false);
      this.gridApi.setColumnVisible('phoneNo', false);
      this.gridApi.setColumnVisible('employeeName', true);
      this.gridApi.setColumnVisible('action', true);
    },
      error => {
        // this.spinnerService.resetSpinner();
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
    { headerName: 'Company Name ', field: 'companyName', filter: true, },
    { headerName: 'Customer Name ', field: 'name', filter: true, },
    { headerName: 'Address', field: 'address', filter: true, },
    { headerName: 'Customer Short Name', field: 'shortName', filter: true, },
    { headerName: 'Classification', field: 'description', filter: true, },
    { headerName: 'EmailId', field: 'emailID', filter: true, },
    { headerName: 'Phone Number', field: 'phoneNo', filter: true, },
    { headerName: 'Phone Number', field: 'phone1', filter: true, },
    { headerName: 'Sales Employee', field: 'employeeName', filter: true, },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: VendoractionrenderingComponent, // JS comp by Direct Reference
      autoHeight: true,
    }
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: any[];
  public themeClass: string =
    "ag-theme-quartz";

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.http.get<any>(environment.apiURL + 'ITAsset/nGetBankDetails').subscribe((response) => (this.rowData = response.vendorGDetailList));
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