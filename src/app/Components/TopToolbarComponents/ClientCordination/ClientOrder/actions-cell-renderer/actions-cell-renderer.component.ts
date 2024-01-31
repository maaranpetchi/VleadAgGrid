import { Component, Injector, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import Swal from 'sweetalert2';
import { ClientordersComponent } from '../clientorders/clientorders.component';
import { ClientorderstableComponent } from '../clientorderstable/clientorderstable.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { ClientorderviewComponent } from '../clientorderview/clientorderview.component';
import { environment } from 'src/Environments/environment';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-actions-cell-renderer',
  template: `
    <span class="total-value-renderer">
      <i class="fa fa-share-square" matTooltip="Convert" style="cursor: pointer;color:green" (click)=" singleconvert(params)"></i>
    </span>
    <span class="total-value-renderer">
      <i class="fa fa-eye" matTooltip="View" style="cursor: pointer;color:green" (click)="openclientorder(params)"></i>
    </span>
  `,
  styleUrls: ['./actions-cell-renderer.component.scss']
})
export class ActionsCellRendererComponent implements ICellRendererAngularComp {

  gettingData: any;
  componentParent: any;
  params: ICellRendererParams<any, any, any>;
  private dialog: MatDialog;

  constructor(private sharedService: SharedService, private injector: Injector, private spinnerService: SpinnerService,private http:HttpClient,private loginservice:LoginService) { }
  iconClicked: boolean = false;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.gettingData = params.data;
    console.log(this.gettingData, "GettingData");
    this.params = params;
    this.dialog = this.injector.get(MatDialog);


  }


  openclientorder(params) {
    console.log(params, "OpenClienorderParams");

    const dialogRef = this.dialog.open(ClientorderviewComponent, {
      width: '50vw',
      height: 'auto',
      data: params,

    });
  }
  refresh(params: ICellRendererParams) {
    return false;
  }
  selectedJobs: any[] = [];
  selectedQuery: any[] = [];


  viewButton() {
    // Set the flag to true when the icon is clicked
    this.iconClicked = true;

    this.sharedService.selectDivision$.subscribe((selectdivision) => {
      if (this.iconClicked) {
        if (selectdivision === 0) {
          alert('Please select a division');
        } else {
          alert('Action performed successfully');

        }
        this.iconClicked = false;

      }
    });
  }


  singleconvert(params: any) {
    this.iconClicked = true;

    this.sharedService.selectDivision$.subscribe((selectdivision) => {
      if (this.iconClicked) {
        if (selectdivision === 0) {
          Swal.fire(
            'Alert!',
            'Select Division!',
            'info'
          ).then((response) => {
            if (response.isConfirmed) {
              // this.ngOnInit();
            }
          })
        } else {
          let GetAllvalues = params.data;
          let Gridwithmultiplefilesname: any[] = [];

          let GetAddList =
          {
            FileName: GetAllvalues.fileName,
            PoNo: GetAllvalues.poNo,
            PODate: GetAllvalues.poDate,
            Remarks: GetAllvalues.instruction,
            SalesPersonName: GetAllvalues.salesPersonName,
            JobStatusId: GetAllvalues.jobStatusId,
            TransactionId: GetAllvalues.transactionType,
            DepartmentId: GetAllvalues.workType,
            ClientId: GetAllvalues.clientId,
            EmployeeId: this.loginservice.getUsername(),
            FileReceivedDate: GetAllvalues.fileReceivedDate,
            ClientOrderId: GetAllvalues.orderId,
            CCId: GetAllvalues.ccId,//
            CCEmailId: GetAllvalues.ccEmailId,//
            FileInwardTypeId: GetAllvalues.fileInwardTypeId,//
            DivisionId: selectdivision,// //
            getAllValues: [],
            ApparelLogoLocation: 'apparel',
            poNo: "",
            clientName: "",
            clientJobId: "",
            jobStatusDescription: "",
            username: "",
            clientSalesPerson: "",
            customerName: "",
            temp: "",
            style: "",
            projectCode: "",
            teamCode: "",
            schoolName: "",
            ground: "",
            gender: "",
            fileInwardMode: "",
            jobDescription: "",
            color: "",
            logoDimensionWidth: "",
            logoDimensionsLength: "",
            apparelLogoLocation: "",
            imprintColors1: "",
            imprintColors2: "",
            imprintColors3: "",
            virtualProof: "st",

            customerJobType: "",

            viewDatas: [],

          }
          Gridwithmultiplefilesname.push(GetAddList);
          let senddata = {
            "id": 0,
            "dateofReceived": "2023-05-12T07:08:03.495Z",
            "clientName": "",
            "clientJobId": "",
            "fileName": "",
            "jobStatusDescription": "",
            "username": "",
            "salesPersonName": "",
            "clientSalesPerson": "",
            "customerName": "",
            "temp": "",
            "style": "",
            "projectCode": "",
            "teamCode": "",
            "schoolName": "",
            "ground": "",
            "gender": "",
            "fileInwardMode": "",
            "status": true,
            "fileReceivedDate": "2023-05-12T07:08:03.495Z",
            "jobDescription": "",
            "jobStatusId": 0,
            "departmentId": 0,
            "divisionId": 0,
            "employeeId": 0,
            "clientId": 0,
            "remarks": "",
            "poNo": "",
            "fileInwardTypeId": 0,
            "color": "",
            "logoDimensionWidth": "",
            "logoDimensionsLength": "",
            "apparelLogoLocation": "",
            "imprintColors1": "",
            "imprintColors2": "",
            "imprintColors3": "",
            "virtualProof": "s",
            "dateofUpload": "2023-05-12T07:08:03.495Z",
            "dateofClose": "2023-05-12T07:08:03.495Z",
            "customerJobType": "",
            "jobDate": "2023-05-12T07:08:03.495Z",
            "clientOrderId": 0,
            "viewDatas": [
              {
                "id": 0,
                "department": "",
                "clientStatus": "",
                "dateofReceived": "2023-05-12T07:08:03.495Z",
                "clientName": "",
                "clientJobId": "",
                "fileName": "",
                "jobStatusDescription": "",
                "username": "",
                "salesPersonName": "",
                "customerName": "",
                "temp": "",
                "style": "",
                "projectCode": "",
                "teamCode": "",
                "schoolName": "",
                "ground": "",
                "gender": "",
                "fileInwardMode": "",
                "status": true,
                "dateofUpload": "",
                "priority": "",
                "clientSalesPerson": "",
                "poNo": "",
                "dateofDelivery": "",
                "division": "",
                "uploadedBy": 0
              }
            ],
            "createdBy": 0,
            "poDate": "2023-05-12T07:08:03.495Z",
            "ccId": 0,
            "ccEmailId": "",
            "dateofDelivery": "2023-05-12T07:08:03.495Z",
            "getAllValues": Gridwithmultiplefilesname
          };

          let joborderconverted = {
            GetAllValues: Gridwithmultiplefilesname,
          }

          this.spinnerService.requestStarted();
          this.http.post<any>(environment.apiURL + 'JobOrder/DirectOrder', senddata).pipe(

            catchError((error) => {

              this.spinnerService.requestEnded();

              console.error('API Error:', error);



              return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');

            })

          ).subscribe(convertdata => {
            let JobId = convertdata.jobId;
            this.spinnerService.requestEnded();
            if (JobId == `File Name Already Exist!,${GetAllvalues.fileName}` || JobId == "Previous Job is not closed for the File Name and Client!") {
              Swal.fire(
                'Alert!',
                JobId,
                'info'
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              })
            }
            else {
              Swal.fire(
                'Done!',
                'Data Converted Successfully!',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              })
            }
          },
            error => {
              this.spinnerService.resetSpinner();
            })
        }
        this.iconClicked = false;

      }
    });





  }


}