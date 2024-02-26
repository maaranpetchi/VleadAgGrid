import { Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCreditnoteComponent } from '../add-creditnote/add-creditnote.component';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreditnoteService } from 'src/app/Services/AccountController/CreditNote/creditnote.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
@Component({
  selector: 'app-creditnoteindex',
  templateUrl: './creditnoteindex.component.html',
  styleUrls: ['./creditnoteindex.component.scss']
})
export class CreditnoteindexComponent {
  displayedColumns: string[] = [
    'employeeCode',
    'employeeName',
    'departmentId',
    'designationId',
    'profiencyId',
    'reportingManager1',
    'reportLeader1',
    'invoicenumber'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnApi: any;
  constructor(private _dialog: MatDialog,
    private spinnerservice: SpinnerService,
    private _empService: CreditnoteService,
    private _coreService: CoreService,
    private http: HttpClient,) { }


  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddCreditnoteComponent, {
      height: '80vh',
      //width: '80vw'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });

  }

  getEmployeeList() {
    this.spinnerservice.requestStarted();

    this._empService.getEmployeeList().subscribe({

      next: (res) => {
        this.spinnerservice.requestEnded();
        this.rowData = res;
      },
      error: (err) => {
        this.spinnerservice.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }





  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddCreditnoteComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();

        }
      },
    });
  }

  /////////////////////////Ag-grid module///////////////////////////////
  context: any;

  @ViewChild('agGrid') agGrid: any;

  private gridApi!: GridApi<any>;


  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  columnDefs: ColDef[] = [
    { headerName: 'Voucher Number', field: 'voucherNo', filter: true },
    { headerName: 'Voucher Date', field: 'collectionDate', filter: true, },
    { headerName: 'Customer', field: 'customerShortName', filter: true, },
    { headerName: 'Credit Note Amount', field: 'collectionAmount', filter: true, },

    { headerName: 'Reference Number', field: 'referenceNo', filter: true, },
    { headerName: 'Reference Date', field: 'referenceDate', filter: true, },
    { headerName: 'Description', field: 'description', filter: true, },
    { headerName: 'Invoice Number', field: 'invoiceNo', filter: true, },
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[] = [];
  public themeClass: string =
    "ag-theme-quartz";


  onCellClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'invoiceNo') {
      console.log(data, "PopupData");

    }
  }



  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

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