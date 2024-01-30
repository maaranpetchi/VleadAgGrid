import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { EmployeeService } from 'src/app/Services/EmployeeController/employee.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { SpinnerService } from '../../Spinner/spinner.service';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-editaddemployeecontroller',
  templateUrl: './editaddemployeecontroller.component.html',
  styleUrls: ['./editaddemployeecontroller.component.scss']
})
export class EditaddemployeecontrollerComponent implements OnInit {
  roleID: any;
  subEmpId: number;
  subEmpName: string;
  apiResponseData: any;
  apiViewResponseData: any;
  data: any;
  gettingType: any;
  ngOnInit(): void {
    this.getDropdownList();
    this.getResignReasons();
    this.getMangerLeaderHierarchy();
    this.getRole();
    this.getEmployeeProcess();
    let data: any[] = [];
    if (this._empservice.shouldFetchData) {
      const data = this._empservice.getData();
      this.apiResponseData = data.data;
      console.log(data,"GettingData");
       this.gettingType= data.type
      this.fetchUpdateData();
      this._empservice.shouldFetchData = false;
    }



    if (this._empservice.shouldFetchViewData) {
      const viewdata = this._empservice.getViewData();
      this.apiViewResponseData = viewdata.data;
      console.log(this.apiViewResponseData,"ApiviewResponse");
      
      this.homeButton = true;
      this.updateButton = false;
      this.fetchViewData();
      this._empservice.shouldFetchViewData = false;
    }
  }
  fetchViewData() {
    this.resignShow = true;
    this.submitButton = false;
    this.updateButton = false;
    this.homeButton = true;
    this.EmployeeEditName = true;
    this.employeeCode = this.apiViewResponseData.emp.addressDetail.employeeCode,
      this.employeeName = this.apiViewResponseData.emp.addressDetail.employeeName,
      this.dob = this.apiViewResponseData.emp.addressDetail.dateOfBirth
    this.doj = this.apiViewResponseData.emp.addressDetail.dateOfJoining,
      this.selectedDestination = this.apiViewResponseData.emp.addressDetail.designationId,
      this.selectedDepartment = this.apiViewResponseData.emp.addressDetail.departmentId,
      this.dor = this.apiViewResponseData.emp.addressDetail.dateOfResignation,
      this.selectedWorkingStatus = this.apiViewResponseData.emp.workingStatus,
      this.martialStatus = this.apiViewResponseData.emp.addressDetail.maritalStatus,
      this.gender = this.apiViewResponseData.emp.addressDetail.gender,
      this.BloodGroup = this.apiViewResponseData.emp.addressDetail.bloodGroup,
      this.internetAvailable = this.apiViewResponseData.emp.addressDetail.isInternetConnection,
      this.selectedWorkingStatus = this.apiResponseData.emp.addressDetail.workingStatus,
      this.outsource = this.apiViewResponseData.emp.addressDetail.isOutsource,
      this.internetType = this.apiViewResponseData.emp.addressDetail.netWorkType,
      this.ServiceProvider = this.apiViewResponseData.emp.addressDetail.serviceProvider,
      this.systemlaptop = this.apiViewResponseData.emp.addressDetail.isSystem,
      this.systemconfiguration = this.apiViewResponseData.emp.addressDetail.systemConfig,
      this.reportingManager1 = this.apiViewResponseData.emp.addressDetail.reportingManager1,
      this.reportingManager2 = this.apiViewResponseData.emp.addressDetail.reportingManager2,
      this.reportingLeader1 = this.apiViewResponseData.emp.addressDetail.reportLeader1,
      this.reportingLeader2 = this.apiViewResponseData.emp.addressDetail.reportingLeader2,
      this.employeehierarchy = this.apiViewResponseData.emp.empHry[0].employeeId,
      this.proficiency = this.apiViewResponseData.emp.addressDetail.profiencyId,
      this.presentAddress1 = this.apiViewResponseData.emp.addressDetail.address1,
      this.permanentAddress1 = this.apiViewResponseData.emp.addressDetail.address11,
      this.presentAddress2 = this.apiViewResponseData.emp.addressDetail.address2,
      this.permanentAddress2 = this.apiViewResponseData.emp.addressDetail.address22,
      this.presentaddress3 = this.apiViewResponseData.emp.addressDetail.address3,
      this.permanentaddress3 = this.apiViewResponseData.emp.addressDetail.address33,
      this.phonenum = this.apiViewResponseData.emp.addressDetail.phoneNo,
      this.mobileNumber = this.apiViewResponseData.emp.addressDetail.mobileNo,
      this.emergencyContactName = this.apiViewResponseData.emp.addressDetail.emergencyContactName,
      this.emergencyMobilenumber = this.apiViewResponseData.emp.addressDetail.emergencyContactNo,
      this.officialemailaddress = this.apiViewResponseData.emp.addressDetail.email,
      this.employeeRoles = this.apiViewResponseData.emp.role
    this.employeeProcess = this.apiViewResponseData.emp.code
    this.personalEmail = this.apiViewResponseData.emp.addressDetail.personalEmail
  }
  constructor(private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private router: Router, private _empservice: EmployeeService, private spinnerservice: SpinnerService, private ngZone: NgZone) {

  }

