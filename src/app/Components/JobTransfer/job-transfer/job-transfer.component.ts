import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobTransferService } from 'src/app/Services/JobTransfer/job-transfer.service';
import { environment } from 'src/Environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../dialog/dialog.component';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { catchError } from 'rxjs';
import { error } from 'jquery';
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { ClientordinationindexComponent } from '../../TopToolbarComponents/ClientCordination/clientordinationindex/clientordinationindex.component';
import { JobDetailsClientIndexComponent } from '../../TopToolbarComponents/ClientCordination/query-to-client/job-details-client-index/job-details-client-index.component';

@Component({
  selector: 'app-job-transfer',
  templateUrl: './job-transfer.component.html',
  styleUrls: ['./job-transfer.component.scss'],
})
export class JobTransferComponent implements OnInit {
  //  Declare properties
  selectedFilter: number;
  selectedClientId: number;
  selectedJobNumber: string | null;
  selectedFileName: string | null;
  selectedfromDate: string | null;

  fromDate: string | null;
  clients: any[];

  //  ng if condition declarations
  jobNumber: boolean = false;
  fileName: boolean = false;
  dateFields: boolean = false;
  Selectclient: boolean = false;

  //  Table view heading
  displayedColumns: string[] = [
    'selected',
    'fileName',
    'fileReceivedDate',
    'department',
    'client',
    'customerJobType',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnApi: any;
  constructor(
    private _service: JobTransferService,
    private spinnerService: SpinnerService,
    private http: HttpClient,
    private loginservice: LoginService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }
  myForm = new FormGroup({
    selectdropdown: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
    jobNumber: new FormControl(''),
    fromDate: new FormControl(''),
    file: new FormControl(''),
  });

  onFilterChange() {
    if (this.selectedFilter == 3) {
      this.Selectclient = true;
      this.jobNumber = false;
      this.dateFields = false;
      this.fileName = false;
      this.fromDate = '';

      this._service.getJobTransferDetails().subscribe({
        next: (response: any) => {
          this.clients = response;
        },
        error: (err) => {
          console.log(err);
          // this.spinnerService.resetSpinner();
        },
      });
    } else if (this.selectedFilter == 2) {
      this.Selectclient = false;
      this.jobNumber = false;
      this.dateFields = true;
      this.fileName = false;
      this.fromDate = '';
    } else if (this.selectedFilter == 1) {
      this.Selectclient = false;
      this.jobNumber = false;
      this.dateFields = false;
      this.fileName = true;
      this.fromDate = '';
    } else if (this.selectedFilter == 0) {
      this.Selectclient = false;
      this.jobNumber = true;
      this.dateFields = false;
      this.fileName = false;
      this.fromDate = '';
    }
  }
  onSearchClick() {

    if (
      this.selectedClientId != undefined ||
      this.selectedFileName != undefined ||
      this.selectedFilter != undefined ||
      this.fromDate != undefined
    ) {
      if (this.selectedClientId == undefined || this.selectedClientId == null) {
        this.selectedClientId = 0;
      }
      if (
        this.selectedFileName == undefined ||
        this.selectedFileName == null ||
        this.selectedFileName == ''
      ) {
        this.selectedFileName = null;
      }
      var departmentId = this.selectedFilter;
      if (departmentId == 3 || departmentId == 2 || departmentId == 1) {
        departmentId = 0;
      }
      var jobOrder = {
        jobId: this.selectedJobNumber,
        fileName: this.selectedFileName,
        clientId: this.selectedClientId,
        fileReceivedDate: this.selectedfromDate,
      };
      this.spinnerService.requestStarted();
      this._service.jobOrderDetails(jobOrder).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe({
        next: (response) => {
          this.spinnerService.requestEnded();
          console.log(response.jobs, "Response");

          this.rowData = response.jobs;
          // this.dataSource.sort = this.sort;
        },
        error: (err: any) => {
          console.log(err);
          this.spinnerService.resetSpinner();
        },
      });
    }
  }

  selectedJobs: any[] = [];

  convert(): void {
    console.log(this.gridApi.getSelectedRows(), "SelectedRows");

    this.selectedJobs = this.gridApi.getSelectedRows();

    if (this.selectedJobs.length === 0) {
      throw new Error('Please Select Job(s).');
    }

    const convertdata = {
      ConvertDepartment: this.selectedJobs,
      UpdatedBy: this.loginservice.getUsername(),
    };
    this.spinnerService.requestStarted();
    this.http
      .post(environment.apiURL + `JobTransfer/ConvertDepartment`, convertdata).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      }))
      .subscribe((response: any) => {
        this.spinnerService.requestEnded();
        if (response) {
          Swal.fire(
            'Done!',
            'Value moved to Selected Jobs!',
            'success'
          ).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();

            }
          })
        } else {
          Swal.fire(
            'Done!',
            'Value Not moved to Selected Jobs!',
            'success'
          )
        }
      });

  }

  selectedQuery: any[] = [];
  setAll(completed: boolean, item: any) {

    if (completed == true) {
      this.selectedQuery.push({
        ...item,
      });
    } else {
      if (this.selectedQuery.find((x) => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter((x) => {
          if (x.id != item.id) {
            return item;
          }
        });
      }
    }
  }
  /////////////////////////Ag-grid module///////////////////////////////
  context: any = "jobtransfer";

  @ViewChild('agGrid') agGrid: any;

  private gridApi!: GridApi<any>;


  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  columnDefs: ColDef[] = [
    { headerName: 'File Name', field: 'fileName', filter: true },

    { headerName: 'File Received Date', field: 'fileReceivedDate', filter: true, },
    { headerName: 'Department', field: 'department.description', filter: true, },
    { headerName: 'File Received EST Date', field: 'fileReceivedDate', filter: true, },

    { headerName: 'Client', field: 'customer.shortName', filter: true, },
    { headerName: 'Customer Job Type', field: 'customer.customerJobType', filter: true, },

  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[] = [];
  public themeClass: string =
    "ag-theme-quartz";





  onCellClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'jobId') {
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


