import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { environment } from 'src/Environments/environment';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { error } from 'jquery';
import { Subscription, catchError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { customernormsrenderingcomponent } from '../../CustomerNorms/customernormsindex/customerNormsRendering.component';
import { jobfilerenderingcomponent } from '../jobFileRendering.componet';
import { EditService } from 'src/app/Services/Displayorhideform/edit-service.service';
import { LoginService } from 'src/app/Services/Login/login.service';
@Component({
  selector: 'app-job-files-location-master-index',
  templateUrl: './job-files-location-master-index.component.html',
  styleUrls: ['./job-files-location-master-index.component.scss']
})
export class JobFilesLocationMasterIndexComponent implements OnInit {
  displayedColumns: string[] = ['Department', 'Customer', 'SharedFilePath', 'ProcessName', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  editedResults: any;
  payloadId: any;
  processId: any;
context: any='jobFilesLocation';
  subscription: Subscription;
  gettingData: any;

  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerService, private builder: FormBuilder,private editservice:EditService,private loginservice:LoginService
  ) { }
  ngOnInit(): void {
    this.loadCustomers();
    this.getprocess();
    this.getFetchTables();
    this.jobFilesLocationForm = this.builder.group({
      customer: this.customer,
      department: this.department,
      ftpfilepath: this.ftpfilepath,
      selectedprocessname: this.selectedprocessname,
    });


    this.subscription = this.editservice.editTriggered$.subscribe(() => {

      this.gettingData = this.editservice.getViewData();
      console.log(this.gettingData,"gettingData");
      this.AddVisible = false;
      this.UpdateVisible = true;

      this.selectedClientId = this.gettingData.customer.id;
      this.SelectedProcessName = this.gettingData.processName;
      this.selectedDepartmentId = this.gettingData.department.id;
      this.FTPFilePath = this.gettingData.ftpfilePath;
      this.payloadId = this.gettingData.id;
      this.processId = this.gettingData.processId;
    });
  }
  jobFilesLocationForm: FormGroup;
  customer = new FormControl('', Validators.required);
  department = new FormControl('', Validators.required);
  ftpfilepath = new FormControl('', Validators.required);
  selectedprocessname = new FormControl('', Validators.required);


  openEditForm(id) {
    this.AddVisible = false;
    this.UpdateVisible = true;
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Customer/CustomerJobLocUpdate?id=${id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (results) => {
        this.spinnerService.requestEnded();

        this.selectedClientId = results.jobslist.clientId;
        this.payloadId = results.jobslist.id;
        this.processId = results.jobslist.processId;
        this.selectedDepartmentId = results.jobslist.departmentId;
        this.FTPFilePath = results.jobslist.ftpfilePath;
        this.SelectedProcessName = results.jobslist.processName;
      }
    })
  }

  getFetchTables() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Report/GetLocationForJobOut`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(employees => {
      this.spinnerService.requestEnded();
      this.rowData = employees.jobslist;

    });
  }

  //topcard
  //Array
  customers: any[] = [];
  Departments: any[] = [];

  //ngmodel
  selectedClientId: any;
  selectedDepartmentId: any;
  FTPFilePath: any;
  SelectedProcessName: any;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  //Boolean
  AddVisible: boolean = true;
  UpdateVisible: boolean = false;
  //Mrthod
  loadCustomers(): void {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Dropdown/GetCustomers`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(

      (customers) => {
        this.spinnerService.requestEnded();

        this.customers = customers;
      }
    );
  }
  getprocess(): void {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Report/GetProcess`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(

      (departments) => {
        this.spinnerService.requestEnded();

        this.Departments = departments.departmentList;
      }
    );
  }

  //submitadd
  CreateCustomerContact() {
    this.jobFilesLocationForm.markAllAsTouched();
    if (this.jobFilesLocationForm.invalid) {
      for (const control of Object.keys(this.jobFilesLocationForm.controls)) {
        this.jobFilesLocationForm.controls[control].markAsTouched();
      }
    }
    else {
      let payload = {
        "id": this.payloadId,
        "clientId": this.selectedClientId,
        "departmentId": this.selectedDepartmentId,
        "ftpfilePath": this.FTPFilePath,
        "processId": this.processId,
        "processName": this.SelectedProcessName,
        "createdBy": 0,
        "createdUtc": "2023-08-26T09:47:17.439Z",
        "updatedBy": this.loginservice.getUsername(),
        "updatedUtc": new Date().toISOString,
        "isActive": true,
        "customer": {
          "id": 0,
          "companyId": 0,
          "name": " ",
          "shortName": " ",
          "customerClassificationId": 0,
          "customerJobType": " ",
          "creditDays": 0,
          "isBlacklisted": true,
          "blacklistedReasons": " ",
          "createdUtc": new Date().toISOString,
          "updatedUtc": new Date().toISOString,
          "createdBy": 0,
          "updatedBy": 0,
          "isDeleted": true,
          "timeZoneId": 0,
          "creditLimit": 0,
          "creditLimitAvailed": 0,
          "billingCycleType": " ",
          "middleName": " ",
          "lastName": " ",
          "approvedBy": 0,
          "approvedDate": new Date().toISOString,
          "fax": " ",
          "phone1": " ",
          "isApproved": true,
          "timezone": " ",
          "timezoneDescription": " ",
          "timezoneType": " ",
          "reportTimeZone": " ",
          "country": " ",
          "state": " ",
          "city": " ",
          "isAdmin": true,
          "inputType": " ",
          "outputType": " ",
          "nativeTimeZoneDifference": 0,
          "rpttimeZoneDifference": 0,
          "isBulk": true,
          "privilegedClient": " ",
          "paymentMode": " ",
          "cusRegId": 0,
          "bunchMail": true,
          "isManualUpload": true,
          "isJobFilesNotTransfer": true,
          "divisionId": 0,
          "isRush": true,
          "trialStartDate": new Date().toISOString,
          "liveStartDate": new Date().toISOString,
          "modeofSales": " ",
          "currencyMode": " ",
          "checklist": true,
          "lostCustomerStatus": " ",
          "isEstimatedTime": true,
          "Company":[],
          "CustomerClassification":[],
          "company": {
            "id": 0,
            "name": " ",
            "address1": " ",
            "address2": " ",
            "address3": " ",
            "locationId": 0,
            "cstno": " ",
            "tinno": " ",
            "email": " ",
            "phone1": " ",
            "phone2": " ",
            "webAddress": " ",
            "createdUtc": new Date().toISOString,
            "updatedUtc": new Date().toISOString,
            "createdBy": 0,
            "updatedBy": 0,
            "isActive": true,
            "isInvoiceDisplay": true,
            "cinno": " ",
            "location": {
              "id": 0,
              "description": " ",
              "locationCode": 0,
              "contraLocationId": 0,
              "locationHeaderDescription": " ",
              "zipcode": " ",
              "isDeleted": true,
              "createdUtc": new Date().toISOString,
              "updatedUtc": new Date().toISOString,
              "createdBy": 0,
              "updatedBy": 0,
              "timeZoneId": 0,
              "timezoneDescription": " ",
              "timezoneDifference": " ",
              "dayLightTimezoneDifference": " "
            }
          },
          "customerClassification": {
            "id": 0,
            "description": " ",
            "isDeleted": true,
            "createdUtc": new Date().toISOString,
            "updatedUtc": new Date().toISOString,
            "createdBy": 0,
            "updatedBy": 0
          },
          "timeZone": {
            "id": 0,
            "description": " ",
            "istdiff": " ",
            "timezoneDiff": " ",
            "isDeleted": true,
            "name": " "
          }
        },
        "department": {
          "id": 0,
          "description": " ",
          "isDeleted": true,
          "createdUtc": new Date().toISOString,
          "updatedUtc": new Date().toISOString,
          "createdBy": 0,
          "updatedBy": 0
        }
      
      }
      this.spinnerService.requestStarted();

      this.http.post<any>(environment.apiURL + `Customer/createJobFilesLocationMaster`, payload).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(results => {
        this.spinnerService.requestEnded();

        Swal.fire(
          results.message,
        ).then((result) => {
          if (result.isConfirmed) {
            this.getFetchTables();
            this.jobFilesLocationForm.reset();
          }
        })
      })
    }
  }


  UpdateCustomerContact() {
    this.jobFilesLocationForm.markAllAsTouched();
    if (this.jobFilesLocationForm.invalid) {
      for (const control of Object.keys(this.jobFilesLocationForm.controls)) {
        this.jobFilesLocationForm.controls[control].markAsTouched();
      }
    }
    else {
      let payload = {
        "id": this.payloadId,
        "clientId": this.selectedClientId,
        "departmentId": this.selectedDepartmentId,
        "ftpfilePath": this.FTPFilePath,
        "processId": this.processId,
        "processName": this.SelectedProcessName,
        "createdBy": 0,
        "createdUtc": "2023-08-26T09:47:17.439Z",
        "updatedBy": 0,
        "updatedUtc": new Date().toISOString,
        "isActive": true,
        "customer": {
          "id": 0,
          "companyId": 0,
          "name": "string",
          "shortName": "string",
          "customerClassificationId": 0,
          "customerJobType": "string",
          "creditDays": 0,
          "isBlacklisted": true,
          "blacklistedReasons": "string",
          "createdUtc": "2023-08-26T09:47:17.439Z",
          "updatedUtc": "2023-08-26T09:47:17.439Z",
          "createdBy": 0,
          "updatedBy": 0,
          "isDeleted": true,
          "timeZoneId": 0,
          "creditLimit": 0,
          "creditLimitAvailed": 0,
          "billingCycleType": "string",
          "middleName": "string",
          "lastName": "string",
          "approvedBy": 0,
          "approvedDate": "2023-08-26T09:47:17.439Z",
          "fax": "string",
          "phone1": "string",
          "isApproved": true,
          "Timezone": "string",
          "timezoneDescription": "string",
          "timezoneType": "string",
          "reportTimeZone": "string",
          "country": "string",
          "state": "string",
          "city": "string",
          "isAdmin": true,
          "inputType": "string",
          "outputType": "string",
          "nativeTimeZoneDifference": 0,
          "rpttimeZoneDifference": 0,
          "isBulk": true,
          "privilegedClient": "string",
          "paymentMode": "string",
          "cusRegId": 0,
          "bunchMail": true,
          "isManualUpload": true,
          "isJobFilesNotTransfer": true,
          "divisionId": 0,
          "isRush": true,
          "trialStartDate": "2023-08-26T09:47:17.439Z",
          "liveStartDate": "2023-08-26T09:47:17.439Z",
          "modeofSales": "string",
          "currencyMode": "string",
          "checklist": true,
          "lostCustomerStatus": "string",
          "TimeZoneNavigation": {
            "id": 0,
            "description": "string",
            "istdiff": "string",
            "timezoneDiff": "string",
            "isDeleted": true,
            "name": "string"
          }
        },
        "department": {
          "id": 0,
          "description": "string",
          "isDeleted": true,
          "createdUtc": "2023-08-26T09:47:17.439Z",
          "updatedUtc": "2023-08-26T09:47:17.439Z",
          "createdBy": 0,
          "updatedBy": 0
        }
      }
      this.spinnerService.requestStarted();

      this.http.post<any>(environment.apiURL + `Customer/UpdateJobLocationInfo`, payload).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(results => {
        this.spinnerService.requestEnded();

 const statusCode = results.status;
        console.log('Status Code:', statusCode);
        if(statusCode === 200){

        Swal.fire(
          'Done!',
          'Updated Data Successfully!',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.getFetchTables();
          }


        }
        )}
        else{
          Swal.fire(
            'Info!',
            'Data Not Updated Successfully!',
            'info'
          )
        }
      })
    }
    
  }


  reset() {
    this.AddVisible = true;
    this.UpdateVisible = false;
    this.selectedClientId = '';
    this.selectedDepartmentId = '';
    this.FTPFilePath = '';
    this.SelectedProcessName = '';
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
  { headerName: 'Department', field:'department.description', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Customer', field:'customer.name', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Shared File path', field:'ftpfilePath', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  { headerName: 'Process Name', field:'processName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
  {
    headerName: 'Actions',
    field: 'action',
    cellRenderer: jobfilerenderingcomponent, // JS comp by Direct Reference
    autoHeight: true,
  }
];

public rowSelection: 'single' | 'multiple' = 'multiple';
public rowData: any[]=[];
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