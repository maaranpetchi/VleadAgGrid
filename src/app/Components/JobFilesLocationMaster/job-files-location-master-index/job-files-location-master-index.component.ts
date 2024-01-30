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
import { catchError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-job-files-location-master-index',
  templateUrl: './job-files-location-master-index.component.html',
  styleUrls: ['./job-files-location-master-index.component.scss']
})
export class JobFilesLocationMasterIndexComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Department', 'Customer', 'SharedFilePath', 'ProcessName', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  editedResults: any;
  payloadId: any;
  processId: any;

  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerService, private builder: FormBuilder,
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
  }
  jobFilesLocationForm: FormGroup;
  customer = new FormControl('', Validators.required);
  department = new FormControl('', Validators.required);
  ftpfilepath = new FormControl('', Validators.required);
  selectedprocessname = new FormControl('', Validators.required);
  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
      this.dataSource = new MatTableDataSource(employees.jobslist);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
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
        "id": 0,
        "clientId": this.selectedClientId,
        "departmentId": this.selectedDepartmentId,
        "ftpfilePath": this.FTPFilePath,
        "processId": 0,
        "processName": this.SelectedProcessName,
        "createdBy": 0,
        "createdUtc": new Date().toISOString,
        "updatedBy": 0,
        "updatedUtc": "2023-08-26T08:18:53.902Z",
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
          "createdUtc": "2023-08-26T08:18:53.902Z",
          "updatedUtc": "2023-08-26T08:18:53.902Z",
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
          "approvedDate": "2023-08-26T08:18:53.902Z",
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
          "trialStartDate": "2023-08-26T08:18:53.903Z",
          "liveStartDate": "2023-08-26T08:18:53.903Z",
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
          "createdUtc": "2023-08-26T08:18:53.903Z",
          "updatedUtc": "2023-08-26T08:18:53.903Z",
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


        Swal.fire(
          'Done!',
          'Updated Data Successfully!',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.getFetchTables();
          }
        })
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
}
