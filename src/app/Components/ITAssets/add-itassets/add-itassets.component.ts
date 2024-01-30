import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/Environments/environment';
import { ItassetsService } from 'src/app/Services/ITAssets/itassets.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';

//Interface for servertype
interface GETSTD {
  id: string;
  description: string;
}
interface GETWSD {
  id: string;
  description: string;
}
@Component({
  selector: 'app-add-itassets',
  templateUrl: './add-itassets.component.html',
  styleUrls: ['./add-itassets.component.scss']
})
export class AddItassetsComponent implements OnInit {
  hardwareStepFormGroup: FormGroup;
  softwareStepFormGroup: FormGroup;
  id: number;
  apiResponseData: any;
  data: any;



  ngOnInit(): void {
    this.getPcType();
    this.getSoftwareData();
    this.getTableData();

    this.hardwareStepFormGroup = this.builder.group({
      type: this.type,
      location: this.location,
      bayno: this.bayno,
      pctype: this.pctype,
      workingstatus: this.workingstatus,

    });


    if (this.sharedDataService.shouldFetchData) {
      const data = this.sharedDataService.getData();
      this.apiResponseData = data.data;
      this.fetchUpdateData();
      this.sharedDataService.shouldFetchData = false;
    }
  }
  constructor(private activatedRoute: ActivatedRoute, private builder: FormBuilder,
    private http: HttpClient, private _coreService: CoreService, private sharedDataService: ItassetsService, private loginservice: LoginService, private spinnerService: SpinnerService, private router: Router) {

  }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['baynumber', 'software', 'softwarestatus', 'Action'];

