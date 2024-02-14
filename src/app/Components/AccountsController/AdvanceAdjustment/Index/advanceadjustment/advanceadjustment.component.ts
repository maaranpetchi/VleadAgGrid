import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditadvanceadjustmentComponent } from '../../Edit/editadvanceadjustment/editadvanceadjustment.component';
import { AdvanceadjustmentService } from 'src/app/Services/AccountController/AdvanceAdjustment/advanceadjustment.service';
import { environment } from 'src/Environments/environment';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { VendoractionrenderingComponent } from 'src/app/Components/Vendor/vendor/Vendoractionrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-advanceadjustment',
  templateUrl: './advanceadjustment.component.html',
  styleUrls: ['./advanceadjustment.component.scss']
})
export class AdvanceadjustmentComponent implements OnInit {

  selectedOption: string;

  displayedColumns: string[] = [
    'VocherNumber',
    'collectionDate',
    'Description',
    'adjustmentAmount',
    'UnadjustedAdvance',
    'action'
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  options: any[] = [];

  constructor(
    private advanceservice: AdvanceadjustmentService,
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private http: HttpClient,
    private sharedDataService:SharedService
  ) { 
    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.loadData();
    });}


  ngOnInit(): void {
    // department dropdown fetch the values from the API
    //   this..subscribe(departmentdata => {
    //     this.Departmentdropdownvalues = departmentdata;
    //     this.Departmentdropdownvalues.sort();
    // });

    this.advanceservice.getdropdownvalues().subscribe(departmentdata => {
      this.Departmentdropdownvalues = departmentdata;
      this.Departmentdropdownvalues.sort();
    });

  }


  //Customerdropdownvalues dropdowndeclaration
  selecteddepartmentOption: any = '';
  Departmentdropdownvalues: any[] = [];


  getContext(): any {
    return {
      department: this.selecteddepartmentOption,
      context: "advanceadjustment"
    };
  }

  openEditForm(data: any) {
    const dialogRef: MatDialogRef<EditadvanceadjustmentComponent> = this._dialog.open(EditadvanceadjustmentComponent, {
      width: '70vw',
      height: '90vh',
      data: {
        id: data.id,
        availableAdvance: data.availableAdvance,
        department: this.selecteddepartmentOption,
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      // Call the loaddata() method here
      this.loadData();
    });
  }
  getcustomerid() {

    return this.selecteddepartmentOption;

  }

  loadData() {
    this.http.get<any[]>(environment.apiURL + `AdvanceAdjustment/GetAllCustomerAdvance?CustomerId=${this.selecteddepartmentOption}`).subscribe(data => {
      this.rowData = data;
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
    { headerName: 'Voucher Number', field:'receivable.voucherNo', filter: true, },
    { headerName: 'Collection Date', field:'receivable.collectionDate', filter: true, },
    { headerName: 'Description', field:'receivable.description', filter: true, },
    { headerName: 'Receipt Advance Amount', field: 'adjustmentAmount', filter: true, },
    { headerName: 'Unadjusted Advance', field: 'availableAdvance', filter: true, },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: VendoractionrenderingComponent, // JS comp by Direct Reference
      autoHeight: true,
    }
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[]=[];
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