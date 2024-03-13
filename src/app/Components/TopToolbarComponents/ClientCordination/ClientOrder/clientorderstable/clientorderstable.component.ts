import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FileconvertComponent } from './fileconvert/fileconvert.component';
import { ClientdetailspopupComponent } from '../clientdetailspopup/clientdetailspopup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientorderviewComponent } from '../clientorderview/clientorderview.component';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import {
  CheckboxSelectionCallbackParams,
  ColDef,
  GridApi,
  GridReadyEvent,
  GridOptions,
  HeaderCheckboxSelectionCallbackParams,
} from 'ag-grid-community';
import { ActionsCellRendererComponent } from '../actions-cell-renderer/actions-cell-renderer.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
@Component({
  selector: 'app-clientorderstable',
  templateUrl: './clientorderstable.component.html',
  styleUrls: ['./clientorderstable.component.scss']
})
export class ClientorderstableComponent implements OnInit {
  context: any;
  ngOnInit(): void {
    // //DivisionApiDatadropdown
    this.fetchdivision();

    // this.bindingjobs();

  }

  @ViewChild('popupComponent') popupComponent: ElementRef;
  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();

  DivisionApiData: any[];
  selectdivision: number = 0;

  displayedColumns: string[] = [
    'selected',
    'client',
    'customerSatisfaction',
    'fileName',
    'fileReceivedEstDate',
    'department',
    'quoteparentid',
    'instruction',
    'salespersonname',
    'transactiontype',
    'action',
    'filecount'
  ];
  NewJobCount: any;
  QuoteJobCount: any;
  ConvertedJobCount: any;
  DeleteJobCount: any;
  QuoteNotApproveJobCount: any;
  parameterData: any;

  visibility() {
    let result: string[] = [];
    if (this.displayedColumnsvisibility.selected) {
      result.push('selected');
    }

    if (this.displayedColumnsvisibility.jobid) {
      result.push('jobid');
    }
    if (this.displayedColumnsvisibility.client) {
      result.push('client');
    }
    if (this.displayedColumnsvisibility.customerSatisfaction) {
      result.push('customerSatisfaction');
    }
    if (this.displayedColumnsvisibility.fileName) {
      result.push('fileName');
    }
    if (this.displayedColumnsvisibility.fileReceivedEstDate) {
      result.push('fileReceivedEstDate');
    }
    if (this.displayedColumnsvisibility.department) {
      result.push('department');
    }
    if (this.displayedColumnsvisibility.quoteparentid) {
      result.push('quoteparentid');
    }
    if (this.displayedColumnsvisibility.instruction) {
      result.push('instruction');
    }
    if (this.displayedColumnsvisibility.salespersonname) {
      result.push('salespersonname');
    }
    if (this.displayedColumnsvisibility.transactiontype) {
      result.push('transactiontype');
    }
    if (this.displayedColumnsvisibility.action) {
      result.push('action');
    }
    if (this.displayedColumnsvisibility.fileInwardMode) {
      result.push('fileInwardMode');
    }
    if (this.displayedColumnsvisibility.filecount) {
      result.push('filecount');
    }
    return result;
  }


