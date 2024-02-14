import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PricingcalculationService } from 'src/app/Services/AccountController/PricingCalculation/pricingcalculation.service';
import { InformationpopupComponent } from '../Dialogpop/informationpopup/informationpopup.component';
import { log } from 'console';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { SelectionModel } from '@angular/cdk/collections';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { customernormsrenderingcomponent } from 'src/app/Components/CustomerNorms/customernormsindex/customerNormsRendering.component';

@Component({
  selector: 'app-pricingcalculation',
  templateUrl: './pricingcalculation.component.html',
  styleUrls: ['./pricingcalculation.component.scss']
})
export class PricingcalculationComponent implements OnInit {
  getClientId: any[] = [];

  selection = new SelectionModel<any>(true, []); // Create a selection model for row selection
  context: any = "pricingcalculation";

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(private http: HttpClient, private _empService: PricingcalculationService, private dialog: MatDialog, private loginservice: LoginService, private spinnerService: SpinnerService, private builder: FormBuilder) { }

  displayedColumns: string[] = [
    'selected',
    'ClientName',
    'Jobid',
    'FileName',
    'Department',
    'ProjectCode',
    'SpecialPrice',
    'scope',
    'JobStatus',
    'StitchCount',
    'ESTFileReceivedDate',
    'ESTDateofUpload'
  ];

  selectedInvoices: any[] = [];



  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  setAll(completed: boolean, item: any) {

    if (completed == true) {
      this.selectedInvoices.push(item)
    }
    else {

      if (this.selectedInvoices.find(x => x.id == item.id)) {
        this.selectedInvoices = this.selectedInvoices.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }

  }



  ngOnInit(): void {
    this.getClient();
    this.myForm = this.builder.group({
      fromDate: this.fromDate,
      toDate: this.toDate,
      ClientId: this.ClientId,
    });
  }


  getClient() {
    //client name dropdown
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'Invoice/GetClient').subscribe(data => {
      this.spinnerService.requestEnded();
      this.data = data;
    }, error => {
      this.spinnerService.resetSpinner();
    });
  }

  data: any = {
    clientList: [],
  };

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm: FormGroup

  fromDate = new FormControl("", Validators.required);
  toDate = new FormControl("", Validators.required);
  ClientId = new FormControl("", Validators.required)




  openDialog() {
    let clientid = 0;


    clientid = parseInt(this.myForm?.value.ClientId ? this.myForm?.value.ClientId : "0")
    let temporaryarray: any[] = this.gridApi.getSelectedRows().map(selectedRow => {
      return {
        "jobId": selectedRow.jobId,
        "shortName": selectedRow.shortName,
        "scopeId": selectedRow.scopeId,
        "scopeDesc": "",
        "clientId": selectedRow.clientId,
        "billingCycleType": selectedRow.billingCycleType,
        "dateofUpload": selectedRow.dateofUpload,
        "createdBy": this.loginservice.getUsername(),
        "departmentId": selectedRow.departmentId,
        "tranId": 0,
        "id": selectedRow.id,
        "jId": selectedRow.jId,
        "pricingTypeId": 0,
        "getInvoice": [],

        "fileReceivedDate": selectedRow.fileReceivedDate,
        "isBillable": selectedRow.isBillable,
        "specialPrice": selectedRow.specialPrice ? selectedRow.specialPrice : 0,
        "estimatedTime": selectedRow.estimatedTime,
        "isWaiver": true,
        "jobStatusId": 0
      }
    })

    let result: any = {
      "jobId": "",
      "shortName": "",
      "scopeId": 0,
      "scopeDesc": "",
      "clientId": this.myForm.value?.ClientId,
      "billingCycleType": "",
      "dateofUpload": new Date().toISOString,
      "createdBy": this.loginservice.getUsername(),
      "departmentId": 0,
      "tranId": 0,
      "id": 0,
      "jId": 0,
      "pricingTypeId": 0,
      "getInvoice": temporaryarray,
      "fileReceivedDate": "2023-04-06T08:51:10.069Z",
      "isBillable": true,
      "specialPrice": 0,
      "estimatedTime": 0,
      "isWaiver": true,
      "jobStatusId": 0
    }
    console.log(result, "Payload");

    this.onInvoiceCalculation(result)


  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({

      next: (res) => {

        this.rowData = res;


      }
    });
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      for (const control of Object.keys(this.myForm.controls)) {
        this.myForm.controls[control].markAsTouched();
      }
    }
    else {
      // Validate from date and to date
      const fromDate = this.myForm.value.fromDate ? this.myForm.value.fromDate : '';
      const toDate = this.myForm.value.toDate ? this.myForm.value.toDate : '';

      if (fromDate > toDate) {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'From date cannot be greater than To date!',
        });
        return; // Stop further processing
      }



      // Rest of your code for API call and other actions
      // Call the API to get the search results
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + 'Invoice/GetClientDetails', {
        "clientId": this.myForm.value?.ClientId,
        "fromDate": this.myForm.value?.fromDate,
        "toDate": this.myForm.value?.toDate
      }).subscribe((results: any) => {
        this.spinnerService.requestEnded();
        this.rowData = results.getInvoice;

      }
      )
    }

  }

  onInvoiceCalculation(item: any) {
    // Call the API to get the search results
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'Invoice/GetCalculatedInvoice', item).subscribe((results: any) => {
      this.spinnerService.requestEnded();
      if (results.stringList == "Price has been Updated") {

        Swal.fire(
          'Done!',
          results.stringList,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.myForm.reset();
            this.rowData = [];
          }
        })
      }
      else {
        Swal.fire(
          'info!',
          results.stringList,
          'info'
        ).then((result) => {
          if (result.isConfirmed) {
            this.myForm.reset();
            this.rowData = [];          }
        })
      }
    }
    )
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
    { headerName: 'Department Name ', field: 'shortName', filter: true, },
    { headerName: 'Job Id', field: 'jobId', filter: true, },
    { headerName: 'File Name', field: 'fileName', filter: true, },
    { headerName: 'Department', field: 'department', filter: true, },
    { headerName: 'Project Code', field: 'projectCode', filter: true, },
    { headerName: 'Special Price', field: 'specialPrice', filter: true, },
    { headerName: 'Scope', field: 'description', filter: true, },
    { headerName: 'Job Status', field: 'jobStatusDescription', filter: true, },
    { headerName: 'Stitch Count', field: 'stitchCount', filter: true, },
    { headerName: 'ESTFileReceivedDate', field: 'estFileReceivedDate', filter: true, },
    { headerName: 'ESTDateofUpload', field: 'estDateofUpload', filter: true, },

  ];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[] = [];
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