  type = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  bayno = new FormControl('', Validators.required);
  workingstatus = new FormControl('', Validators.required);
  pctype = new FormControl('', Validators.required);

  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id: number) {
    let payload = {
      "id": id
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `ITAsset/nDeleteITSAsset`, payload).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();

        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getTableData();
      }
    });
  }
  resetFormGroups() {
    // Reset the form groups by setting their values to null or empty
    this.hardwareStepFormGroup.reset();
    this.softwareStepFormGroup.reset();
  }
  fetchUpdateData() {

    let payload = {
      "id": this.apiResponseData.itheDetailList.id
    }
    this.http.post<any>(environment.apiURL + `ITAsset/nGetEditedITAsset`, payload).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {

      this.BayNo = results.itheDetailList.bayNumber,
        this.Location = results.itheDetailList.location,
        this.PcName = results.itheDetailList.pcName,
        this.PcType = results.itheDetailList.pcTypeId,
        this.Monitor = results.itheDetailList.monitor,
        this.MonitorSno = results.itheDetailList.monitorSerialNumber,
        this.keyboard = results.itheDetailList.keyboard,
        this.keyboardSno = results.itheDetailList.keyboardSerialNumber,
        this.Roll = results.itheDetailList.roll,
        this.Division = results.itheDetailList.division,
        this.Brand = results.itheDetailList.brand,
        this.Model = results.itheDetailList.model,
        this.WarrantyDetails = results.itheDetailList.warantyDetails,
        this.RAM = results.itheDetailList.ram,
        this.Processor = results.itheDetailList.processor,
        this.Graphics = results.itheDetailList.graphics,
        this.HDD = results.itheDetailList.hdd,
        this.TAGNumber = results.itheDetailList.tagNumber,
        this.MacAddress = results.itheDetailList.macAddress,
        this.OS = results.itheDetailList.os,
        this.IPAddress = results.itheDetailList.ipAddress,
        this.ServerType = results.itheDetailList.serverTypeId,
        this.InvoiceDate = results.itheDetailList.invoiceDate,
        this.InvoiceNumber = results.itheDetailList.invoiceNumber,
        this.Mouse = results.itheDetailList.mouse,
        this.MouseSNO = results.itheDetailList.mouseSerialNumber,
        this.WorkingStatus = results.itheDetailList.workingStatusId
      if (results && results.itheDetailList) {
        this.data = true; // Set the data availability status to true
        // Set other fields based on the available data
      } else {
        this.data = false; // Set the data availability status to false
      }

    });

  }
  //NgModel to save the values
  Type: string;
  BayNo: string;
  Location: string;
  baynodisable: boolean = false;
  PcName: string;
  PcType: any;
  HardwareData: any[] = [];
  PcTypeV: any;
  Monitor: string;
  MonitorSno: string;
  keyboard: string;
  keyboardSno: string;
  Roll: string;
  Division: string;
  Brand: string;
  Model: string;
  WarrantyDetails: string;
  RAM: string;
  Processor: string;
  Graphics: string;
  HDD: string;
  TAGNumber: string;
  MacAddress: string;
  OS: string;
  IPAddress: string;
  ServerType: any;
  GetSTD: GETSTD[] = [
    { id: '1', description: "Server" },
    { id: '2', description: "Virtual Server" }
  ];
  ServerTypeV: any;
  InvoiceDate: Date;
  InvoiceNumber: string;
  Mouse: string;
  MouseSNO: string;
  WorkingStatus: any;
  GetWSD: GETWSD[] = [
    { id: '1', description: "Active" },
    { id: '2', description: "Repair" },
    { id: '3', description: "Stand By" }
  ];
  WorkingStatusV: any;
  //NgModel to save the values
  //second Form 
  SoftwareId: number[];
  SoftwareData: any[] = [];
  SoftwareStatus: number;
  //method to get the pctype dropdown
  getPcType() {
    this.http.get<any>(environment.apiURL + `ITAsset/nGetHardwareSoftware`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.HardwareData = results.hardwareData;
    });
  }
  getSoftwareData() {
    this.http.get<any>(environment.apiURL + `ITAsset/nGetHardwareSoftware`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.SoftwareData = results.softwareData;
    });
  }
  getTableData() {
    this.http.get<any>(environment.apiURL + `ITAsset/nGetTableITSAsset`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.dataSource = results.titsDetailList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
  //mrthod to show the instock in input field
  onTypeChange() {

    if (this.Type === "2") {
      this.BayNo = 'Instock';
      // Disable the BayNo input field
      this.baynodisable = true;
    } else {
      // If the selected type is anything other than "InStock"
      // Reset the BayNo field to an empty value
      this.BayNo = '';
      // Enable the BayNo input field
      this.baynodisable = false;
    }
  }
  firstAdd() {
    this.hardwareStepFormGroup.markAllAsTouched();
    if (this.hardwareStepFormGroup.invalid) {
      for (const control of Object.keys(this.hardwareStepFormGroup.controls)) {
        this.hardwareStepFormGroup.controls[control].markAsTouched();
      }
    }
    else {
      let payloadupload = {
        "id": 0,
        "employeeId": this.loginservice.getUsername(),
        "BayNumber": this.BayNo ? this.BayNo : '',
        "Brand": this.Brand ? this.Brand : '',
        "Division": this.Division ? this.Division : '',
        "EmployeeId": this.loginservice.getUsername(),
        "Graphics": this.Graphics ? this.Graphics : '',
        "HardwareId": "2",
        "Hdd": this.HDD ? this.HDD : '',
        "InvoiceDate": this.InvoiceDate ? this.InvoiceDate : '',
        "InvoiceNumber": this.InvoiceNumber ? this.InvoiceNumber : '',
        "IpAddress": this.IPAddress ? this.IPAddress : '',
        "Keyboard": this.keyboard ? this.keyboard : '',
        "KeyboardSerialNumber": this.keyboardSno ? this.keyboardSno : '',
        "Location": this.Location ? this.Location : '',
        "MacAddress": this.MacAddress ? this.MacAddress : '',
        "Model": this.Model ? this.Model : '',
        "Monitor": this.Monitor ? this.Monitor : '',
        "MonitorSerialNumber": this.MonitorSno ? this.MonitorSno : '',
        "Mouse": this.Mouse ? this.Mouse : '',
        "MouseSerialNumber": this.MouseSNO ? this.MouseSNO : '',
        "Os": this.OS ? this.OS : '',
        "PcName": this.PcName ? this.PcName : '',
        "Processor": this.Processor ? this.Processor : '',
        "Ram": this.RAM ? this.RAM : '',
        "Roll": this.Roll ? this.Roll : '',
        "ServerTypeId": this.ServerType ? this.ServerType : '',
        "TagNumber": this.TAGNumber ? this.TAGNumber : '',
        "WarantyDetails": this.WarrantyDetails ? this.WarrantyDetails : '',
        "WorkingStatusId": this.WorkingStatus ? this.WorkingStatus : '',
        "softwareId": [],
        "softwareStatusId": 0,
        "serverType": "",
        "workingStatus": "",

      }
      this.http.post<any>(environment.apiURL + `ITAsset/nSetITHData`, payloadupload).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(results => {
        this.id = results.ithDetailList.id;
      });
    }
  }
  secondadd() {
    ///////////////////////////////////////////// PAYLAOD///////////////////////////////////////////////////
    let demoPayload = {
      "id": 0,
      "employeeId": this.loginservice.getUsername(),
      "itAssetId": this.apiResponseData.itheDetailList.id,
      "bayNumber": this.BayNo,
      "location": this.Location,
      "pcName": this.PcName,
      "hardwareId": "2",
      "monitor": this.Monitor,
      "monitorSerialNumber": this.MonitorSno,
      "keyboard": this.keyboard,
      "keyboardSerialNumber": this.keyboardSno,
      "roll": this.Roll,
      "division": this.Division,
      "brand": this.Brand,
      "model": this.Model,
      "warantyDetails": this.WarrantyDetails,
      "ram": this.RAM,
      "processor": this.Processor,
      "graphics": this.Graphics,
      "hdd": this.HDD,
      "tagNumber": this.TAGNumber,
      "macAddress": this.MacAddress,
      "os": this.OS,
      "ipAddress": this.IPAddress,
      "serverType": this.ServerType,
      "serverTypeId": this.ServerType,
      "invoiceDate": this.InvoiceDate,
      "invoiceNumber": this.InvoiceNumber,
      "mouse": this.Mouse,
      "mouseSerialNumber": this.MouseSNO,
      "workingStatus": this.WorkingStatus,
      "workingStatusId": this.WorkingStatus,
      "isDeleted": true,
      "createdBy": 0,
      "createdDate": new Date().toISOString,
      "updatedBy": 0,
      "updatedDate": new Date().toISOString,
      "softwareId": [],
      "softwareStatusId": 0
    }

    this.http.post<any>(environment.apiURL + `ITAsset/nUpdateITHData`, demoPayload).subscribe(results => {
      this._coreService.openSnackBar("Data updated successfully!");
      this.id = results.ithDetailList.id;
    });
  }
  softwareclick() {

    let AddPayload = {
      "id": 0,
      "employeeId": this.loginservice.getUsername(),
      "itAssetId": this.id,
      "bayNumber": "",
      "location": "",
      "pcName": "",
      "hardwareId": 0,
      "monitor": "",
      "monitorSerialNumber": "",
      "keyboard": "",
      "keyboardSerialNumber": "",
      "roll": "",
      "division": "",
      "brand": "",
      "model": "",
      "warantyDetails": "",
      "ram": "",
      "processor": "",
      "graphics": "",
      "hdd": "",
      "tagNumber": "",
      "macAddress": "",
      "os": "",
      "ipAddress": "",
      "serverType": "",
      "serverTypeId": 0,
      "invoiceDate": "",
      "invoiceNumber": "",
      "mouse": "",
      "mouseSerialNumber": "",
      "workingStatus": "",
      "workingStatusId": 0,
      "isDeleted": true,
      "createdBy": 0,
      "createdDate": new Date().toISOString(),
      "updatedBy": 0,
      "updatedDate": "",
      "softwareId": this.SoftwareId,
      "softwareStatusId": this.SoftwareStatus
    }

    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `ITAsset/nSetITSData`, AddPayload).subscribe(results => {
      this.spinnerService.requestEnded();
      Swal.fire('Done',results.itsDetailList,'success').then((response)=>{
        if(response.isConfirmed){
          this.getTableData();
        }
      })

    });
  }
  updateData() {
    let payload = {
      "id": this.apiResponseData.itheDetailList.id
    }
    this.http.post<any>(environment.apiURL + `ITAsset/nGetEditedITAsset`, payload).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      let AddPayload = {
        "id": 0,
        "employeeId": this.loginservice.getUsername(),
        "itAssetId": this.id,
        "bayNumber": this.BayNo,
        "location": this.Location,
        "pcName": this.PcType,
        "hardwareId": 0,
        "monitor": this.Monitor,
        "monitorSerialNumber": this.MonitorSno,
        "keyboard": this.keyboard,
        "keyboardSerialNumber": this.keyboardSno,
        "roll": this.Roll,
        "division": this.Division,
        "brand": this.Brand,
        "model": this.Model,
        "warantyDetails": this.WarrantyDetails,
        "ram": this.RAM,
        "processor": this.Processor,
        "graphics": this.Graphics,
        "hdd": this.HDD,
        "tagNumber": this.TAGNumber,
        "macAddress": this.MacAddress,
        "os": this.OS,
        "ipAddress": this.IPAddress,
        "serverType": this.ServerType,
        "serverTypeId": results.itheDetailList.s,
        "invoiceDate": "",
        "invoiceNumber": "",
        "mouse": "",
        "mouseSerialNumber": "",
        "workingStatus": "",
        "workingStatusId": 0,
        "isDeleted": true,
        "createdBy": 0,
        "createdDate": new Date().toISOString(),
        "updatedBy": this.loginservice.getUsername(),
        "updatedDate": new Date().toISOString,
        "softwareId": this.SoftwareId,
        "softwareStatusId": this.SoftwareStatus
      }

      this.http.post<any>(environment.apiURL + `ITAsset/nSetITSData`, AddPayload).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(results => {
        Swal.fire('Done!', 'Record Updated Successfully', 'success').then((response) => {
          if (response.isConfirmed) {
            this.getTableData();

          }
        })
      })
    });;
  }
  softwareSubmitclick() {
    Swal.fire('Done', 'Record added successfully', 'success').then((response)=>{
      if(response.isConfirmed){
        this.router.navigate(['topnavbar/ITAsset'])
      }
    })
  }
}
