import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { EditVendorComponent } from '../edit-vendor/edit-vendor.component';
import { MatDialog } from '@angular/material/dialog';
import { VendorService } from 'src/app/Services/Vendor/vendor.service';
import { UpdatevendorComponent } from '../updatevendor/updatevendor.component';
import { SpinnerService } from '../../Spinner/spinner.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { VendoractionrenderingComponent } from './Vendoractionrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
context: any="vendor";
  ngOnInit(): void {
    this.fetchtableData();
  }
  constructor(private spinnerService: SpinnerService, private VendorService: VendorService, private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private _dialog: MatDialog,private sharedDataService:SharedService) { 

    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.fetchtableData();
    });
  }
   btnAccountEEdit(id: string) {
    // Implement your edit logic here
  }

  fetchtableData() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `ITAsset/nGetVendorData`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.rowData = data.vendorGDetailList;
    
      },
      error: (err: any) => {
        this.spinnerService.resetSpinner();
      }
    });
  }

  openvendor() {
    const dialogRef = this._dialog.open(EditVendorComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchtableData();
        }
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
    { headerName: 'Vendor Name ', field: 'vendorName', filter: true, },
    { headerName: 'Invoice Number ', field: 'invoiceNumber', filter: true, },
    { headerName: 'Invoice Date', field: 'invoiceDate', filter: true, },
    { headerName: 'Invoice Value', field: 'invoiceValue', filter: true, },
    { headerName: 'Pending Amount', field: 'pendingAmount', filter: true, },
    { headerName: 'Amount Paid', field: 'amountPaid', filter: true, },
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