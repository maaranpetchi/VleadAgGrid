import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { EmployeeService } from 'src/app/Services/EmployeeController/employee.service';
import { LoginService } from 'src/app/Services/Login/login.service';



@Component({
  selector: 'app-add-edit-employeecontroller',
  templateUrl: './add-edit-employeecontroller.component.html',
  styleUrls: ['./add-edit-employeecontroller.component.scss'],

})

export class AddEditEmployeecontrollerComponent implements OnInit {
  roleID: any;
  subEmpId: number;
  subEmpName: string;
  apiResponseData: any;
  apiViewResponseData: any;
  data: any;
  isInputDisabled: boolean = true;
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

      this.fetchUpdateData();
      this._empservice.shouldFetchData = false;
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
      this.martialStatus = this.apiViewResponseData.emp.addressDetail.maritalStatus,
      this.gender = this.apiViewResponseData.emp.addressDetail.gender,
      this.BloodGroup = this.apiViewResponseData.emp.addressDetail.bloodGroup,
      this.internetAvailable = this.apiViewResponseData.emp.addressDetail.isInternetConnection,
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
  constructor(private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private router: Router, private _empservice: EmployeeService) {
  }
  submitButton: boolean = true;
  updateButton: boolean = false;
  EmployeeEditName: boolean = false;
  fetchUpdateData() {
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
      this.employeehierarchy = this.apiResponseData.emp.empHry[0].employeeId,
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
      this.employeeRoles = this.apiResponseData.emp.role
    this.employeeProcess = this.apiResponseData.emp.code
    this.personalEmail = this.apiResponseData.emp.addressDetail.personalEmail
    if(this.data.type === "view"){
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
  selectedDepartment: any;

  destinations: any[] = [];
  selectedDestination: any;

  resignReason: any = '';
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
  internetAvailable: any;
  outsource: boolean = false;
  internetType: any;
  ServiceProvider: any;
  systemlaptop: string = "";
  systemconfiguration: string = "";

  //2.PRODUCT
  reportingManager1: String = ''
  reportingManager2: String = ''
  reporting: String = ''
  reportingLeader1: string = ''
  reportingLeader2: string = ''
  employeehierarchy: any[] = [];
  proficiency: string = ''
  //3.Communication
  presentAddress1: string = ''
  permanentAddress1: string = ''
  presentAddress2: string = ''
  permanentAddress2: string = ''
  presentaddress3: string = ''
  permanentaddress3: string = ''
  phonenum: any;
  mobileNumber: any;
  emergencyContactName: string = ''
  emergencyMobilenumber: string = ''
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
    this.http.get<any[]>(environment.apiURL + 'Employee/GetEmployeeList').subscribe(productDropdownResponse => {
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
    this.http.post<any>(environment.apiURL + 'Employee/AddEmpNewRoles', payload).subscribe(data => {
      // Show a success message to the user
      this.coreservice.openSnackBar(data.message)
      this.getRole();
      // Close the form
      this.hideForm();
    }, () => {
      // Show an error message to the user
      alert('An error occurred while saving the data.');
    });
  }


  onCheckboxChange(event: Event) {
    this.copyAddress = (event.target as HTMLInputElement).checked;
    if (this.copyAddress) {
      this.presentAddress1 = this.permanentAddress1;
      this.presentAddress2 = this.permanentAddress2;
      this.presentaddress3 = this.permanentaddress3;

    } else {
      this.presentAddress1 = "";
      this.presentAddress2 = "";
      this.presentaddress3 = "";
    }
  }



  /////////////////submit an update /////
  onSubmit() {
    ///Employee Added SuccessFully
    this.employeeRoles.forEach((item) => {
      this.roleID = item.id;
      this.roleDescription = item.description;
    });
    this.employeehierarchy.forEach((item) => {
      this.subEmpId = item.employeeId,
        this.subEmpName = item.employeeName
      //this.createdBy = this.loginservice.getUsername()
    });
    let payload = {
      "employeeId": this.loginservice.getUsername(),
      "employeeCode": this.employeeCode,
      "employeeName": this.employeeName,
      "departmentId": this.selectedDepartment,
      "designationId": this.selectedDestination,
      "dateOfJoining": this.doj,
      "dateOfBirth": this.dob,
      "bloodGroup": this.BloodGroup,
      "gender": this.gender,
      "maritalStatus": this.martialStatus,
      "companyId": 0,
      "profiencyId": this.proficiency,
      "emergencyContactName": this.emergencyContactName,
      "emergencyContactNo": this.emergencyContactName,
      "email": this.officialemailaddress,
      "personalEmail": this.personalEmail,
      "createdUTC": new Date().toISOString,
      "createdBy": this.loginservice.getUsername(),
      "updatedUTC": new Date().toISOString,
      "updatedBy": 0,
      "reportingManager1": this.reportingManager1,
      "reportLeader1": this.reportingLeader1,
      "reportingManager2": this.reportingManager2,
      "reportingLeader2": this.reportingLeader2,
      "address1": this.presentAddress1,
      "address2": this.presentAddress2,
      "address3": this.presentaddress3,
      "address11": this.permanentAddress1,
      "address22": this.permanentAddress2,
      "address33": this.permanentaddress3,
      "locationId": 0,
      "locationId1": 0,
      "addressType": "",
      "mobileNo": this.mobileNumber,
      "phoneNo": this.phonenum,
      "resignReasons": 0,
      "dateOfResignation": this.dor,
      "processCode":
        this.employeeProcess,
      "result": this.outsource,
      "roleDescription": "",
      "isOutsource": true,
      "empRolesList": [
        {
          "roleDescription": this.roleDescription,
          "roleId": this.roleId,
          "createdBy": this.loginservice.getUsername(),
          "updatedBy": 0
        }
      ],
      "empHierarchyList": [
        {
          "subEmpId": this.subEmpId,
          "subEmpName": this.subEmpName,
          "createdBy": this.loginservice.getUsername(),
        }
      ],
      "isInternetConnection": this.internetAvailable,
      "isSystem": this.systemlaptop,
      "netWorkType": this.internetType,
      "serviceProvider": this.ServiceProvider,
      "systemConfig": this.systemconfiguration,
    }
    this.http.post<any>(environment.apiURL + `Employee/AddEmployee`, payload).subscribe({
      next: (val: any) => {
        // this.spinnerService.requestStarted();

        this.coreservice.openSnackBar('Employee added successfully');
        this.router.navigate(['/topnavbar/Emp-Empcontroller']);
      },
      error: (err: any) => {
        console.error(err);
      },
    });

  }

  onUpdate() {
    ///Employee Added SuccessFully
    this.employeeRoles.forEach((item) => {
      this.roleID = item.id;
      this.roleDescription = item.description;
    });
    this.employeehierarchy.forEach((item) => {
      this.subEmpId = item.employeeId,
        this.subEmpName = item.employeeName
      // this.createdBy = this.loginservice.getUsername()
    });
    let payload = {
      "employeeId": this.loginservice.getUsername(),
      "employeeCode": this.employeeCode,
      "employeeName": this.employeeName,
      "departmentId": this.selectedDepartment,
      "designationId": this.selectedDestination,
      "dateOfJoining": this.doj,
      "dateOfBirth": this.dob,
      "bloodGroup": this.BloodGroup,
      "gender": this.gender,
      "maritalStatus": this.martialStatus,
      "companyId": 0,
      "profiencyId": this.proficiency,
      "emergencyContactName": this.emergencyContactName,
      "emergencyContactNo": this.emergencyContactName,
      "email": this.officialemailaddress,
      "personalEmail": this.personalEmail,
      "createdUTC": new Date().toISOString,
      "createdBy": 0,
      "updatedUTC": new Date().toISOString,
      "updatedBy": this.loginservice.getUsername(),
      "reportingManager1": this.reportingManager1,
      "reportLeader1": this.reportingLeader1,
      "reportingManager2": this.reportingManager2,
      "reportingLeader2": this.reportingLeader2,
      "address1": this.presentAddress1,
      "address2": this.presentAddress2,
      "address3": this.presentaddress3,
      "address11": this.permanentAddress1,
      "address22": this.permanentAddress2,
      "address33": this.permanentaddress3,
      "locationId": 0,
      "locationId1": 0,
      "addressType": "",
      "mobileNo": this.mobileNumber,
      "phoneNo": this.phonenum,
      "resignReasons": this.resignReason,
      "dateOfResignation": this.dor,
      "processCode": this.employeeProcess,
      "result": this.outsource,
      "roleDescription": "",
      "isOutsource": true,
      "empRolesList": [
        {
          "roleDescription": this.roleDescription,
          "roleId": this.roleId,
          "createdBy": 0,
          "updatedBy": this.loginservice.getUsername()
        }
      ],
      "empHierarchyList": [
        {
          "subEmpId": this.subEmpId,
          "subEmpName": this.subEmpName,
          "createdBy": 0
        }
      ],
      "isInternetConnection": this.internetAvailable,
      "isSystem": this.systemlaptop,
      "netWorkType": this.internetType,
      "serviceProvider": this.ServiceProvider,
      "systemConfig": this.systemconfiguration,
    }
    this.http.post<any>(environment.apiURL + `Employee/EditEmployee`, payload).subscribe({
      next: (val: any) => {
        // this.spinnerService.requestStarted();

        this.coreservice.openSnackBar('Employee updated successfully');
        this.router.navigate(['/topnavbar/Emp-Empcontroller']);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }


  onHome() {
    this.router.navigate(['/topnavbar/Emp-Empcontroller']);
  }
}