  //Working status
  options: string[] = ['WFO', 'WFH'];
  selectedWorkingStatus: string = "";

  updateButton: boolean = false;
  submitButton: boolean = true;
  EmployeeEditName: boolean = false;
  fetchUpdateData() {
    console.log(this.apiResponseData.emp, "ApiresponseData");

    this.resignShow = true;
    this.submitButton = false;
    this.updateButton = true;
    this.EmployeeEditName = true;
    this.employeeCode = this.apiResponseData.emp.addressDetail.employeeCode,
      this.employeeName = this.apiResponseData.emp.addressDetail.employeeName,
      this.dob = this.apiResponseData.emp.addressDetail.dateOfBirth
    this.doj = this.apiResponseData.emp.addressDetail.dateOfJoining,
      this.selectedDestination = this.apiResponseData.emp.addressDetail.designationId,
      this.selectedDepartment = this.apiResponseData.emp.addressDetail.departmentId,
      this.dor = this.apiResponseData.emp.addressDetail.dateOfResignation,
      this.selectedWorkingStatus = this.apiResponseData.emp.addressDetail.workingStatus,
      this.martialStatus = this.apiResponseData.emp.addressDetail.maritalStatus,
      this.gender = this.apiResponseData.emp.addressDetail.gender,
      this.BloodGroup = this.apiResponseData.emp.addressDetail.bloodGroup,
      this.internetAvailable = this.apiResponseData.emp.addressDetail.isInternetConnection,
      this.outsource = this.apiResponseData.emp.addressDetail.isOutsource,
      this.internetType = this.apiResponseData.emp.addressDetail.netWorkType,
      this.ServiceProvider = this.apiResponseData.emp.addressDetail.serviceProvider,
      this.systemlaptop = this.apiResponseData.emp.addressDetail.isSystem,
      this.systemconfiguration = this.apiResponseData.emp.addressDetail.systemConfig,
      this.reportingManager1 = this.apiResponseData.emp.addressDetail.reportingManager1,
      this.reportingManager2 = this.apiResponseData.emp.addressDetail.reportingManager2,
      this.reportingLeader1 = this.apiResponseData.emp.addressDetail.reportLeader1,
      this.reportingLeader2 = this.apiResponseData.emp.addressDetail.reportingLeader2,

      this.employeehierarchy = this.apiResponseData.emp.empHry.map(option => option.employeeId);

    console.log(this.employeehierarchy, "employeehierarchyoptions");

    this.proficiency = this.apiResponseData.emp.addressDetail.profiencyId,
      this.presentAddress1 = this.apiResponseData.emp.addressDetail.address1,
      this.permanentAddress1 = this.apiResponseData.emp.addressDetail.address11,
      this.presentAddress2 = this.apiResponseData.emp.addressDetail.address2,
      this.permanentAddress2 = this.apiResponseData.emp.addressDetail.address22,
      this.presentaddress3 = this.apiResponseData.emp.addressDetail.address3,
      this.permanentaddress3 = this.apiResponseData.emp.addressDetail.address33,
      this.phonenum = this.apiResponseData.emp.addressDetail.phoneNo,
      this.mobileNumber = this.apiResponseData.emp.addressDetail.mobileNo,
      this.emergencyContactName = this.apiResponseData.emp.addressDetail.emergencyContactName,
      this.emergencyMobilenumber = this.apiResponseData.emp.addressDetail.emergencyContactNo,
      this.officialemailaddress = this.apiResponseData.emp.addressDetail.email,
      this.employeeRoles = this.apiResponseData.emp.role;
    this.employeeProcess = this.apiResponseData.emp.code.map(process => process.id);
    this.personalEmail = this.apiResponseData.emp.addressDetail.personalEmail
    if (this.gettingType === "view") {
      this.homeButton = true;
    }
  }
  homeButton: boolean = false;

