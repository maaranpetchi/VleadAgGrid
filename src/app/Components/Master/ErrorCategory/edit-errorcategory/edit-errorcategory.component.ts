import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { ErrorCategoryService } from 'src/app/Services/Errorcategory/error-category.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { ScopeService } from 'src/app/Services/Scope/scope.service';

@Component({
  selector: 'app-edit-errorcategory',
  templateUrl: './edit-errorcategory.component.html',
  styleUrls: ['./edit-errorcategory.component.scss'],
})
export class EditErrorcategoryComponent implements OnInit {
  departments: any[];
  responseData: any;
  data:any;

  constructor(
    private builder: FormBuilder,
    private _service: ErrorCategoryService,
    private route: Router,
    private loginservice: LoginService,
    private _coreService: CoreService,
    private _scopeService:ScopeService,
    private spinnerservice:SpinnerService
  ) {}

  scopeID: any;
  ngOnInit(): void {
    this.listScopeDropdown();
    this.responseData = history.state.data;
    this.userRegistrationForm
      .get('departmentName')
      ?.patchValue(this.responseData.department.id);
    this.userRegistrationForm
      .get('description')
      ?.patchValue(this.responseData.description);
  }

  userRegistrationForm = this.builder.group({
    departmentName: '',
    description: '',
  });

  listScopeDropdown() {
    this._scopeService.listScopes().subscribe((data) => {
      this.departments = data.departmentList;
    });
  }
  onFormSubmit() {
    let updateData = {
      id: this.responseData.id,
      departmentId: this.userRegistrationForm.value.departmentName,
      description: this.userRegistrationForm.value.description,
      isDeleted: false,
      createdUtc: new Date().toISOString(),
      updatedUtc: new Date().toISOString(),
      createdBy: this.loginservice.getUsername(),
      updatedBy: this.loginservice.getUsername(),
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
        dateOfBirth: '2023-06-13T04:56:56.942Z',
        dateOfJoining: '2023-06-13T04:56:56.942Z',
        dateOfResignation: '2023-06-13T04:56:56.942Z',
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
        createdUtc: '2023-06-13T04:56:56.942Z',
        updatedUtc: '2023-06-13T04:56:56.942Z',
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
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
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
            createdUtc: '2023-06-13T04:56:56.942Z',
            updatedUtc: '2023-06-13T04:56:56.942Z',
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
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
          createdBy: 0,
          updatedBy: 0,
        },
        designation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
          createdBy: 0,
          updatedBy: 0,
        },
        profiency: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
          createdBy: 0,
          updatedBy: 0,
        },
        resignReasonsNavigation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
          createdBy: 0,
          updatedBy: 0,
        },
      },
      department: {
        id: this.userRegistrationForm.value.departmentName,
        description: this.departments.find(
          (d) => d.id === this.userRegistrationForm.value.departmentName
        ).description,
        isDeleted: false,
        createdUtc: new Date().toISOString(),
        updatedUtc: new Date().toISOString(),
        createdBy: this.loginservice.getUsername(),
        updatedBy: this.loginservice.getUsername(),
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
        dateOfBirth: '2023-06-13T04:56:56.942Z',
        dateOfJoining: '2023-06-13T04:56:56.942Z',
        dateOfResignation: '2023-06-13T04:56:56.942Z',
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
        createdUtc: '2023-06-13T04:56:56.942Z',
        updatedUtc: '2023-06-13T04:56:56.942Z',
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
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
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
            createdUtc: '2023-06-13T04:56:56.942Z',
            updatedUtc: '2023-06-13T04:56:56.942Z',
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
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
          createdBy: 0,
          updatedBy: 0,
        },
        designation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
          createdBy: 0,
          updatedBy: 0,
        },
        profiency: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
          createdBy: 0,
          updatedBy: 0,
        },
        resignReasonsNavigation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T04:56:56.942Z',
          updatedUtc: '2023-06-13T04:56:56.942Z',
          createdBy: 0,
          updatedBy: 0,
        },
      },
    };
    this.spinnerservice.requestStarted()
    this._service.updateErrorCategory(updateData).subscribe(response => {
      this.spinnerservice.requestEnded()

      if(response === true) {
        this._coreService.openSnackBar('Error Category updated!');
        this.route.navigate(['/topnavbar/errorCategory']);
      } else {
        this._coreService.openSnackBar('Error Category updated Failed!');
      }

    })
  }

  onCancel() {
    this.route.navigate(['/topnavbar/errorCategory']);
  }
}
