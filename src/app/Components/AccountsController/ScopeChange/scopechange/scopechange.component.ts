import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/Services/AccountController/ScopeChange/Core/core.service';
import { ScopechangeService } from 'src/app/Services/AccountController/ScopeChange/scopechange.service';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { SelectionModel } from '@angular/cdk/collections';
import { LoginComponent } from 'src/app/Components/Navigation/TopNavbar/login/login.component';
import { GridApi, ColDef, CellClickedEvent, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
//MARTIAL INTERFACE
interface Department {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-scopechange',
  templateUrl: './scopechange.component.html',
  styleUrls: ['./scopechange.component.scss']
})
export class ScopechangeComponent implements OnInit {
  displayedColumns: string[] = [
    'selected',
    'jobid',
    'jobdate',
    'department',
    'clientName',
    'filename',
    'jobstatus',
    'Scope',

  ];
  //martial status dropdown values
  departments: Department[] = [
    { value: '1', viewValue: 'Artwork' },
    { value: '2', viewValue: 'Digitizing' },
  ];
  dataSource = new MatTableDataSource([]);



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empForm: FormGroup;
  columnApi: any;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private _empService: ScopechangeService,
    private snackBar: MatSnackBar,
    private _coreService: CoreService,
    private spinnerService: SpinnerService
  ) {

    this.empForm = this._fb.group({
      fromdate: '',
      todate: '',
      client: '',
      department: '',
      scope: ''
    });
  }


  selectedJobs: any[] = [];
  selectedQuery: any[] = [];

  onSubmit() {

    if (this.selectedScopeOption == "") {
      Swal.fire('Info', 'Please select the list item and scope', 'info');
      return;
    }
    else {
      this.gridApi.getSelectedRows().forEach(x => this.setAll(x));
      if (this.selectedQuery.length > 0) {
        this.selectedJobs = this.selectedQuery;
      }
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + 'CustomerMapping/ChangeScopeAPI', {
        "fromDate": this.empForm?.value.fromdate,
        "toDate": this.empForm?.value.todate,
        "departmentId": this.empForm?.value.department,
        "clientId": this.empForm?.value.client,
        "scopeId": this.selectedScopeOption,
        "jobId": "string",
        "jId": 0,
        "changeScope": this.selectedJobs
      }).subscribe({
        next: (results: any) => {
          this.spinnerService.requestEnded();
          if (results.stringList == "Scope has been updated successfully") {

            Swal.fire(
              'Done',
              results.stringList,
              'success'
            ).then((result) => {

              if (result.isConfirmed) {
                this.getJobOrderList();
              }

            })
            // Show success message popup
          }
          else {
            Swal.fire(
              'info',
              results.stringList,
              'info'
            ).then((result) => {

              if (result.isConfirmed) {
                window.location.reload();
              }

            })
          }
        }
      })
    }
  }


  //Customerdropdownvalues dropdowndeclaration
  selectedclientOption: any = '';
  Clientdropdownvalues: any[] = [];
  //Scopedropdownvalues dropdowndeclaration
  selectedScopeOption: any = '';
  Scopedropdownvalues: any[] = [];
  //Resign dropdowndeclaration
  selectedresignOption: any = '';
  Resigndropdownvalues: any[] = [];

  selectedInvoices: any[] = [];

  // setAll(completed: boolean, item: any) {
  //   if (completed == true) {
  //     this.selectedInvoices.push(item)
  //   }
  //   else {

  //     if (this.selectedInvoices.find(x => x.jId == item.jId)) {
  //       this.selectedInvoices = this.selectedInvoices.filter(x => {
  //         if (x.jId != item.jId) {
  //           return item
  //         }
  //       })
  //     }
  //   }
  // }

  ngOnInit(): void {

    this.getCustomerData();

  }
  getCustomerData() {
    // customerdata dropdown fetch the values from the API
    this.spinnerService.requestStarted();
    this.http.get<any[]>(environment.apiURL + 'dropdown/getcustomers').subscribe({
      next: (clientdata) => {
        this.spinnerService.requestEnded();

        this.Clientdropdownvalues = clientdata;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    });
  }
  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  getScopeList() {
    this.spinnerService.requestStarted();
    this.http.get(environment.apiURL + `CustomerMapping/DDLforScopeChange?departmentId=${this.empForm.value.department}&custId=${this.empForm.value.client}`).subscribe({
      next: (data: any) => {
        this.spinnerService.requestEnded();
        this.Scopedropdownvalues = data;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    })
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({

      next: (res) => {
        this.rowData = res;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    });
  }

  getJobOrderList() {
    this.spinnerService.requestStarted();
    this._empService.getJobOrderList({
      "clientId": this.empForm.value.client,
      "departmentId": this.empForm.value.department,
      "fromDate": this.empForm.value.fromdate,
      "toDate": this.empForm.value.todate
    }).subscribe({
      next: (results: any) => {
        this.spinnerService.requestEnded();
        this.rowData = results.jobOrderDetailsReport;

      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    })
    this.getScopeList();
  }



  //select///

  selection = new SelectionModel<any>(true, []);

  filterValue: any = null;


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    else if (this.filterValue) {
      this.selection.clear();
      this.dataSource.filteredData.forEach(x => this.selection.select(x));
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }

  }

  setAll(item: any) {
    this.selectedQuery.push({
      ...item,
      ChangeScope: []
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
    { headerName: 'Job Number', field: 'jobId', filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { color: 'skyblue', 'cursor': 'pointer' } },
    { headerName: 'Job Date', field: 'estJobDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Department', field: 'departmentName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Client', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },

    { headerName: 'File Name', field: 'fileName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Status', field: 'jobStatusDescription', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Scope', field: 'scopeName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
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