  //////////Form Group//////
  personalStepFormGroup: FormGroup;
  productStepFormGroup: FormGroup;
  CommunicationStepFormGroup: FormGroup;

  //Display
  resignShow: boolean = false;
  copyAddress: boolean = false;

  //DropDown assign 
  //1.personal
  departments: any[] = [];
  selectedDepartment: any = 0;

  destinations: any[] = [];
  selectedDestination: any = 0;

  resignReason: any;
  Resigndropdownvalues: any[] = [];


  //2.Product
  rm1options: any[] = [];
  rm2options: any[] = [];
  rl1options: any[] = [];
  rl2options: any[] = [];
  EmployeeHierarchyOptions: any[] = [];
  proficiencyoptions: any[] = [];

  //3.communication
  employeeprocessOptions: any[] = [];
  EmployeeRolesoptions: any[] | any;
  ////NGMODEL to store the values///
  //1.personal
  employeeCode: any;
  employeeName: any;
  dob: any;
  doj: any;
  dor: any;
  martialStatus: any;
  gender: any;
  BloodGroup: any;
  internetAvailable: string = "";
  outsource: boolean = false;
  internetType: string = "";
  ServiceProvider: any;
  systemlaptop: string = "";
  systemconfiguration: string = "";

  //2.PRODUCT
  reportingManager1: any = 0;
  reportingManager2: any = 0;
  reporting: String = ''
  reportingLeader1: any = 0;
  reportingLeader2: any = 0;
  employeehierarchy: any[] = [];
  proficiency: number = 0;
  //3.Communication
  presentAddress1: string = ''
  permanentAddress1: string = ''
  presentAddress2: string = ''
  permanentAddress2: string = ''
  presentaddress3: string = ''
  permanentaddress3: string = ''
  phonenum: any;
  mobileNumber: any = 0;
  emergencyContactName: string = ''
  emergencyMobilenumber: any = 0
  officialemailaddress: string = ''
  employeeRoles: any[] = [];
  employeeProcess: any[] = [];
  newRole: string = ''
  personalEmail: string = ''
  //DROPDOWN 1.personal-Department Dropdown
  getDropdownList() {

    this.http.get<any>(environment.apiURL + `Employee/GetDropDownList`).subscribe(dropdownsResponse => {
      this.departments = dropdownsResponse.departmentList;
      this.destinations = dropdownsResponse.designationList;
      this.proficiencyoptions = dropdownsResponse.proficiencyList;
    })
  }

