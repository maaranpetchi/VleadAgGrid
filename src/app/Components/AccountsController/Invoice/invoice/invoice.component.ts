import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupinvoiceComponent } from '../popupinvoice/popupinvoice.component';
import { environment } from 'src/Environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PricingcalculationService } from 'src/app/Services/AccountController/PricingCalculation/pricingcalculation.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { DetailsComponent } from '../details/details.component';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams, CellClickedEvent } from 'ag-grid-community';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  clientId: any;

  // Paginator for Table 1
  @ViewChild('table1Paginator') table1Paginator: MatPaginator;

  // Paginator for Table 2
  @ViewChild('table2Paginator') table2Paginator: MatPaginator;
  @ViewChild('table3Paginator') table3Paginator: MatPaginator;
  selectedInvoiceJobs: any;
  selectedGeneratedInvoiceJobs: any[];
  selectedConfirmInvoiceJobs: any[];
  totalRate: number = 0;
  SelectedListItem: number = 0;
  sendinginvoiceNumber: any;
  context: any;


  constructor(private http: HttpClient, private loginservice: LoginService, private _empService: PricingcalculationService, private dialog: MatDialog, private spinnerService: SpinnerService, private router: Router) { }

  displayedColumns: string[] = [
    'selected',
    'Client',
    'Jobid',
    'Jobdate',
    'FileName',
    'ProjectCode',
    'Department',
    'JobStatus',
    'scope',
    'StitchCount',
    'estimatedtime',
    'rate',
    'ESTFileReceivedDate',
    'ESTDateofUpload',
    'nonbillableupload'
  ];










  selectedInvoices: any[] = [];
  // setAll(completed: boolean, item: any) {

  //   if (completed == true) {
  //     this.selectedInvoices.push(item)
  //   }
  //   else {

  //     if (this.selectedInvoices.find(x => x.id == item.id)) {
  //       this.selectedInvoices = this.selectedInvoices.filter(x => {
  //         if (x.id != item.id) {
  //           return item
  //         }
  //       })
  //     }
  //   }

  // }



  selectedGeneratedInvoices: any[] = [];
  setGeneratedAll(completed: boolean, item: any) {

    if (completed == true) {
      this.selectedGeneratedInvoices.push({ ...item, BillingCycleType: item.BillingCycleType ? item.BillingCycleType : 0, specialPrice: item.specialPrice ? item.specialPrice : 0 })
    }
    else {

      if (this.selectedGeneratedInvoices.find(x => x.id == item.id)) {
        this.selectedGeneratedInvoices = this.selectedGeneratedInvoices.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }

  }



  openDialog() {

    if (this.gridApi1.getSelectedRows().length === 0) {
      // Show alert message
      Swal.fire(
        'Alert!',
        'Please select the list item!',
        'info'
      )
      return;
    }
    else {
      this.spinnerService.requestStarted();

      this.gridApi1.getSelectedRows().forEach(x => this.setAll(x));
      if (this.selectedInvoice.length > 0) {
        this.selectedInvoiceJobs = this.selectedInvoice;
      }
      let result: any = {
        "jobId": " ",
        "shortName": " ",
        "scopeId": 0,
        "scopeDesc": " ",
        "clientId": this.myForm.value?.ClientId,
        "billingCycleType": "",
        "dateofUpload": new Date().toISOString,
        "createdBy": this.loginservice.getUsername(),
        "departmentId": 0,
        "tranId": 0,
        "id": 0,
        "jId": 0,
        "pricingTypeId": 0,
        "getInvoice": this.selectedInvoiceJobs,
        "fileReceivedDate": new Date().toISOString,
        "isBillable": true,
        "specialPrice": 0,
        "estimatedTime": 0,
        "isWaiver": true,
        "jobStatusId": 0
      }


      this.http.post<any>(environment.apiURL + 'Invoice/GenerateInvoice', result).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe((results: any) => {
        // Set the search results in the data source
        this.spinnerService.requestEnded();

        Swal.fire(
          '',
          results.stringList,
          'info'
        ).then((response) => {
          if (response.isConfirmed) {
            this.myForm.reset();
            this.rowData = [];
            window.location.reload();
          }
        })
      }
      )
    }

  }



  ngOnInit(): void {
    this.getClient();
    this.getConfirmInvoiceTable();
  }
  getClient() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'Invoice/GetClient').subscribe(data => {
      this.spinnerService.requestEnded();
      this.data = data;
      this.ClientGeneratedata = data;
    }, error => {
      this.spinnerService.resetSpinner();
    });
  }
  data: any = {
    clientList: [],
  };
  ClientGeneratedata: any = {
    clientList: [],
  };

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  myForm = new FormGroup({

    fromDate: new FormControl("", Validators.required),
    toDate: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required)
  });





  getEmployeeList() {
    this.spinnerService.requestStarted();
    this._empService.getEmployeeList().subscribe({

      next: (res) => {
        this.spinnerService.requestEnded();
        this.dataSource = new MatTableDataSource(res);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.table1Paginator;


      }
    });
  }
  onSubmit() {
    // Call the API to get the search results
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'Invoice/GetClientDetails', {
      "clientId": this.myForm.value?.ClientId,
      "fromDate": this.myForm.value?.fromDate,
      "toDate": this.myForm.value?.toDate
    }).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((results: any) => {
      // Set the search results in the data source
      this.spinnerService.requestEnded();
      this.rowData = results.getInvoice;
    }
    )
  }



  ///Genrated Invoice
  Clientid: any;
  GenratedInvoicedataSource = new MatTableDataSource();
  displayedGenaratedInvoiceColumns: string[] = [
    'selected', 'Client', 'JobId', 'JobDate', 'FileName', 'ProjectCode',
    'Department', 'JobStatus', 'Scope', 'StitchCount',
    'EstimatedTime', 'PricingType', 'ESTFileReceived', 'ESTDateofUpload',
    'Rate'
  ];

  getGeneratedInvoice() {
    let payload = {
      "clientId": this.ClientGeneratedId
    }
    this.spinnerService.requestStarted();

    this.http.post<any>(environment.apiURL + `Invoice/GetCalculatedPrice`, payload).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(result => {
      this.spinnerService.requestEnded();

      // Calculate the total rate
      this.totalRate = result.getInvoice.reduce((acc, row) => acc + row.rate, 0);
      this.table2rowData = result.getInvoice;
    })
  }

  ///confirm invoicr////
  ConfirmInvoicedataSource = new MatTableDataSource();

  getConfirmInvoiceTable() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Invoice/GetAllInvoiceMasterDetails`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.spinnerService.requestEnded();
      this.table3rowData = results.getInvoice;
    })
  }

  displayedConfirmInvoiceColumns: string[] = [
    'selected', 'Client', 'InvoiceNo', 'InvoiceDate', 'ProductValue', 'WaiverAmount',
    'RoundOff', 'ArtInvoiceAmount', 'DigiInvoiceAmount', 'Invoice',
    'Discount', 'ArtPayableAmount', 'ArtFileCount', 'DigiPayableAmount',
    'DigiFileCount', 'Payable', 'PaymentMode'
  ];

  openConfirmDialog(data) {

    const dialogRef = this.dialog.open(DetailsComponent, {
      data
    });


    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getConfirmInvoiceTable();

        }
      },
    });
  }
  ClientGeneratedId: number = 0;



  btnSubmitRecalculate() {

    if (this.gridApi2.getSelectedRows().length === 0) {
      Swal.fire(
        'Alert!',
        'Please Select a Client.',
        'info'
      )
    }
    else {
      this.gridApi2.getSelectedRows().forEach(x => this.setEmployeeAll(x));
      if (this.selectedGeneratedInvoice.length > 0) {
        this.selectedGeneratedInvoiceJobs = this.selectedGeneratedInvoice;
      }

      let payload = {
        "jobId": "",
        "shortName": "",
        "scopeId": 0,
        "scopeDesc": "",
        "clientId": this.ClientGeneratedId,
        "billingCycleType": "",
        "dateofUpload": "2023-08-21T11:59:16.821Z",
        "createdBy": this.loginservice.getUsername(),
        "departmentId": 0,
        "tranId": 0,
        "id": 0,
        "jId": 0,
        "pricingTypeId": 0,
        "getInvoice": this.selectedGeneratedInvoiceJobs,
        "fileReceivedDate": "2023-08-21T11:59:16.821Z",
        "isBillable": true,
        "specialPrice": 0,
        "estimatedTime": 0,
        "isWaiver": true,
        "jobStatusId": 0
      }
      this.spinnerService.requestStarted();

      this.http.post<any>(environment.apiURL + `Invoice/GenerateReCalculateInvoice`, payload).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(results => {
        this.spinnerService.requestEnded();

        Swal.fire(
          'Done!',
          results.stringList,
          'success'
        ).then((res) => {
          if (res.isConfirmed) {
            this.table2rowData = [];
            window.location.reload();
          }
        })
      })
    }


  }


  btnSubmitConfirm() {

    if (this.gridApi2.getSelectedRows().length === 0) {
      Swal.fire(
        'Alert!',
        'Please Select a Client.',
        'info'
      )
    }
    else {

      this.gridApi2.getSelectedRows().forEach(x => this.setEmployeeAll(x));
      if (this.selectedGeneratedInvoice.length > 0) {
        this.selectedGeneratedInvoiceJobs = this.selectedGeneratedInvoice;
      }
      let payload = {
        "jobId": "string",
        "shortName": "string",
        "scopeId": 0,
        "scopeDesc": "string",
        "clientId": this.clientId,
        "billingCycleType": "",
        "dateofUpload": "2023-08-21T13:54:54.873Z",
        "createdBy": this.loginservice.getUsername(),
        "departmentId": 0,
        "tranId": 0,
        "id": 0,
        "jId": 0,
        "pricingTypeId": 0,
        "getInvoice": this.selectedGeneratedInvoiceJobs,
        "fileReceivedDate": "2023-08-21T13:54:54.873Z",
        "isBillable": true,
        "specialPrice": 0,
        "estimatedTime": 0,
        "isWaiver": true,
        "jobStatusId": 0
      }
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + `Invoice/GenerateConfirmInvoice`, payload).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(results => {
        this.spinnerService.requestEnded();

        if (results.stringList == "VoucherControl is Missing") {
          Swal.fire(
            'alert!',
            results.stringList,
            'info'
          )
        }
        else {
          Swal.fire(
            'Done!',
            results.stringList,
            'success'
          ).then((res) => {
            if (res.isConfirmed) {
              this.table2rowData = [];
              window.location.reload();
            }
          })
        }
      })
    }
  }



  /////////////SelectedAll function////
  selection = new SelectionModel<any>(true, []);
  selection1 = new SelectionModel<any>(true, []);
  selection3 = new SelectionModel<any>(true, []);
  selection4 = new SelectionModel<any>(true, []);
  filterValue: any
  filterValue1: any
  filterValue2: any




  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.SelectedListItem = numSelected;
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

  employeeFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectedInvoice: any[] = [];

  setAll(item: any) {
    console.log(item, "InvoiceItems")
    this.selectedInvoice.push({
      ...item,
      specialPrice: item.specialPrice ? item.specialPrice : 0,
      billingCycleType: item.billingCycleType ? item.billingCycleType : " ",
      ScopeDesc: ''
    });
  }








  ////2nd taBLE
  isEmplSelected() {
    const numSelected = this.selection1.selected.length;
    const numRows = this.GenratedInvoicedataSource.data.length;
    return numSelected === numRows;
  }

  emplMasterToggle() {
    if (this.isEmplSelected()) {
      this.selection1.clear();
    }
    else if (this.filterValue1) {
      this.selection1.clear();
      this.GenratedInvoicedataSource.filteredData.forEach(x => this.selection1.select(x));
    } else {
      this.GenratedInvoicedataSource.data.forEach(row => this.selection1.select(row));
    }

  }

  applyFilter(event: Event) {
    this.filterValue1 = (event.target as HTMLInputElement).value;
    this.GenratedInvoicedataSource.filter = this.filterValue1.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.GenratedInvoicedataSource.paginator) {
      this.GenratedInvoicedataSource.paginator.firstPage();
    }
  }
  selectedGeneratedInvoice: any[] = [];
  setEmployeeAll(item: any) {
    console.log(item, "generatedInvoices");

    this.selectedGeneratedInvoice.push({
      ...item,
      billingCycleType: item.billingCycleType ? item.billingCycleType : " ",
      specialPrice: item.specialPrice ? item.specialPrice : 0


    });
  }





  ///3rd 

  isConfirmSelected() {
    const numSelected = this.selection3.selected.length;
    const numRows = this.ConfirmInvoicedataSource.data.length;
    return numSelected === numRows;
  }

  confcMasterToggle() {
    if (this.isConfirmSelected()) {
      this.selection3.clear();
    }
    else if (this.filterValue2) {
      this.selection3.clear();
      this.ConfirmInvoicedataSource.filteredData.forEach(x => this.selection3.select(x));
    } else {
      this.ConfirmInvoicedataSource.data.forEach(row => this.selection3.select(row));
    }

  }

  confirmFilter(event: Event): void {
    this.filterValue2 = (event.target as HTMLInputElement).value;
    this.ConfirmInvoicedataSource.filter = this.filterValue2.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.ConfirmInvoicedataSource.paginator) {
      this.ConfirmInvoicedataSource.paginator.firstPage();
    }
  }
  selectedConfirmInvoice: any[] = [];
  setConfirmAll(item: any) {
    console.log(item, "selectedConfirmInvoice");

    this.selectedConfirmInvoice.push({
      ...item,

    });
  }


  
  openArtInvoice() {
    const selectedRows = this.gridApi3.getSelectedRows();

    if (selectedRows.length === 0) {
      // Show alert message
      Swal.fire(
        'Alert!',
        'Please select at least one invoice!',
        'info'
      );
      return;
    }
  
    selectedRows.forEach(row => {
      const invoiceNumber = row.invoiceNo;
      const shortName = row.shortName;

      const queryParams = { InvoiceNo: invoiceNumber ,ShortName:shortName};
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/topnavbar/acc-SSRS'], { queryParams })
      );
      const redirectURL = document.location.origin + '/#' + url;
      window.open(redirectURL, '_blank');
    });
  }

  DigiArtInvoice() {
    const selectedRows = this.gridApi3.getSelectedRows();

    if (selectedRows.length === 0) {
      // Show alert message
      Swal.fire(
        'Alert!',
        'Please select the list item!',
        'info'
      )
      return;
    }
    else {
      // this.spinnerService.requestStarted();

      selectedRows.forEach(row => {
        const invoiceNumber = row.invoiceNo;
        const shortName = row.shortName;

        const queryParams = { InvoiceNo: invoiceNumber ,ShortName:shortName};
        const url = this.router.serializeUrl(
          this.router.createUrlTree(['/topnavbar/acc-generatedinvoice'], { queryParams })
        );
        const redirectURL = document.location.origin + '/#' + url;
        window.open(redirectURL, '_blank');
      });
    }
  }
  Invoice() {
    const selectedRows = this.gridApi3.getSelectedRows();

    if (selectedRows.length === 0) {
      // Show alert message
      Swal.fire(
        'Alert!',
        'Please select the list item!',
        'info'
      )
      return;
    }
    else {
      // this.spinnerService.requestStarted();


      selectedRows.forEach(row => {
        console.log(row,"RowData");
        
        const invoiceNumber = row.invoiceNo;
        const shortName = row.shortName;
        const queryParams = { InvoiceNo: invoiceNumber ,ShortName:shortName};
        const url = this.router.serializeUrl(
          this.router.createUrlTree(['/topnavbar/acc-popupinvoice'], { queryParams })
        );
        const redirectURL = document.location.origin + '/#' + url;
        window.open(redirectURL, '_blank');
      });
    }
  }
  /////////////////////////Ag-grid module///////////////////////////////
  @ViewChild('agGrid1') agGrid1: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;
  @ViewChild('agGrid3') agGrid3: AgGridAngular;

  private gridApi1!: GridApi;
  private gridApi2!: GridApi;
  private gridApi3!: GridApi;


  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  public table2defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isSecondColumn,
    checkboxSelection: isSecondColumn,
  };
  public table3defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isThirdColumn,
    checkboxSelection: isThirdColumn,
  };

  table1def: ColDef[] = [
    { headerName: 'Client ', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Id', field: 'jobId', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Date', field: 'estJobDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'File Name', field: 'fileName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Project Code', field: 'projectCode', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Department', field: 'department', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Status', field: 'jobStatusDescription', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Scope', field: 'description', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Stitch Count', field: 'stitchCount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Estimated Time', field: 'estimatedTime', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Rate', field: 'specialPrice', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'EST File Received Date', field: 'estFileReceivedDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'ESTDateofUpload', field: 'estDateofUpload', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Non-Billable', field: 'nonBillable' ? 'nonBillable' : '', filter: 'agTextColumnFilter',
      floatingFilter: true, },

  ];
  table2def: ColDef[] = [

    { headerName: 'Client', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Id', field: 'jobId', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Date', field: 'estJobDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'File Name', field: 'fileName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Project Code', field: 'projectCode', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Department', field: 'department', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Job Status', field: 'jobStatusDescription', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Scope', field: 'scopeDesc', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Stitch Count', field: 'stitchCount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'EstimatedTime', field: 'estimatedTime', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'PricingType', field: 'description', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'ESTFileReceivedDate', field: 'estFileReceivedDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'EST Date of upload', field: 'estDateofUpload', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Rate', field: 'rate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  ];

  table3def: ColDef[] = [

    { headerName: 'Client', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Invoice Number', field: 'invoiceNo', filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { color: 'skyblue', 'cursor': 'pointer' } },
    { headerName: 'Invoice Date', field: 'invoiceDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Product Value', field: 'productValue', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'waiver Amount', field: 'waiver', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'RoundOff', field: 'roundOff', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'ArtInvoiceAmount', field: 'artInvoiceAmount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'DigiInvoiceAmount', field: 'digiInvoiceAmount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Invoice', field: 'invoiceValue', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Discount', field: 'discount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'ArtPayableAmount', field: 'artPayableAmount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'ArtFileCount', field: 'artFileCount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'DigiPayableAmount', field: 'digiPayableAmount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'DigiFileCount', field: 'digiFileCount', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Payable', field: 'totalInvoiceValue', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'PaymentMode', field: 'paymentMode', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  ];

  onCellClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'invoiceNo') {
      console.log(data, "invoiceNo");

      this.openConfirmDialog(data);
    }
  }

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public table2rowSelection: 'single' | 'multiple' = 'multiple';
  public table3rowSelection: 'single' | 'multiple' = 'multiple';

  public rowData: any[] = [];
  public table2rowData: any[] = [];
  public table3rowData: any[] = [];

  public themeClass: string =
    "ag-theme-quartz";

  onGridReady1(params: GridReadyEvent) {
    this.gridApi1 = params.api;
  }

  onGridReady2(params: GridReadyEvent) {
    this.gridApi2 = params.api;
  }

  onGridReady3(params: GridReadyEvent) {
    this.gridApi3 = params.api;
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Invoice/GetAllInvoiceMasterDetails`).subscribe(results => {
      this.table3rowData = results.getInvoice;
      this.spinnerService.requestEnded();

    })
  }
  onSelectionChanged() {
    const selectedRows1 = this.gridApi1.getSelectedRows();
    this.SelectedListItem = selectedRows1.length
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
  params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

function isSecondColumn(
  params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsSecondColumn = displayedColumns[0] === params.column;
  return thisIsSecondColumn;
}

function isThirdColumn(
  params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsSecondColumn = displayedColumns[0] === params.column;
  return thisIsSecondColumn;
}