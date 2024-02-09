import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { VendoractionrenderingComponent } from '../../Vendor/vendor/Vendoractionrendering.component';

@Component({
  selector: 'app-attendance-index',
  templateUrl: './attendance-index.component.html',
  styleUrls: ['./attendance-index.component.scss']
})
export class AttendanceIndexComponent implements OnInit {
  ViewAttendanceExcel: any;
context: any="Attendance";
  ngOnInit(): void {

  }
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient, private loginservice: LoginService, private _coreService: CoreService, private spinnerService: SpinnerService, private router: Router) { }

  //ngmodel
  reportAsOn: any;
  selectedFile: File[] = [];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files;

  }
  displayedColumns: string[] = [
    'EmpCode',
    'Name',
    'Devision',
    'shift',
    'AttendanceStatus',
  ];
  btnimportAttendanceexcel() {
    if (this.selectedFile.length === 0) {
      Swal.fire('Alert!', 'Please select a file before importing.', 'info');
      return;
    }
    var fd = new FormData();
    for (let i = 0; i < this.selectedFile.length; i++) {
      fd.append('Files', this.selectedFile[i]);
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `JobOrder/PostImportAttendanceExcel`, fd).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (result) => {
        this.spinnerService.requestEnded();
        if (result.result == "success") {


          this.rowData = result.attendanceList;
          //
          this.ViewAttendanceExcel = result.attendanceList;
          //
          Swal.fire(
            'Done!',
            'File Inward Successfully.!',
            'success'
          )

        }
        else {
          Swal.fire(
            'Alert!',
            'Please upload valid file!',
            'info'
          )

        }
        //BindFileInward();
        this.selectedFile.length = 0;
      },
    })

  };


  SaveAttendanceData() {

    if (this.selectedFile.length == 0) {

      Swal.fire(
        'Alert!',
        'Please upload file for attendance',
        'info'

      )
      return;
    }

    let payload = {
      attendanceList: this.rowData,
      dt: this.reportAsOn,
      result: " ",
    }

    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `JobOrder/SaveAttendanceList`, payload).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.spinnerService.requestEnded();
      if (results.result = "Following employee Ids are not available ARTWORK") {
        Swal.fire(
          'Alert!',
          results.result,
          'info'
        )
      }
      else {
        Swal.fire(
          'Done!',
          results.result,
          'success'

        ).then((result) => {

          if (result.isConfirmed) {
            this.rowData = []; // Set the dataSource to an empty array
          }

        })

      }
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
    { headerName: 'Employee Code ', field: 'empCode', filter: true, },
    { headerName: 'Name ', field: 'name', filter: true, },
    { headerName: 'Division', field: 'devision', filter: true, },
    { headerName: 'Shift', field: 'shift', filter: true, },
    { headerName: 'Pending Amount', field: 'pendingAmount', filter: true, },
    { headerName: 'Attendance Status', field: 'attendanceStatus', filter: true, },
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
   // this.http.get<any>(environment.apiURL + 'ITAsset/nGetBankDetails').subscribe((response) => (this.rowData = response.vendorGDetailList));
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