  getResignReasons() {
    this.http.get<any>(environment.apiURL + 'Employee/getresignresaonslist').subscribe(resignreasons => {
      this.Resigndropdownvalues = resignreasons;
    });
  }
  //2.product
  getMangerLeaderHierarchy() {
    this.http.get<any>(environment.apiURL + 'Employee/GetEmployeeList').subscribe(productDropdownResponse => {
      this.rm1options = productDropdownResponse;
      this.rm2options = productDropdownResponse;
      this.rl1options = productDropdownResponse;
      this.rl2options = productDropdownResponse;
      this.EmployeeHierarchyOptions = productDropdownResponse;

    });
  }

  //3.communication
  roleDescription: any;
  roleId: any;
  createdBy: any;
  updatedBy: any;
  getRole() {
    this.http.get<any>(environment.apiURL + 'Employee/GetRolesList')
      .subscribe(data => {
        this.EmployeeRolesoptions = data;
        this.roleDescription = data.description,
          this.roleId = data.id
        // this.createdBy = data.createdBy,
        // this.updatedBy = data.updatedBy
      });
  }

  getEmployeeProcess() {
    this.http.get<any[]>(environment.apiURL + 'Process/ListProcess').subscribe(employeeprocessdata => {
      this.employeeprocessOptions = employeeprocessdata;
    });
  }

  //Method 3.communication
  formVisible: boolean = false;
  showForm() {
    this.formVisible = true;
  }

  hideForm() {
    this.formVisible = false;
  }

