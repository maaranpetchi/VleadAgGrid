import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-quotation-popup',
  templateUrl: './quotation-popup.component.html',
  styleUrls: ['./quotation-popup.component.scss'],
})
export class QuotationPopupComponent implements OnInit {
  Scopes: any[] = [];
  selectedScope: any = 0;
  comments: any;
  selectedfromDate: any;
  selectedFile: File[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuotationPopupComponent>,
    private builder: FormBuilder,
    private http: HttpClient,
    private loginservice: LoginService,
    private spinnerService: SpinnerService
  ) {

  }

  ngOnInit(): void {
    this.fetchScopes();
  }
  userRegistrationForm = this.builder.group({
    estimatedTime: ['', Validators.required],
    dateofDelivery: ['', Validators.required],
    comment: ['', Validators.required],
    fileattachment: ['', Validators.required],
  });

  onFileSelected(event: any) {
    this.selectedFile = [event.target.files[0], ...this.selectedFile]; //store the selected file in selectdfile
  }
  onCancel() {
    this.dialogRef.close();
  }

  onFormSubmit() {

    var confirmationMessage: any;
    let saveData = {
      id: 0,
      processId: this.loginservice.getProcessId(),
      statusId: this.data.statusId,
      selectedScopeId: this.selectedScope ? this.selectedScope : 0,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: this.userRegistrationForm.value.comment,
      isBench: true,
      jobId: this.data.jobId,
      value: 0,
      amount: 0,
      stitchCount: 0,
      estimationTime: this.userRegistrationForm.value.estimatedTime,
      dateofDelivery: this.userRegistrationForm.value.dateofDelivery,
      comments: this.userRegistrationForm.value.comment,
      validity: 0,
      copyFiles: true,
      updatedBy: 0,
      jId: 0,
      estimatedTime: this.userRegistrationForm.value.estimatedTime,
      tranMasterId: 0,
      selectedRows: [
        {
          customerId: this.data.customerId,
          departmentId: this.data.departmentId,
          estimatedTime: this.userRegistrationForm.value.estimatedTime,
          jId: this.data.jId,
          tranMasterId: this.data.tranMasterId,
          Comments: '',
          TimeStamp: '',
          SelectedEmployees: '',
          JobId: this.data.jobId,
          FileInwardType: '',
          CommentsToClient: '',
          CategoryDesc: '',
          selectedEmployees: [],
          selectedRows: [],
        },
      ],
      selectedEmployees: [],
      departmentId: 0,
      updatedUTC: '2023-06-22T11:47:25.193Z',
      categoryDesc: 'string',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: '',
      scopeId: this.selectedScope ? this.selectedScope : 0,
      quotationRaisedby: this.loginservice.getUsername(),
      quotationraisedOn: '2023-06-22T11:47:25.193Z',
      clientId: 0,
      customerId: 0,
      fileReceivedDate: '2023-06-22T11:47:25.193Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    try {
      this.spinnerService.requestStarted();
      this.http
        .post(environment.apiURL + `Allocation/processMovement`, saveData).pipe(
          catchError((error) => {
            this.spinnerService.requestEnded();
            console.error('API Error:', error);
            return Swal.fire(
              'Alert!',
              'An error occurred while processing your request',
              'error'
            );
          })
        )
        .subscribe(
          (response: any) => {

            this.spinnerService.requestEnded();
            confirmationMessage = response;
            if (response.success === true) {
              Swal.fire('Done!', response.message, 'success').then((res) => {
                if (res.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire('info!', response.message, 'info');
              console.log('Condition is false:', response);
            }
            this.http
              .post(environment.apiURL + 'Allocation/processMovement', saveData)
              .subscribe((result) => {
                confirmationMessage = result;
                if (this.selectedFile.length > 0) {
                  var fd = new FormData();
                  for (let i = 0; i < this.selectedFile.length; i++) {
                    fd.append('file', this.selectedFile[i]);
                  }
                  this.spinnerService.requestStarted();
                  this.http
                    .post(environment.apiURL + `File/uploadFiles/${this.data.jId}/0/${this.loginservice.getProcessId()}/${this.data.statusId}/1/${this.loginservice.getProcessId()}/${this.data.statusId}`, fd)
                    .subscribe({
                      next: (data) => {
                        this.spinnerService.requestEnded();
                        this.selectedFile = [];
                        window.location.reload();
                      },
                      error: (err) => {
                        this.spinnerService.resetSpinner();
                        console.log(err);
                      },
                    });
                }
              });
          },
          (error) => {
            console.error('An error occurred:', error);
          }
        );
    } catch (error) {
      this.spinnerService.resetSpinner();
      console.error('API Error:', error);
      Swal.fire(
        'Alert!',
        'An error occurred while processing your request',
        'error'
      );
    }


  }
  fetchScopes() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getScopeValues/${this.loginservice.getUsername()}`
      )
      .subscribe((scopedata) => {
        this.Scopes = scopedata.scopeDetails;
        this.spinnerService.requestEnded();

      });
  }
}
