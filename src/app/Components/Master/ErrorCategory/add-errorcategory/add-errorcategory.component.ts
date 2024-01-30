import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { ErrorCategoryService } from 'src/app/Services/Errorcategory/error-category.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-add-errorcategory',
  templateUrl: './add-errorcategory.component.html',
  styleUrls: ['./add-errorcategory.component.scss'],
})
export class AddErrorcategoryComponent implements OnInit {

  scopeID: any;
  errorCategory:any[];


  constructor(
    private router: Router,
    private builder: FormBuilder,
    private _service: ErrorCategoryService,
    private http: HttpClient,
    private _coreService: CoreService,
    private loginservice: LoginService,
    private spinnerService:SpinnerService
  ) {}

  ngOnInit(): void {
    this.errorCategoryList()
  }

  userRegistrationForm = this.builder.group({
    department: ['', Validators.required],
    description: ['', Validators.required],
  });

  errorCategoryList(){
    this._service.getCategoryList().subscribe((data) => {
      this.errorCategory = data.departmentList;
    });
  }


  onFormSubmit() {
    let saveErrorCategory = {
      id: 0,
      departmentId: this.userRegistrationForm.value.department,
      description:this.userRegistrationForm.value.description,
      isDeleted: true,
      createdUtc: new Date().toISOString(),
      updatedUtc: '',
      createdBy: this.loginservice.getUsername(),
      updatedBy: 0,
      createdByNavigation: {
        employeeId: 0,
        companyId: 0,
        employeeCode: 'string',
        employeeName: 'string',
        departmentId: 0,
        designationId: 0,
        profiencyId: 0,
        reportLeader1: 0,
        reportingManager1: 0,
        reportingLeader2: 0,
        reportingManager2: 0,
        dateOfBirth: '2023-06-09T10:26:38.791Z',
        dateOfJoining: '2023-06-09T10:26:38.791Z',
        dateOfResignation: '2023-06-09T10:26:38.791Z',
        resignReasons: 0,
        email: 'string',
        maritalStatus: 'string',
        gender: 'string',
        phoneNo: 'string',
        mobileNo: 'string',
        bloodGroup: 'string',
        emergencyContactName: 'string',
        emergencyContactNo: 'string',
        isDeleted: true,
        createdUtc: '2023-06-09T10:26:38.791Z',
        updatedUtc: '2023-06-09T10:26:38.791Z',
        createdBy: 0,
        updatedBy: 0,
        personalEmail: 'string',
        divisionId: 0,
        isOutsource: true,
        isInternetConnection: 'string',
        netWorkType: 'string',
        serviceProvider: 'string',
        isSystem: 'string',
        systemConfig: 'string',
        company: {
          id: 0,
          name: 'string',
          address1: 'string',
          address2: 'string',
          address3: 'string',
          locationId: 0,
          cstno: 'string',
          tinno: 'string',
          email: 'string',
          phone1: 'string',
          phone2: 'string',
          webAddress: 'string',
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
          isActive: true,
          isInvoiceDisplay: true,
          cinno: 'string',
          location: {
            id: 0,
            description: 'string',
            locationCode: 0,
            contraLocationId: 0,
            locationHeaderDescription: 'string',
            zipcode: 'string',
            isDeleted: true,
            createdUtc: '2023-06-09T10:26:38.791Z',
            updatedUtc: '2023-06-09T10:26:38.791Z',
            createdBy: 0,
            updatedBy: 0,
            timeZoneId: 0,
            timezoneDescription: 'string',
            timezoneDifference: 'string',
            dayLightTimezoneDifference: 'string',
          },
        },
        department: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
        },
        designation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
        },
        profiency: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
        },
        resignReasonsNavigation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
        },
      },
      department: {
        id: 0,
        description:  this.userRegistrationForm.value.description,
        isDeleted: true,
        createdUtc: new Date().toISOString(),
        updatedUtc: '2023-06-09T10:26:38.791Z',
        createdBy: this.loginservice.getUsername(),
        updatedBy: 0,
      },
      updatedByNavigation: {
        employeeId: 0,
        companyId: 0,
        employeeCode: 'string',
        employeeName: 'string',
        departmentId: 0,
        designationId: 0,
        profiencyId: 0,
        reportLeader1: 0,
        reportingManager1: 0,
        reportingLeader2: 0,
        reportingManager2: 0,
        dateOfBirth: '2023-06-09T10:26:38.791Z',
        dateOfJoining: '2023-06-09T10:26:38.791Z',
        dateOfResignation: '2023-06-09T10:26:38.791Z',
        resignReasons: 0,
        email: 'string',
        maritalStatus: 'string',
        gender: 'string',
        phoneNo: 'string',
        mobileNo: 'string',
        bloodGroup: 'string',
        emergencyContactName: 'string',
        emergencyContactNo: 'string',
        isDeleted: true,
        createdUtc: '2023-06-09T10:26:38.791Z',
        updatedUtc: '2023-06-09T10:26:38.791Z',
        createdBy: 0,
        updatedBy: 0,
        personalEmail: 'string',
        divisionId: 0,
        isOutsource: true,
        isInternetConnection: 'string',
        netWorkType: 'string',
        serviceProvider: 'string',
        isSystem: 'string',
        systemConfig: 'string',
        company: {
          id: 0,
          name: 'string',
          address1: 'string',
          address2: 'string',
          address3: 'string',
          locationId: 0,
          cstno: 'string',
          tinno: 'string',
          email: 'string',
          phone1: 'string',
          phone2: 'string',
          webAddress: 'string',
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
          isActive: true,
          isInvoiceDisplay: true,
          cinno: 'string',
          location: {
            id: 0,
            description: 'string',
            locationCode: 0,
            contraLocationId: 0,
            locationHeaderDescription: 'string',
            zipcode: 'string',
            isDeleted: true,
            createdUtc: '2023-06-09T10:26:38.791Z',
            updatedUtc: '2023-06-09T10:26:38.791Z',
            createdBy: 0,
            updatedBy: 0,
            timeZoneId: 0,
            timezoneDescription: 'string',
            timezoneDifference: 'string',
            dayLightTimezoneDifference: 'string',
          },
        },
        department: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
        },
        designation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
        },
        profiency: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
        },
        resignReasonsNavigation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-09T10:26:38.791Z',
          updatedUtc: '2023-06-09T10:26:38.791Z',
          createdBy: 0,
          updatedBy: 0,
        },
      },
    };
    this.spinnerService.requestStarted();

    this.http
      .post(
        environment.apiURL+'ErrorCategory/CreateErrorCategory',
        saveErrorCategory
      ).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      }))
      .subscribe({
        next: (response: any) => {
          this.spinnerService.requestEnded();

          Swal.fire('Done!', 'Scope Detail Added', 'success').then((response)=>{
            if(response.isConfirmed){
              this.userRegistrationForm.reset();
            }
          });
          
        },
        error: (err: any) => {
          throw new Error('API Error', err);
        },
      });
  }

  onCancel() {
    this.router.navigate(['/topnavbar/errorCategory']);
  }
}