  newRoleSubmit() {

    let payload = {
      "id": 0,
      "description": this.newRole,
      "companyId": 0,
      "createdBy": this.loginservice.getUsername(),
      "createdUtc": new Date().toISOString,
      "updatedBy": 0,
      "updatedUtc": new Date().toISOString,
      "isActive": true
    }
    this.spinnerservice.requestStarted();
    this.http.post<any>(environment.apiURL + 'Employee/AddEmpNewRoles', payload).pipe(catchError((error) => {
      this.spinnerservice.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((data) => {
      // Show a success message to the user
      this.spinnerservice.requestEnded();

      Swal.fire(
        'Done!',
        data.message,
        'success'
      ).then((respone) => {
        if (respone.isConfirmed) {
          this.getRole();
          // Close the form
          this.hideForm();
        }
      })

    }, error => {
      Swal.fire(
        'Error!',
        'Error occured ',
        'error'
      )
    });
  }
  onCheckboxChange(event: any) {
    this.ngZone.run(() => {
      if (event.checked) {
        this.permanentAddress1 = this.presentAddress1;
        this.permanentAddress2 = this.presentAddress2;
        this.permanentaddress3 = this.presentaddress3;
      } else {
        this.permanentAddress1 = '';
        this.permanentAddress2 = '';
        this.permanentaddress3 = '';
      }
    });
  }

  onSubmit() {
    const requiredFields: string[] = [];
    if (!this.employeeCode) {
        requiredFields.push('Employee Code');
    }
    if (!this.employeeName) {
        requiredFields.push('employeeName');
    }
    if (!this.selectedDepartment) {
        requiredFields.push('Department');
    }
    if (!this.dob) {
        requiredFields.push('D.O.B');
    }
    if (!this.doj) {
        requiredFields.push('D.O.J');
    }
    if (!this.martialStatus) {
        requiredFields.push('Martial Status');
    }
    if (!this.gender) {
        requiredFields.push('Gender');
    }
    if (!this.selectedDestination) {
        requiredFields.push('Destination');
    }
    if (!this.BloodGroup) {
        requiredFields.push('Blood Group');
    }
    if (!this.internetAvailable) {
        requiredFields.push('Internet Available');
    }
    if (!this.systemlaptop) {
        requiredFields.push('System/Laptop');
    }
    if (!this.proficiency) {
        requiredFields.push('Proficiency');
    }
    if (!this.presentAddress1) {
        requiredFields.push('Present Address 1');
    }
    if (!this.mobileNumber) {
        requiredFields.push('Mobile Number');
    }
    if (!this.emergencyContactName) {
        requiredFields.push('Emergency Contact Name');
    }
    if (!this.emergencyMobilenumber) {
        requiredFields.push('Emergency Mobile Number');
    }
    if (!this.personalEmail) {
        requiredFields.push('Personal Email');
    }
    if (!this.selectedWorkingStatus) {
        requiredFields.push('Working Status');
    }
    
    if (requiredFields.length === 0) {
      let empRoleList = this.employeeRoles.map((item) => {
        return {
          "roleId": item.id ? item.id : '',
          "roleDescription": item.description ? item.description : '',
          // "createdBy": item.createdBy ? item.createdBy : '',
          // "updatedBy": item.updatedBy? item.updatedBy:''
        }
      });
      let empHierarchyList = this.employeehierarchy.map(item => {
        return {
          "subEmpId": item.employeeId ? parseInt(item.employeeId) : 0,
          "subEmpName": item.employeeName ? item.employeeName : '',
          // "createdBy": this.loginservice.getUsername() ? this.loginservice.getUsername() : '',
        };
      });
    
      let payload = {
        "employeeId": 0,
        "employeeCode": this.employeeCode,
        "employeeName": this.employeeName,
        "departmentId": this.selectedDepartment,
        "designationId": this.selectedDestination ? this.selectedDestination : '',
        "dateOfJoining": this.doj,
        "dateOfBirth": this.dob,
        "bloodGroup": this.BloodGroup ? this.BloodGroup : '',
        "gender": this.gender ? this.gender : '',
        "maritalStatus": this.martialStatus ? this.martialStatus : '',
        "companyId": 0,
        "profiencyId": this.proficiency,
        "emergencyContactName": this.emergencyContactName,
        "emergencyContactNo": this.emergencyMobilenumber,
        "email": this.officialemailaddress ? this.officialemailaddress : '',
        "personalEmail": this.personalEmail,
        "createdUTC": new Date().toISOString,
        "createdBy": 0,
        "updatedUTC": new Date().toISOString,
        "updatedBy": 0,
        "reportingManager1": this.reportingManager1 ? this.reportingManager1 : 0,
        "reportLeader1": this.reportingLeader1 ? this.reportingLeader1 : 0,
        "reportingManager2": this.reportingManager2 ? this.reportingManager2 : 0,
        "reportingLeader2": this.reportingLeader2 ? this.reportingLeader2 : 0,
        "address1": this.presentAddress1 ? this.presentAddress1 : '',
        "address2": this.presentAddress2 ? this.presentAddress2 : '',
        "address3": this.presentaddress3 ? this.presentaddress3 : '',
        "address11": this.permanentAddress1 ? this.permanentAddress1 : '',
        "address22": this.permanentAddress2 ? this.permanentAddress2 : '',
        "address33": this.permanentaddress3 ? this.permanentaddress3 : '',
        "locationId": 0,
        "locationId1": 0,
        "workingStatus": this.selectedWorkingStatus ? this.selectedWorkingStatus : "",
        "addressType": "",
        "mobileNo": this.mobileNumber,
        "phoneNo": this.phonenum ? this.phonenum : '',
        "resignReasons": 0,
        "dateOfResignation": this.dor,
        "processCode":
          this.employeeProcess ? this.employeeProcess : '',
        "result": this.outsource ? this.outsource : false,
        "roleDescription": "",
        "isOutsource": this.outsource ? this.outsource : false,
        "empRolesList": empRoleList,
        "empHierarchyList": empHierarchyList,
        "isInternetConnection": this.internetAvailable ? this.internetAvailable : '',
        "isSystem": this.systemlaptop,
        "netWorkType": this.internetType ? this.internetType : '',
        "serviceProvider": this.ServiceProvider ? this.ServiceProvider : '',
        "systemConfig": this.systemconfiguration ? this.systemconfiguration : '',
      }
      this.spinnerservice.requestStarted();
      this.http.post<any>(environment.apiURL + `Employee/AddEmployee`, payload).pipe(catchError((error) => {
        this.spinnerservice.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe({
        next: (val: any) => {
          this.spinnerservice.requestEnded();
          if (val == true) {
            Swal.fire(
              'Done!',
              'Employee Added Succesfully',
              'success'
            ).then((respone) => {
              if (respone.isConfirmed) {
                this.router.navigate(['/topnavbar/Emp-Empcontroller']);
              }
            })
          }
          else {
            Swal.fire(
              'ALert!',
              'Employee Not Added Succesfully',
              'info'
            ).then((respone) => {
              if (respone.isConfirmed) {
                this.router.navigate(['/topnavbar/Emp-Empcontroller']);
              }
            })
          }
        },
        error: (err: any) => {
          Swal.fire(
            'Error!',
            'Error Occured',
            'error'
          )
          console.error(err);
        },
      });
    
    } else {
        // Show validation error message with missing field names
        const missingFields = requiredFields.join(', ');
        Swal.fire('Required Fields', `Please fill in the following required fields: ${missingFields}.`, 'error');
    }
  }

  onUpdate() {
    const requiredFields: string[] = [];
    if (!this.employeeCode) {
        requiredFields.push('Employee Code');
    }
    if (!this.employeeName) {
        requiredFields.push('employeeName');
    }
    if (!this.selectedDepartment) {
        requiredFields.push('Department');
    }
    if (!this.dob) {
        requiredFields.push('D.O.B');
    }
    if (!this.doj) {
        requiredFields.push('D.O.J');
    }
    if (!this.martialStatus) {
        requiredFields.push('Martial Status');
    }
    if (!this.gender) {
        requiredFields.push('Gender');
    }
    if (!this.selectedDestination) {
        requiredFields.push('Destination');
    }
    if (!this.BloodGroup) {
        requiredFields.push('Blood Group');
    }
    if (!this.internetAvailable) {
        requiredFields.push('Internet Available');
    }
    if (!this.systemlaptop) {
        requiredFields.push('System/Laptop');
    }
    if (!this.proficiency) {
        requiredFields.push('Proficiency');
    }
    if (!this.presentAddress1) {
        requiredFields.push('Present Address 1');
    }
    if (!this.mobileNumber) {
        requiredFields.push('Mobile Number');
    }
    if (!this.emergencyContactName) {
        requiredFields.push('Emergency Contact Name');
    }
    if (!this.emergencyMobilenumber) {
        requiredFields.push('Emergency Mobile Number');
    }
    if (!this.personalEmail) {
        requiredFields.push('Personal Email');
    }
    if (!this.selectedWorkingStatus) {
        requiredFields.push('Working Status');
    }

    if (requiredFields.length === 0) {
      let empRoleList = this.employeeRoles.map((item) => {
        return {
          "roleId": item.id ? item.id : '',
          "roleDescription": item.description ? item.description : '',
          // "createdBy": item.createdBy ? item.createdBy : '',
          // "updatedBy": item.updatedBy? item.updatedBy:''
        }
      });
      let empHierarchyList = this.employeehierarchy.map(item => {
        return {
          "subEmpId": item.employeeId ? parseInt(item.employeeId) : 0,
          "subEmpName": item.employeeName ? item.employeeName : '',
          // "createdBy": this.loginservice.getUsername() ? this.loginservice.getUsername() : '',
        };
      });
      let payload = {
        "employeeId": this.apiResponseData.emp.addressDetail.employeeId ? this.apiResponseData.emp.addressDetail.employeeId : 0,
        "employeeCode": this.employeeCode ? this.employeeCode : '',
        "employeeName": this.employeeName ? this.employeeName : '',
        "departmentId": this.selectedDepartment ? this.selectedDepartment : 0,
        "designationId": this.selectedDestination ? this.selectedDestination : 0,
        "dateOfJoining": this.doj ? this.doj : '',
        "dateOfBirth": this.dob ? this.dob : '',
        "bloodGroup": this.BloodGroup ? this.BloodGroup : 0,
        "gender": this.gender ? this.gender : 0,
        "maritalStatus": this.martialStatus ? this.martialStatus : 0,
        "companyId": 0,
        "profiencyId": this.proficiency ? this.proficiency : '',
        "workingStatus": this.selectedWorkingStatus ? this.selectedWorkingStatus : "",
        "emergencyContactName": this.emergencyContactName ? this.emergencyContactName : '',
        "emergencyContactNo": this.emergencyMobilenumber ? this.emergencyMobilenumber : '',
        "email": this.officialemailaddress ? this.officialemailaddress : '',
        "personalEmail": this.personalEmail ? this.personalEmail : '',
        "createdUTC": new Date().toISOString,
        "createdBy": 0,
        "updatedUTC": new Date().toISOString,
        "updatedBy": 0,
        "reportingManager1": this.reportingManager1 ? this.reportingManager1 : 0,
        "reportLeader1": this.reportingLeader1 ? this.reportingLeader1 : 0,
        "reportingManager2": this.reportingManager2 ? this.reportingManager2 : 0,
        "reportingLeader2": this.reportingLeader2 ? this.reportingLeader2 : 0,
        "address1": this.presentAddress1 ? this.presentAddress1 : '',
        "address2": this.presentAddress2 ? this.presentAddress2 : '',
        "address3": this.presentaddress3 ? this.presentaddress3 : '',
        "address11": this.permanentAddress1 ? this.permanentAddress1 : '',
        "address22": this.permanentAddress2 ? this.permanentAddress2 : '',
        "address33": this.permanentaddress3 ? this.permanentaddress3 : '',
        "locationId": 0,
        "locationId1": 0,
        "addressType": "",
        "mobileNo": this.mobileNumber ? this.mobileNumber : '',
        "phoneNo": this.phonenum ? this.phonenum : '',
        "resignReasons": this.resignReason ? this.resignReason : 0,
        "dateOfResignation": this.dor ? this.dor : '',
        "processCode": this.employeeProcess ? this.employeeProcess : 0,
        "result": this.outsource ? this.outsource : false,
        "roleDescription": "",
        "isOutsource": this.outsource ? this.outsource : false,
        "empRolesList": empRoleList ? empRoleList : '',
        "empHierarchyList": empHierarchyList ? empHierarchyList : 0,
        "isInternetConnection": this.internetAvailable ? this.internetAvailable : '',
        "isSystem": this.systemlaptop ? this.systemlaptop : false,
        "netWorkType": this.internetType ? this.internetType : 0,
        "serviceProvider": this.ServiceProvider ? this.ServiceProvider : 0,
        "systemConfig": this.systemconfiguration ? this.systemconfiguration : 0,
      }
      this.spinnerservice.requestStarted();
      this.http.post<any>(environment.apiURL + `Employee/EditEmployee`, payload).pipe(
        catchError((error) => {
          this.spinnerservice.requestEnded();
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
        })
    
      ).subscribe({
        next: (val: any) => {
          this.spinnerservice.requestEnded();
          if (val == true) {
            Swal.fire(
              'Updated!',
              'Employee updated successfully',
              'success'
            ).then((update) => {
              if (update.isConfirmed) {
                this.router.navigate(['/topnavbar/Emp-Empcontroller'])
              }
            });
          }
          else {
            Swal.fire(
              'Alert!',
              'Employee not updated successfully',
              'info'
            ).then((update) => {
              if (update.isConfirmed) {
                this.router.navigate(['/topnavbar/Emp-Empcontroller'])
              }
            });
          }
        },
        error: (err: any) => {
          Swal.fire(
            'Error!',
            'Error Occured',
            'error'
          )
          console.error(err);
        },
      });
    
    } else {
        // Show validation error message with missing field names
        const missingFields = requiredFields.join(', ');
        Swal.fire('Required Fields', `Please fill in the following required fields: ${missingFields}.`, 'error');
    }
  }


  onHome() {
    this.router.navigate(['/topnavbar/Emp-Empcontroller']);
  }


}