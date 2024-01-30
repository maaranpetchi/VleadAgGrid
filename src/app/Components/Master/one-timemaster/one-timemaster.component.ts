import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { OneTimemasterService } from 'src/app/Services/OneTimeMaster/one-timemaster.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-one-timemaster',
  templateUrl: './one-timemaster.component.html',
  styleUrls: ['./one-timemaster.component.scss'],
})
export class OneTimemasterComponent implements OnInit {
  currentTab: string = 'Add';
  selectedOption: string;
  valueInput: string;
  editvalueInput: string;

  selectedCustomerContactName: string;
  CustomerContactName: any[];

  options = [
    'CustomerClassification',
    'Department',
    'Designation',
    'FileInwardType',
    'PricingType',
    'Proficiency',
    'RemovalReasons',
    'ResignReasons',
  ];
  constructor(
    private _service: OneTimemasterService,
    private loginService: LoginService,
    private coreservice: CoreService,
    private builder: FormBuilder,
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
  }

  userRegistrationForm = this.builder.group({
    chooseRole: ['', Validators.required],
    valueInput: ['', Validators.required],
    // Edit formControl values
    customercontactname: ['',],
    clientname: ['',],
    editvalueInput: ['',],
    //  Delete formControl values
    deleteMastertname: [''],
    deleteMastercontactname: ['']
  });

  showTabContent(tab: string): void {
    this.currentTab = tab;
  }
  getcustomername() {
    this.spinnerService.requestStarted();

    this.http
      .get<any>(
        environment.apiURL + `SingleEntry/getTableValue?tableName=${this.selectedOption}`
      ).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      }))
      .subscribe((CustomerContactName) => {
        this.spinnerService.requestEnded();
        this.CustomerContactName = CustomerContactName;

      });
  }
  getTimematerId(data: any) {
    this.userRegistrationForm
      .get('editvalueInput')?.patchValue(
        this.CustomerContactName.find((x) => x.id === data).description
      );
  }



  getOneTimeTable(id: any) {
    this._service.getTableValue(id).subscribe((data) => {
    });
  }

  addSelection() {
    let saveData = {
      id: 0,
      description: '',
      isDeleted: false,
      createdUTC: new Date().toISOString(),
      updatedUTC: new Date().toISOString(),
      createdBy: this.loginService.getUsername(),
      updatedBy: 0,
      tableName: this.userRegistrationForm.value.chooseRole,
      tableValue: '',
      tableValueText: this.userRegistrationForm.value.valueInput,
      action: this.currentTab,
    };
    this._service.oneTimemasterService(saveData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (response) => {
        this.spinnerService.requestEnded();
        // this.coreservice.openSnackBar('One Timemaster added!');
        if (response.message === true) {
          Swal.fire('Done!', 'One Timemaster Added', 'success');
        } else {
          return;
        }

      },
      error: (err: any) => {
        throw new Error('API Error', err);
      },
    });
    // Add logic to handle adding the selected option and input value

  }

  updateSelection() {
    let updateData = {
      id: 0,
      description: 'string',
      isDeleted: false,
      createdUTC: new Date().toISOString(),
      updatedUTC: new Date().toISOString(),
      createdBy: this.loginService.getUsername(),
      updatedBy: this.loginService.getUsername(),
      tableName: this.userRegistrationForm.value.clientname,
      tableValue: this.userRegistrationForm.value.customercontactname,
      tableValueText: this.userRegistrationForm.value.editvalueInput,
      action: this.currentTab,
    }
    this.spinnerService.requestStarted();
    this._service.oneTimemasterService(updateData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (response) => {
        this.spinnerService.requestEnded();
        // this.coreservice.openSnackBar('OneTime Master Updated!');
        if (response.message === true) {
          Swal.fire('Done!', 'OneTime Master Updated!', 'success');
        } else {
          return;
        }
      },
      error: (err: any) => {
        throw new Error('API Error', err);
      },
    });
  }

  deleteSelection() {
    let deleteData = {
      id: 0,
      description: '',
      isDeleted: false,
      createdUTC: new Date().toISOString(),
      updatedUTC: new Date().toISOString(),
      createdBy: this.loginService.getUsername(),
      updatedBy: this.loginService.getUsername(),
      tableName: this.userRegistrationForm.value.deleteMastertname,
      tableValue: this.userRegistrationForm.value.deleteMastercontactname,
      tableValueText: this.userRegistrationForm.value.deleteMastercontactname,
      action: this.currentTab,
    }
    this.spinnerService.requestStarted();
    this._service.oneTimemasterService(deleteData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (response: any) => {
        this.spinnerService.requestEnded();
        Swal.fire('Done!', 'Record Remved SuccessFully!', 'success');
        // this.coreservice.openSnackBar('Record Remved SuccessFully!');
        this.userRegistrationForm.reset();
        if (response.message === true) {
          Swal.fire('Done!', 'User detail updated!', 'success');
        } else {
          return;
        }
      },
      error: (err: any) => {
        throw new Error('API Error', err);
      },
    });
  }

  clearSelection() {
    // Add logic to clear the selected option and input value
    // this.selectedOption = '';
    // this.inputValue = null;
    window.location.reload();
  }
}
