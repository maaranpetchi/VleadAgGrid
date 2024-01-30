import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { ProcessService } from 'src/app/Services/Process/process.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-add-editprocess',
  templateUrl: './add-editprocess.component.html',
  styleUrls: ['./add-editprocess.component.scss'],
})
export class AddEditprocessComponent implements OnInit {
  myForm: FormGroup;
  mode: 'add' | 'edit' = 'edit';
  responseData: any;

  constructor(
    private formBuilder: FormBuilder,
    private _Service: ProcessService,
    private route: Router,
    private _coreService: CoreService,
    private loginservice: LoginService,
    private spinnerService:SpinnerService
  ) {}

  ngOnInit() {
    const data = history.state.data;

    this.responseData = history.state.data;

    this._Service.formData$.subscribe((formData: any) => {
      if (formData) {
        this.mode = 'edit';
        this.userRegistrationForm
          .get('name')
          ?.patchValue(this.responseData.name);
        this.userRegistrationForm
          .get('shortName')
          ?.patchValue(this.responseData.shortName);
        this.userRegistrationForm
          .get('description')
          ?.patchValue(this.responseData.description);
        this.userRegistrationForm
          .get('isActive')
          ?.patchValue(this.responseData.isActive);
        // this.userRegistrationForm.patchValue(formData); // Populate the form fields with the received data
      } else {
        this.mode = 'add';
        // this.userRegistrationForm.reset(); // Reset the form for add mode
      }
    });
  }

  userRegistrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    shortName: ['', Validators.required],
    description: ['', Validators.required],
    isActive: [false],
  });

  submitForm() {
    const formData = this.userRegistrationForm.value;

    if (this.mode === 'add') {
      this.createProcess();
    } else if (this.mode === 'edit') {
      this.updateProcess();
    }

    // Reset the form after submission
    // this.userRegistrationForm.reset();
  }

  createProcess() {
    let saveData = {
      id: 0,
      name: this.userRegistrationForm.value.name,
      shortName: this.userRegistrationForm.value.shortName,
      description: this.userRegistrationForm.value.description,
      isActive: this.userRegistrationForm.value.isActive,
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
        dateOfBirth: '2023-06-13T11:49:14.889Z',
        dateOfJoining: '2023-06-13T11:49:14.889Z',
        dateOfResignation: '2023-06-13T11:49:14.889Z',
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
        createdUtc: '2023-06-13T11:49:14.889Z',
        updatedUtc: '2023-06-13T11:49:14.889Z',
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
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
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
            createdUtc: '2023-06-13T11:49:14.889Z',
            updatedUtc: '2023-06-13T11:49:14.889Z',
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
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
          createdBy: 0,
          updatedBy: 0,
        },
        designation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
          createdBy: 0,
          updatedBy: 0,
        },
        profiency: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
          createdBy: 0,
          updatedBy: 0,
        },
        resignReasonsNavigation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
          createdBy: 0,
          updatedBy: 0,
        },
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
        dateOfBirth: '2023-06-13T11:49:14.889Z',
        dateOfJoining: '2023-06-13T11:49:14.889Z',
        dateOfResignation: '2023-06-13T11:49:14.889Z',
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
        createdUtc: '2023-06-13T11:49:14.889Z',
        updatedUtc: '2023-06-13T11:49:14.889Z',
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
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
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
            createdUtc: '2023-06-13T11:49:14.889Z',
            updatedUtc: '2023-06-13T11:49:14.889Z',
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
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
          createdBy: 0,
          updatedBy: 0,
        },
        designation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
          createdBy: 0,
          updatedBy: 0,
        },
        profiency: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
          createdBy: 0,
          updatedBy: 0,
        },
        resignReasonsNavigation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T11:49:14.889Z',
          updatedUtc: '2023-06-13T11:49:14.889Z',
          createdBy: 0,
          updatedBy: 0,
        },
      },
    };
        this.spinnerService.requestStarted();
    this._Service.createProcess(saveData).subscribe({
      next: (response) => {
        if (response === true) {
          this.route.navigate(['/topnavbar/processMaster']);
          this._coreService.openSnackBar('process added!');
        } else {
          alert('value not added Corectly');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProcess() {
   let updateData = {
    id: this.responseData.id,
    name: this.userRegistrationForm.value.name,
    shortName: this.userRegistrationForm.value.shortName,
    description: this.userRegistrationForm.value.description,
    isActive: this.userRegistrationForm.value.isActive,
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
        dateOfBirth: '2023-06-13T12:11:37.401Z',
        dateOfJoining: '2023-06-13T12:11:37.401Z',
        dateOfResignation: '2023-06-13T12:11:37.401Z',
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
        createdUtc: '2023-06-13T12:11:37.401Z',
        updatedUtc: '2023-06-13T12:11:37.401Z',
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
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
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
            createdUtc: '2023-06-13T12:11:37.401Z',
            updatedUtc: '2023-06-13T12:11:37.401Z',
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
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
          createdBy: 0,
          updatedBy: 0,
        },
        designation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
          createdBy: 0,
          updatedBy: 0,
        },
        profiency: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
          createdBy: 0,
          updatedBy: 0,
        },
        resignReasonsNavigation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
          createdBy: 0,
          updatedBy: 0,
        },
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
        dateOfBirth: '2023-06-13T12:11:37.401Z',
        dateOfJoining: '2023-06-13T12:11:37.401Z',
        dateOfResignation: '2023-06-13T12:11:37.401Z',
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
        createdUtc: '2023-06-13T12:11:37.401Z',
        updatedUtc: '2023-06-13T12:11:37.401Z',
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
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
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
            createdUtc: '2023-06-13T12:11:37.401Z',
            updatedUtc: '2023-06-13T12:11:37.401Z',
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
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
          createdBy: 0,
          updatedBy: 0,
        },
        designation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
          createdBy: 0,
          updatedBy: 0,
        },
        profiency: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
          createdBy: 0,
          updatedBy: 0,
        },
        resignReasonsNavigation: {
          id: 0,
          description: 'string',
          isDeleted: true,
          createdUtc: '2023-06-13T12:11:37.401Z',
          updatedUtc: '2023-06-13T12:11:37.401Z',
          createdBy: 0,
          updatedBy: 0,
        },
      },
    };
    this.spinnerService.requestStarted();
    this._Service.createProcess(updateData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next:(response)=>{
        this.spinnerService.requestEnded();

        if(response === true){
          this.route.navigate(['/topnavbar/processMaster']);
          this._coreService.openSnackBar('process Updated!');
        }
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  onCancel() {
    this.route.navigate(['topnavbar/processMaster']);
  }
}
