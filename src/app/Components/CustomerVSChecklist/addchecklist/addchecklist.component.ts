import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { IndexchecklistComponent } from '../indexchecklist/indexchecklist.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-addchecklist',
  templateUrl: './addchecklist.component.html',
  styleUrls: ['./addchecklist.component.scss']
})
export class AddchecklistComponent implements OnInit {

  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService, private loginservice: LoginService, private spinnerService: SpinnerService, private router: Router, private sharedDataService: SharedService, public dialogRef: MatDialogRef<AddchecklistComponent>) {

    if (this.data && this.data.type === "edit") {
      this.fetchDataAndOpenForm();
    }
  }
  @ViewChild(IndexchecklistComponent) indexchecklistComponent!: IndexchecklistComponent;
  ngOnInit(): void {
    this.fetchCustomers();
  }

  dept = [
    { id: 1, name: 'Artwork' },
    { id: 2, name: 'Digitizing' }
  ];

  selectedDepartment: number = 0;
  selectedCustomer: number = 0;
  checklistDescription: string;

  customers: any[] = [];

  fetchDataAndOpenForm() {
    this.spinnerService.requestStarted();
    this.http.get(environment.apiURL + `CustomerVsChecklist/GetChecklistDetails?id=${this.data.data.id}`).subscribe({
      next: (data: any) => {
        this.spinnerService.requestEnded();

        this.selectedDepartment = data.dept.id;
        this.selectedCustomer = data.customer.id;
        this.checklistDescription = data.description;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        Swal.fire(
          'Error!',
          'An error occurred.',
          'error'
        );
      }

    });
  }

  fetchCustomers() {
    this.http.get<any>(environment.apiURL + `CustomerVsChecklist/GetDropDownList`).subscribe({
      next: (data) => {
        this.customers = data.customerList;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        Swal.fire(
          'Error!',
          'An error occurred .',
          'error'
        );
      }

    });
  }

  onFormSubmit() {
    const requiredFields: string[] = [];
    if (!this.selectedCustomer) {
      requiredFields.push('Customer');
    }
    if (!this.selectedDepartment) {
      requiredFields.push('Department');
    }


    if (requiredFields.length === 0) {
      if (this.data) {
        this.UpdateCheckList();
      } else {
        let payload = {
          "customerId": this.selectedCustomer,
          "departmentId": this.selectedDepartment,
          "description": this.checklistDescription,
          "employeeId": this.loginservice.getUsername()
        }
        this.spinnerService.requestStarted();
        this.http.post<any>(environment.apiURL + `CustomerVsChecklist/CreateChecklist`, payload).subscribe(results => {
          this.spinnerService.requestEnded();
          Swal.fire(
            'Done!',
            results.cvCList,
            'success'
          ).then((response) => {
            if (response.isConfirmed) {

              this.dialogRef.close(true);
            }
          })
        }, (error) => {
          Swal.fire(
            'Error!',
            'Error occurred',
            'error'
          )
          this.spinnerService.resetSpinner();
        });
      }

    } else {
      // Show validation error message with missing field names
      const missingFields = requiredFields.join(', ');
      Swal.fire('Required Fields', `Please fill in the following required fields: ${missingFields}.`, 'error');
    }



  }


  UpdateCheckList() {
    this.spinnerService.requestStarted();
    this.http.get(environment.apiURL + `CustomerVsChecklist/GetChecklistDetails?id=${this.data.data.id}`).subscribe((data: any) => {
      this.spinnerService.requestEnded();
      let UploadPayload = {
        "id": this.data.data.id,
        "customerId": this.selectedCustomer,
        "deptId": this.selectedDepartment,
        "description": this.checklistDescription,
        "createdBy": this.loginservice.getUsername(),
        "createdUtc": data.createdUtc,
        "updatedBy": this.loginservice.getUsername(),
        "updatedUtc": new Date().toISOString(),
        "isDeleted": true,
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
          "createdUtc": "2023-07-19T04:48:19.871Z",
          "updatedUtc": "2023-07-19T04:48:19.871Z",
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
          "approvedDate": "2023-07-19T04:48:19.871Z",
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
          "trialStartDate": "2023-07-19T04:48:19.871Z",
          "liveStartDate": "2023-07-19T04:48:19.875Z",
          "modeofSales": "string",
          "currencyMode": "string",
          "checklist": true,
          "lostCustomerStatus": "string",
          "company": {
            "id": 0,
            "name": "string",
            "address1": "string",
            "address2": "string",
            "address3": "string",
            "locationId": 0,
            "cstno": "string",
            "tinno": "string",
            "email": "string",
            "phone1": "string",
            "phone2": "string",
            "webAddress": "string",
            "createdUtc": "2023-07-19T04:48:19.875Z",
            "updatedUtc": "2023-07-19T04:48:19.875Z",
            "createdBy": 0,
            "updatedBy": 0,
            "isActive": true,
            "isInvoiceDisplay": true,
            "cinno": "string",
            "location": {
              "id": 0,
              "description": "string",
              "locationCode": 0,
              "contraLocationId": 0,
              "locationHeaderDescription": "string",
              "zipcode": "string",
              "isDeleted": true,
              "createdUtc": "2023-07-19T04:48:19.875Z",
              "updatedUtc": "2023-07-19T04:48:19.875Z",
              "createdBy": 0,
              "updatedBy": 0,
              "timeZoneId": 0,
              "timezoneDescription": "string",
              "timezoneDifference": "string",
              "dayLightTimezoneDifference": "string"
            }
          },
          "customerClassification": {
            "id": 0,
            "description": "string",
            "isDeleted": true,
            "createdUtc": "2023-07-19T04:48:19.875Z",
            "updatedUtc": "2023-07-19T04:48:19.875Z",
            "createdBy": 0,
            "updatedBy": 0
          },
          "TimeZoneNavigation": {
            "id": 0,
            "description": "string",
            "istdiff": "string",
            "timezoneDiff": "string",
            "isDeleted": true,
            "name": "string"
          }
        },
        "dept": {
          "id": 0,
          "description": "string",
          "isDeleted": true,
          "createdUtc": "2023-07-19T04:48:19.875Z",
          "updatedUtc": "2023-07-19T04:48:19.875Z",
          "createdBy": 0,
          "updatedBy": 0
        }
      }

      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + `CustomerVsChecklist/UpdateChecklist`, UploadPayload).subscribe({
        next: (val: any) => {
          this.spinnerService.requestEnded();
          if (val.message == true) {
            Swal.fire(
              'Done!',
              'Employee detail updated!',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close(true);
              }
            })
          }
          else {
            Swal.fire(
              'info!',
              'No Changes Occured!',
              'info'
            ).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/topnavbar/CustomerVsChecklist']);
              }
            })

          }



        },
        error: (err: any) => {
          this._coreService.openSnackBar('Employee detail Not updated!');
          this.spinnerService.resetSpinner();
        },
      });
    }
    )
  };
}
