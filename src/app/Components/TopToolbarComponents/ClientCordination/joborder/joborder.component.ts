
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { ClientcordinationService } from 'src/app/Services/CoreStructure/ClientCordination/clientcordination.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
@Component({
  selector: 'app-joborder',
  templateUrl: './joborder.component.html',
  styleUrls: ['./joborder.component.scss']
})
export class JoborderComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  joborder: FormGroup;

  selectedGender: string = '';
  selectedClientStatus: string = '';
  selectedApparelLogoLocation: string = '';
  selectedVirtualProof: string = '';
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  constructor(private http: HttpClient, private coreService: CoreService, private _fb: FormBuilder, private loginservice: LoginService, private clientcordinationservice: ClientcordinationService,private router:Router,private spinnerservice:SpinnerService) {
    this.joborder = this._fb.group({
      jobno: [{value:'',disabled:true}],
      jobdate: [{ value: new Date().toLocaleDateString('en-GB'), disabled: true }],
      jobdescription: ['',[Validators.required]],
      instruction: [''],
      jobstatus: ['',[Validators.required]],
      department: ['',[Validators.required]],
      clientname: ['',[Validators.required]],
      customercontactname: ['',[Validators.required]],
      clientjobid: [''],
      filename: ['',[Validators.required]],
      filerecddate: ['',[Validators.required]],
      referencedate: [''],
      referencenumber: [''],
      fileinwardtype: ['',[Validators.required]],
      fileattachment: ['',[Validators.required]],
      employee: [{value:this.loginservice.getToken(),disabled:true}],
      division: ['',[Validators.required]],
      jobreferenceid: [''],
      username: [''],
      customer: [''],
      salesperson: [''],
      style: [''],
      temp: [''],
      teamcode: [''],
      projectcode: [''],
      schoolname: [''],
      logowidth: [''],
      logolength: [''],
      gender: [''],
      clientstatus: ['',[Validators.required]],
      apparellogo: [''],
      garmentcolor: [''],
      imprintcolor1: [''],
      virtualproof: [''],
      imprintcolor3: [''],
      imprintcolor2: [''],
    });
  }




  //JOB STATUS
  selectedJobStatus: string;//will hold the currently selected job status from the dropdown.
  jobStatuses: any[];//will store the list of job statuses fetched from the API
  //DEPARTMENT
  selectedDepartment: string;
  Department: any[];
  //ClientName
  selectedClientName: any;
  ClientName: any[];
  //CustomerContactName
  selectedCustomerContactName: string;
  CustomerContactName: any[];

  //FileInwardType
  selectedfileinwardtype: string;
  fileinwardtype: any[];

  //Division
  selectedDivision: string;
  Division: any[];


  ngOnInit(): void {
    this.joborder.controls['username'].valueChanges.subscribe((value) => {
      this.updateUserCharCountHint(value);
    });
    this.joborder.controls['salesperson'].valueChanges.subscribe((value) => {
      this.updateSalesCharCountHint(value);
    });
    //JOb status dropdown
    this.http.get<any>(environment.apiURL+'ClientOrderService/getJobStatusForJO').subscribe(statuses => {
      this.jobStatuses = statuses;
    });
    //DEPARTMENT status dropdown
    this.http.get<any>(environment.apiURL+'ClientOrderService/getDepartmentsForJO').subscribe(Departmentstatus => {
      this.Department = Departmentstatus;
    });
    // ClientNamedropdown
    this.http.get<any>(environment.apiURL+'ClientOrderService/getCustomersForJO').subscribe(clientname => {
      this.ClientName = clientname;
    });
    // CustomerContactName

    //Division
    this.http.get<any>(environment.apiURL+'ClientOrderService/nGetDivisionForJO').subscribe(Divisionstatus => {
      this.Division = Divisionstatus;
    })

    //fileinwardtype
    this.clientcordinationservice.getFileInwardType().subscribe(fileinwarddata => {
      this.fileinwardtype = fileinwarddata
    });

  }

  showUploadedFiles:boolean=false;
  selectedFile: File[] = [];
  fileInfos: { file: File; name: string }[] = [];

  onFileSelected(event: any) {
    this.showUploadedFiles = true;
    this.selectedFile = [event.target.files[0],...this.selectedFile];//store the selected file in selectdfile
    this.fileInfos = [];

    for (let i = 0; i < this.selectedFile.length; i++) {
      const file = this.selectedFile[i];
      this.fileInfos.push({ file, name: file.name });
    }
  
  }
  



  //Selectionchange method to get customer contact
  getcustomername() {
    this.http.get<any>(environment.apiURL+`ClientOrderService/CCByCusId?custId=${this.selectedClientName.id}`).subscribe(CustomerContactName => {
      this.CustomerContactName = CustomerContactName;
    });
  }

  //selectionchange to customer contact name
  onCustomerContactChange() {
    const selectedContact = this.CustomerContactName.find(contact => contact.contactId === this.selectedCustomerContactName);
    if (selectedContact) {
      const contactId = selectedContact.contactId;
      const contactName = selectedContact.contactName;
    }
  }

  //get the current date
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  resetFileUpload() {
    this.fileUpload.nativeElement.value = '';
  }


  removeFile(index: number) {
    this.fileInfos.splice(index, 1);
  }

  onFormSubmit() {
    if (this.selectedFile.length === 0) {
      // If no file is selected, show an alert message
      alert('Please select a file before submitting.');
    }

    let exisitingJordervalue = {
      "id": 0,
      "dateofReceived": new Date().toISOString,
      "clientName": this.selectedClientName.name,
      "clientJobId": this.joborder.value.clientjobid,
      "fileName": this.joborder.value.filename,
      "jobStatusDescription": this.joborder.value.jobdescription,
      "username": this.joborder.value.username,
      "salesPersonName": this.joborder.value.salesperson,
      "clientSalesPerson": this.joborder.value.customercontactname,
      "customerName": this.joborder.value.customername,
      "temp": this.joborder.value.temp,
      "style": this.joborder.value.style,
      "projectCode": this.joborder.value.projectcode,
      "teamCode": this.joborder.value.teamcode,
      "schoolName": this.joborder.value.schoolname,
      "ground": "",
      "gender": this.joborder.value.gender,
      "fileInwardMode": "",
      "status": true,
      "fileReceivedDate": new Date().toISOString(),
      "jobDescription": this.joborder.value.jobdescription,
      "jobStatusId": this.joborder.value.jobstatus,
      "departmentId": this.joborder.value.department,
      "divisionId": this.joborder.value.division,
      "employeeId": this.loginservice.getUsername(),
      "clientId": this.joborder.value.clientname.id,
      "remarks": this.joborder.value.instruction,
      "poNo": this.joborder.value.referencenumber,
      "fileInwardTypeId": this.joborder.value.fileinwardtype,
      "color": this.joborder.value.garmentcolor,
      "logoDimensionWidth": this.joborder.value.logowidth,
      "logoDimensionsLength": this.joborder.value.logolength,
      "apparelLogoLocation": this.joborder.value.apparellogo,
      "imprintColors1": this.joborder.value.imprintcolor1,
      "imprintColors2": this.joborder.value.imprintcolor2,
      "imprintColors3": this.joborder.value.imprintcolor3,
      "virtualProof": this.joborder.value.virtualproof,
      "dateofUpload": new Date().toISOString,
      "dateofClose": new Date().toISOString,
      "customerJobType": "",
      "jobDate": new Date().toISOString  ,
      "clientOrderId": 0,
      "viewDatas": null,
      "createdBy": this.loginservice.getUsername(),
      "poDate": new Date().toISOString,
      "ccId": this.joborder.value.clientSalesperson,
      "ccEmailId": "",
      "dateofDelivery": new Date().toISOString,
      "getAllValues": []
    }

    let jobordervalues = {
        "id": 0,
      "dateofReceived": new Date().toISOString,
      "clientName": this.selectedClientName.name,
      "clientJobId": this.joborder.value.clientjobid,
      "fileName": this.joborder.value.filename,
      "jobStatusDescription": this.joborder.value.jobdescription,
      "username": this.joborder.value.username,
      "salesPersonName": this.joborder.value.salesperson,
      "clientSalesPerson": this.CustomerContactName.find(x => x.id == this.joborder.value.customercontactname).contactName,
      "customerName": this.joborder.value.customer,
      "temp": this.joborder.value.temp,
      "style": this.joborder.value.style,
      "projectCode": this.joborder.value.projectcode,
      "teamCode": this.joborder.value.teamcode,
      "schoolName": this.joborder.value.schoolname,
      "ground": "",
      "gender": this.joborder.value.gender,
      "fileInwardMode": "",
      "status": true,
      "fileReceivedDate": this.joborder.value.filerecddate,
      "jobDescription": this.joborder.value.jobdescription,
      "jobStatusId": this.joborder.value.jobstatus,
      "departmentId": this.joborder.value.department,
      "divisionId": this.joborder.value.division,
      "employeeId": this.loginservice.getUsername(),
      "clientId": this.joborder.value.clientname.id,
      "remarks": this.joborder.value.instruction,
      "poNo": this.joborder.value.referencenumber,
      "fileInwardTypeId": this.joborder.value.fileinwardtype,
      "color": this.joborder.value.garmentcolor,
      "logoDimensionWidth": this.joborder.value.logowidth,
      "logoDimensionsLength": this.joborder.value.logolength,
      "apparelLogoLocation": this.joborder.value.apparellogo,
      "imprintColors1": this.joborder.value.imprintcolor1,
      "imprintColors2": this.joborder.value.imprintcolor2,
      "imprintColors3": this.joborder.value.imprintcolor3,
      "virtualProof": this.joborder.value.virtualproof,
      "dateofUpload": new Date().toISOString(),
      "dateofClose": new Date().toISOString(),
      "customerJobType": this.selectedClientStatus,
      "jobDate":this.getCurrentDate(),
      "clientOrderId": 0,
      "viewDatas": [],
      "createdBy": this.loginservice.getUsername(),
      "poDate": new Date().toISOString,
      "ccId": this.joborder.value.customercontactname,
      "ccEmailId": "",
      "dateofDelivery": new Date().toISOString,
      "getAllValues": []
    }
    this.spinnerservice.requestStarted();

    this.http.post<any>(environment.apiURL + 'JobOrder/InternalOrder', jobordervalues)
      .pipe(
        catchError((error) => {
          this.spinnerservice.requestEnded();
          console.error('API Error:', error);
   
          return Swal.fire('Alert!','An error occurred while processing your request','error');
        })
      )
      .subscribe((data) => {
        if (data.message == null) {
          const orderId = data.orderId;
          const processId = data.processId;
          const statusId = data.statusId;
          const fd = new FormData();
          for (let i = 0; i < this.selectedFile.length; i++) {
            fd.append('FormCollection[]', this.selectedFile[i]);
          }
          this.http
            .post<any>(
              environment.apiURL +
                `File/uploadFiles/${orderId}/0/${processId}/${statusId}/1/${processId}/${statusId}`,
              fd
            )
            .subscribe((filedata) => {
              this.spinnerservice.requestEnded();
              let submitted = false;
              let orderDetails: any = {};
              this.selectedFile = [];
              if(filedata == true){
              Swal.fire('Done!', 'Job Order added successfully', 'success').then((response)=>{
                if(response.isConfirmed){
                  this.router.navigate(['/topnavbar/clientindex']);

                }
              });
            }
            else{
              Swal.fire('Alert!', 'Job Order Not added successfully', 'error').then((response)=>{
                if(response.isConfirmed){
                  this.router.navigate(['/topnavbar/clientindex']);

                }
              });
            }
            });
        }
    //
  });
        
   
  }

  onCancel(){
    this.router.navigate(['topnavbar/clientindex']);
  }
  ///upddate char limit
  maxCharLimit = 25;

  updateUserCharCountHint(value: string) {
    const remainingChars = this.maxCharLimit - value.length;
    const hintElement = document.getElementById('UsercharCountHint');
    if (hintElement) {
      hintElement.innerText = `limit upto ${remainingChars} Char`;
    }
  }
  updateSalesCharCountHint(value: string) {
    const remainingChars = this.maxCharLimit - value.length;
    const hintElement = document.getElementById('SalescharCountHint');
    if (hintElement) {
      hintElement.innerText = `limit upto ${remainingChars} Char`;
    }
  }
  }