  displayedColumnsvisibility: any = {
    'selected': true,
    'jobid': false,
    'client': true,
    'customerSatisfaction': true,
    'fileName': true,
    'fileReceivedEstDate': true,
    'department': true,
    'quoteparentid': true,
    'instruction': true,
    'salespersonname': true,
    'transactiontype': true,
    'action': true,
    'actionicon': true,
    'fileInwardMode': false,
    'filecount': true,
  };
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar, private coreService: CoreService, private spinnerService: SpinnerService, private loginservice: LoginService, private sharedService: SharedService) {


  }




  // employeeFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  fetchdivision() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'ClientOrderService/nGetDivisionForJO').pipe(

      catchError((error) => {

        this.spinnerService.requestEnded();

        console.error('API Error:', error);



        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

      })

    ).subscribe(data => {
      this.spinnerService.requestEnded();
      this.DivisionApiData = data;
    });
  }

  //to save the checkbox values
  selectedproduction: any[] = [];
  // setAll(completed: boolean, item: any) {

  //   if (completed == true) {
  //     this.selectedproduction.push(item)
  //   }
  //   else {

  //     if (this.selectedproduction.find(x => x.id == item.id)) {
  //       this.selectedproduction = this.selectedproduction.filter(x => {
  //         if (x.id != item.id) {
  //           return item
  //         }
  //       })
  //     }
  //   }
  // }



  errorShowingClientName: string = '';
  bindingjobs() {
    this.spinnerService.requestStarted();
    this.gridApi.setColumnVisible('filecount', true);
    this.gridApi.setColumnVisible('action', true);
    this.gridApi.setColumnVisible('fileInwardMode', false);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('quoteparentid', true);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('jobId', false);
    this.gridApi.setColumnVisible('clientName', true);
    this.gridApi.setColumnVisible('shortName', false);
    this.http.get<any>(environment.apiURL + 'ClientOrderService/ClientOrdersExts/1').subscribe((response) => {
      this.spinnerService.requestEnded();
      this.rowData = response.data;
      console.log(this.rowData, "RowData");

    })
  }
  quotationjobs() {
    this.gridApi.setColumnVisible('filecount', false);
    this.gridApi.setColumnVisible('action', true);
    this.gridApi.setColumnVisible('fileInwardMode', false);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('quoteparentid', true);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('jobId', false);

    this.gridApi.setColumnVisible('clientName', true);
    this.gridApi.setColumnVisible('shortName', false);
    this.http.get<any>(environment.apiURL + 'ClientOrderService/ClientOrdersExts/2').pipe(

      catchError((error) => {

        this.spinnerService.requestEnded();

        console.error('API Error:', error);



        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

      })

    ).subscribe(quotation => {
      this.rowData = quotation.data;
      this.spinnerService.requestEnded();

    },
      error => {
        this.spinnerService.resetSpinner();
      });
  }
  convertedjobs() {
    this.spinnerService.requestStarted();
    this.gridApi.setColumnVisible('filecount', false);
    this.gridApi.setColumnVisible('action', true);
    this.gridApi.setColumnVisible('fileInwardMode', false);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('quoteparentid', true);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('jobId', false);
    this.gridApi.setColumnVisible('clientName', true);
    this.gridApi.setColumnVisible('shortName', false);
    this.http.get<any>(environment.apiURL + 'ClientOrderService/ClientOrdersExts/3').pipe(

      catchError((error) => {

        this.spinnerService.requestEnded();

        console.error('API Error:', error);



        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

      })

    ).subscribe(converted => {
      this.rowData = converted.data;

      this.spinnerService.requestEnded();
    },
      error => {
        this.spinnerService.resetSpinner();
      });
  }
  deletedjobs() {
    this.spinnerService.requestStarted();
    this.gridApi.setColumnVisible('filecount', false);
    this.gridApi.setColumnVisible('action', true);
    this.gridApi.setColumnVisible('fileInwardMode', false);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('quoteparentid', true);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('jobId', false);
    this.gridApi.setColumnVisible('clientName', true);
    this.gridApi.setColumnVisible('shortName', false);
    this.http.get<any>(environment.apiURL + 'ClientOrderService/ClientOrdersExts/4').pipe(

      catchError((error) => {

        this.spinnerService.requestEnded();

        console.error('API Error:', error);



        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

      })

    ).subscribe(deleted => {
      this.rowData = deleted.data;

      this.spinnerService.requestEnded();

    },
      error => {
        this.spinnerService.resetSpinner();
      });
  }
  quotenotapprovaljobs() {
    this.spinnerService.requestStarted();
    this.gridApi.setColumnVisible('filecount', false);
    this.gridApi.setColumnVisible('action', true);
    this.gridApi.setColumnVisible('fileInwardMode', false);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('quoteparentid', true);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('jobId', false);
    this.gridApi.setColumnVisible('clientName', true);
    this.gridApi.setColumnVisible('shortName', false);
    this.http.get<any>(environment.apiURL + 'ClientOrderService/ClientOrdersExts/5').pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe(quotenotapproval => {
      this.rowData = quotenotapproval.data;
      this.spinnerService.requestEnded();
    },
      error => {
        this.spinnerService.resetSpinner();
      });
  }
  queryforsp() {
    this.spinnerService.requestStarted();
    this.gridApi.setColumnVisible('filecount', false);
    this.gridApi.setColumnVisible('action', false);
    this.gridApi.setColumnVisible('fileInwardMode', true);
    this.gridApi.setColumnVisible('transactionType', false);
    this.gridApi.setColumnVisible('quoteparentid', false);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('jobId', true);
    this.gridApi.setColumnVisible('clientName', false);
    this.gridApi.setColumnVisible('shortName', true);
    this.http.get<any>(environment.apiURL + 'CustomerQuery/GetNotApprovedQueryForSPJobsToCC').pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert', 'Error occured', 'error');
      })

    ).subscribe(queryforsp => {
      this.spinnerService.requestEnded();

      this.rowData = queryforsp.queryJobs;
    },
      error => {
        this.spinnerService.resetSpinner();
      });
  }

  tab(action) {
    if (action == '1') {
      this.bindingjobs();
    }
    else if (action == '2') {
      this.quotationjobs();
    }
    else if (action == '3') {
      this.convertedjobs();
    }
    else if (action == '4') {
      this.deletedjobs();
    }
    else if (action == '5') {
      this.quotenotapprovaljobs();
    }
    else if (action == '6') {
      this.queryforsp();
    }

  }

  fileCount: number;

  openPopup(fileCount, row) {
    // Create an instance of the dialog component
    const dialogRef = this.dialog.open(FileconvertComponent, {
      width: '100vw',
      data: {
        fileCount: fileCount, row: row, divisionid: this.selectdivision
      }
    });

    // Subscribe to the afterClosed event to handle dialog close actions
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed, if needed
    });
  }

  handleKeyPress(event: KeyboardEvent, job: any) {
    const enteredNumber = (event.target as HTMLInputElement).value;

    if (event.key === 'Enter') {
      this.openPopup(enteredNumber, job);

    }
  }

  getselecteddivisions() {
    return this.selectdivision;
  }
  singleconvert(data: any) {
    //added co if starts
    if (this.selectdivision == 0) {
      Swal.fire(
        'Alert!',
        'Select Division!',
        'info'
      ).then((response) => {
        if (response.isConfirmed) {
          // this.ngOnInit();
        }
      })
    }
    else {
      let GetAllvalues = data;
      let Gridwithmultiplefilesname: any[] = [];

      let GetAddList =
      {
        FileName: GetAllvalues.fileName,
        PoNo: GetAllvalues.poNo,
        PODate: GetAllvalues.poDate,
        Remarks: GetAllvalues.instruction,
        SalesPersonName: GetAllvalues.salesPersonName,
        JobStatusId: GetAllvalues.jobStatusId,
        TransactionId: GetAllvalues.transactionType,
        DepartmentId: GetAllvalues.workType,
        ClientId: GetAllvalues.clientId,
        EmployeeId: this.loginservice.getUsername(),
        FileReceivedDate: GetAllvalues.fileReceivedDate,
        ClientOrderId: GetAllvalues.orderId,
        CCId: GetAllvalues.ccId,//
        CCEmailId: GetAllvalues.ccEmailId,//
        FileInwardTypeId: GetAllvalues.fileInwardTypeId,//
        DivisionId: this.getselecteddivisions(),// //
        getAllValues: [],
        ApparelLogoLocation: 'apparel',
        poNo: "",
        clientName: "",
        clientJobId: "",
        jobStatusDescription: "",
        username: "",
        clientSalesPerson: "",
        customerName: "",
        temp: "",
        style: "",
        projectCode: "",
        teamCode: "",
        schoolName: "",
        ground: "",
        gender: "",
        fileInwardMode: "",
        jobDescription: "",
        color: "",
        logoDimensionWidth: "",
        logoDimensionsLength: "",
        apparelLogoLocation: "",
        imprintColors1: "",
        imprintColors2: "",
        imprintColors3: "",
        virtualProof: "st",

        customerJobType: "",

        viewDatas: [],

      }
      Gridwithmultiplefilesname.push(GetAddList);
      let senddata = {
        "id": 0,
        "dateofReceived": "2023-05-12T07:08:03.495Z",
        "clientName": "",
        "clientJobId": "",
        "fileName": "",
        "jobStatusDescription": "",
        "username": "",
        "salesPersonName": "",
        "clientSalesPerson": "",
        "customerName": "",
        "temp": "",
        "style": "",
        "projectCode": "",
        "teamCode": "",
        "schoolName": "",
        "ground": "",
        "gender": "",
        "fileInwardMode": "",
        "status": true,
        "fileReceivedDate": "2023-05-12T07:08:03.495Z",
        "jobDescription": "",
        "jobStatusId": 0,
        "departmentId": 0,
        "divisionId": 0,
        "employeeId": 0,
        "clientId": 0,
        "remarks": "",
        "poNo": "",
        "fileInwardTypeId": 0,
        "color": "",
        "logoDimensionWidth": "",
        "logoDimensionsLength": "",
        "apparelLogoLocation": "",
        "imprintColors1": "",
        "imprintColors2": "",
        "imprintColors3": "",
        "virtualProof": "s",
        "dateofUpload": "2023-05-12T07:08:03.495Z",
        "dateofClose": "2023-05-12T07:08:03.495Z",
        "customerJobType": "",
        "jobDate": "2023-05-12T07:08:03.495Z",
        "clientOrderId": 0,
        "viewDatas": [
          {
            "id": 0,
            "department": "",
            "clientStatus": "",
            "dateofReceived": "2023-05-12T07:08:03.495Z",
            "clientName": "",
            "clientJobId": "",
            "fileName": "",
            "jobStatusDescription": "",
            "username": "",
            "salesPersonName": "",
            "customerName": "",
            "temp": "",
            "style": "",
            "projectCode": "",
            "teamCode": "",
            "schoolName": "",
            "ground": "",
            "gender": "",
            "fileInwardMode": "",
            "status": true,
            "dateofUpload": "",
            "priority": "",
            "clientSalesPerson": "",
            "poNo": "",
            "dateofDelivery": "",
            "division": "",
            "uploadedBy": 0
          }
        ],
        "createdBy": 0,
        "poDate": "2023-05-12T07:08:03.495Z",
        "ccId": 0,
        "ccEmailId": "",
        "dateofDelivery": "2023-05-12T07:08:03.495Z",
        "getAllValues": Gridwithmultiplefilesname
      };

      let joborderconverted = {
        GetAllValues: Gridwithmultiplefilesname,
      }

      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + 'JobOrder/DirectOrder', senddata).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);



          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

        })

      ).subscribe(convertdata => {
        let JobId = convertdata.jobId;
        this.spinnerService.requestEnded();
        if (JobId == `File Name Already Exist!,${GetAllvalues.fileName}` || JobId == "Previous Job is not closed for the File Name and Client!") {
          Swal.fire(
            'Alert!',
            JobId,
            'info'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        }
        else {
          Swal.fire(
            'Done!',
            'Data Converted Successfully!',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        }
      },
        error => {
          this.spinnerService.resetSpinner();
        })
    }
  } // added co if ends
  selectedJobs: any[] = [];
  selectedQuery: any[] = [];

  multiconvert() {
    let selectedRow = this.gridApi.getSelectedRows();
    console.log(selectedRow, "SelectedRowws");

    this.gridApi.getSelectedRows().forEach(x => this.setAll(x));
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }

    //added co if starts 
    if (this.selectdivision == 0) {
      Swal.fire(
        'Alert!',
        'Select Division!',
        'info'
      ).then((response) => {
        if (response.isConfirmed) {
          // this.ngOnInit();
        }
      })
    }
    else {
      let Gridwithmultiplefilesname: any[] = [];
      for (var i = 0; i < this.selectedproduction.length; i++) {
        let GetAllvalues = this.selectedproduction[i];
        let GetAddList =
        {
          FileName: GetAllvalues.fileName,
          PoNo: GetAllvalues.poNo,
          PODate: GetAllvalues.poDate,
          Remarks: GetAllvalues.instruction,
          SalesPersonName: GetAllvalues.salesPersonName,
          JobStatusId: GetAllvalues.jobStatusId,
          TransactionId: GetAllvalues.transactionType,
          DepartmentId: GetAllvalues.workType,
          ClientId: GetAllvalues.clientId,
          EmployeeId: this.loginservice.getUsername(),
          FileReceivedDate: GetAllvalues.fileReceivedDate,
          ClientOrderId: GetAllvalues.orderId,
          CCId: GetAllvalues.ccId,//
          CCEmailId: GetAllvalues.ccEmailId,//
          FileInwardTypeId: GetAllvalues.fileInwardTypeId,//
          DivisionId: this.getselecteddivisions(),// //
          getAllValues: [],
          ApparelLogoLocation: 'apparel',
          poNo: "",
          clientName: "",
          clientJobId: "",
          jobStatusDescription: "",
          username: "",
          clientSalesPerson: "",
          customerName: "",
          temp: "",
          style: "",
          projectCode: "",
          teamCode: "",
          schoolName: "",
          ground: "",
          gender: "",
          fileInwardMode: "",
          jobDescription: "",
          color: "",
          logoDimensionWidth: "",
          logoDimensionsLength: "",
          apparelLogoLocation: "",
          imprintColors1: "",
          imprintColors2: "",
          imprintColors3: "",
          virtualProof: "st",

          customerJobType: "",

          viewDatas: [],

        }

        Gridwithmultiplefilesname.push(GetAddList);
      }
      let senddata = {
        "id": 0,
        "dateofReceived": "2023-05-12T07:08:03.495Z",
        "clientName": "",
        "clientJobId": "",
        "fileName": "",
        "jobStatusDescription": "",
        "username": "",
        "salesPersonName": "",
        "clientSalesPerson": "",
        "customerName": "",
        "temp": "",
        "style": "",
        "projectCode": "",
        "teamCode": "",
        "schoolName": "",
        "ground": "",
        "gender": "",
        "fileInwardMode": "",
        "status": true,
        "fileReceivedDate": "2023-05-12T07:08:03.495Z",
        "jobDescription": "",
        "jobStatusId": 0,
        "departmentId": 0,
        "divisionId": 0,
        "employeeId": 0,
        "clientId": 0,
        "remarks": "",
        "poNo": "",
        "fileInwardTypeId": 0,
        "color": "",
        "logoDimensionWidth": "",
        "logoDimensionsLength": "",
        "apparelLogoLocation": "",
        "imprintColors1": "",
        "imprintColors2": "",
        "imprintColors3": "",
        "virtualProof": "s",
        "dateofUpload": "2023-05-12T07:08:03.495Z",
        "dateofClose": "2023-05-12T07:08:03.495Z",
        "customerJobType": "",
        "jobDate": "2023-05-12T07:08:03.495Z",
        "clientOrderId": 0,
        "viewDatas": [
          {
            "id": 0,
            "department": "",
            "clientStatus": "",
            "dateofReceived": "2023-05-12T07:08:03.495Z",
            "clientName": "",
            "clientJobId": "",
            "fileName": "",
            "jobStatusDescription": "",
            "username": "",
            "salesPersonName": "",
            "customerName": "",
            "temp": "",
            "style": "",
            "projectCode": "",
            "teamCode": "",
            "schoolName": "",
            "ground": "",
            "gender": "",
            "fileInwardMode": "",
            "status": true,
            "dateofUpload": "",
            "priority": "",
            "clientSalesPerson": "",
            "poNo": "",
            "dateofDelivery": "",
            "division": "",
            "uploadedBy": 0
          }
        ],
        "createdBy": 0,
        "poDate": "2023-05-12T07:08:03.495Z",
        "ccId": 0,
        "ccEmailId": "",
        "dateofDelivery": "2023-05-12T07:08:03.495Z",
        "GetAllValues": this.selectedJobs
      };
      let joborderconverted = {
        GetAllValues: Gridwithmultiplefilesname,
      }


      let filenames: string[] = [];
      for (let value of this.selectedJobs) {
        filenames.push(value.fileName);
      }

      // Assign concatenated filenames to the fileName property of senddata
      senddata.fileName = filenames.join(", ");

      console.log(filenames,"FileNames");
      
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + 'JobOrder/DirectOrder', senddata).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);



          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

        })

      ).subscribe(convertdata => {
        this.spinnerService.requestEnded();
        console.log(convertdata, "ConvertedData");

        let JobId = convertdata.jobId;

        console.log(JobId, "jOBiD");

        if (JobId == `File Name Already Exist!,${filenames}` || JobId == "Previous Job is not closed for the File Name and Client!") {
          Swal.fire(
            'info!',
            JobId,
            'info'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        }
        else {
          if (convertdata.message == `Some Order has been blocked temporarily due to Invoice Outstanding for customer- ${this.errorShowingClientName},${this.errorShowingClientName} , ${this.errorShowingClientName}, ${this.errorShowingClientName},Kindly contact respective sales person/service desk.`) {
            Swal.fire(
              'info!',
              convertdata.message,
              'info'
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
          else {
            Swal.fire(
              'Done!',
              convertdata.message,
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
        }
      });

    }

  }


  clientDetailsPop(id) {
    this.dialog.open(ClientdetailspopupComponent, {
      width: '100vw',
      data: {
        id: id
      }
    });


  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'top' // Position of the snack bar
    });
  }


  openclientorder(job) {
    const dialogRef = this.dialog.open(ClientorderviewComponent, {
      width: '50vw',
      height: 'auto',
      data: job,

    });
  }

  //select///

  selection = new SelectionModel<any>(true, []);

  filterValue: any = null;
  employeeFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
      "FileName": item.fileName ? item.fileName : '',
      "PoNo": item.poNo ? item.poNo : "",
      "PODate": item.poDate ? item.poDate : '',
      "Remarks": item.instruction ? item.instruction : "",
      "SalesPersonName": item.salesPersonName ? item.salesPersonName : '',
      "JobStatusId": item.jobStatusId ? item.jobStatusId : 0,
      "TransactionId": item.transactionType ? item.transactionType : 0,
      "DepartmentId": item.workType ? item.workType : 0,
      "ClientId": item.clientId ? item.clientId : 0,
      "EmployeeId": this.loginservice.getUsername(),
      "FileReceivedDate": item.fileReceivedDate ? item.fileReceivedDate : '',
      "ClientOrderId": item.orderId ? item.orderId : 0,
      "CCId": item.ccId ? item.ccId : 0,//
      "CCEmailId": item.ccEmailId ? item.ccEmailId : 0,//
      "FileInwardTypeId": item.fileInwardTypeId ? item.fileInwardTypeId : 0,//
      "DivisionId": this.getselecteddivisions() ? this.getselecteddivisions() : 0,// //
      "getAllValues": [],
      "ApparelLogoLocation": 'apparel',
      "clientName": "",
      "clientJobId": "",
      "jobStatusDescription": "",
      "username": "",
      "clientSalesPerson": "",
      "customerName": "",
      "temp": "",
      "style": "",
      "projectCode": "",
      "teamCode": "",
      "schoolName": "",
      "ground": "",
      "gender": "",
      "fileInwardMode": "",
      "jobDescription": "",
      "color": "",
      "logoDimensionWidth": "",
      "logoDimensionsLength": "",
      "apparelLogoLocation": "",
      "imprintColors1": "",
      "imprintColors2": "",
      "imprintColors3": "",
      "virtualProof": "",

      "customerJobType": "",

      "viewDatas": [],
    });
  }

  //textcolor
  getCellClass(data) {

    return {
      'text-color-green': data.employeeCount === 1,
      'text-color-brown': data.queryJobDate !== null,
      'text-color-blue': data.employeeCount > 1,
      'text-color-DeepSkyBlue': data.customerJobType === 'Trial',
      'text-color-yellow': data.statusId === 10,
      'text-color-red': data.statusId === 11,
      'SuperRush': data.jobStatusId === 1 || data.jobStatusId === 3 || data.jobStatusId === 7,
      'Rush': data.jobStatusId === 2 || data.jobStatusId === 4 || data.jobStatusId === 8
    };
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
    {
      headerName: 'JobId', field: 'jobId', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'ClientName', field: 'clientName', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Client Name', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'CustomerClassification', field: 'customerClassification', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'FileName', field: 'fileName', filter: 'agTextColumnFilter',
      floatingFilter: true, editable: true
    },
    {
      headerName: 'File Received EST Date', field: 'estFileReceivedDate', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Department', field: 'departmentName', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Quote Parent Id', field: 'parentJobId', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Instructions', field: 'instruction', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Sales Person Name', field: 'salesPersonName', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'TransactionType', field: 'transactionType', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: ActionsCellRendererComponent, // JS comp by Direct Reference
      autoHeight: true,
    }, { headerName: 'FileInawardMode', field: 'fileInwardMode' },
    {
      headerName: 'FileCount', field: 'filecount', editable: true,
      cellEditor: 'numericEditor'
    }
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[] = [];
  public themeClass: string =
    "ag-theme-quartz";

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

    this.gridApi.setColumnVisible('filecount', true);
    this.gridApi.setColumnVisible('action', true);
    this.gridApi.setColumnVisible('fileInwardMode', false);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('quoteparentid', true);
    this.gridApi.setColumnVisible('transactionType', true);
    this.gridApi.setColumnVisible('jobId', false);
    this.gridApi.setColumnVisible('clientName', true);
    this.gridApi.setColumnVisible('shortName', false);


    this.http
      .get<any>(
        environment.apiURL + 'ClientOrderService/ClientOrdersExts/1'
      )
      .subscribe((response) => (this.rowData = response.data));
  }

  handleCellValueChanged(params: { colDef: ColDef, newValue: any, data: any }) {
    console.log(params, "Parameter");
    console.log(params.data, "ParameterData");
    let parameterData = params.data
    if (params.colDef.field === 'filecount') { // Check if the changed column is 'price'
      this.openPopup(params.newValue, parameterData);
    }
  }


  handlePress(newvalue, parameterData) {
    console.log(newvalue, "HandlepressNewValue");
    console.log(parameterData, "ParameterValue");

  }


  onDivisionChange() {
    console.log(this.selectdivision, "SelectDivi");

    this.sharedService.setData(this.selectdivision);
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