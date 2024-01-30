import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScopeService } from 'src/app/Services/Scope/scope.service';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-view-edit-scope',
  templateUrl: './view-edit-scope.component.html',
  styleUrls: ['./view-edit-scope.component.scss'],
})
export class ViewEditScopeComponent implements OnInit {
  selectedAccessNameOption: string;

  selectedDepartment: '';
  data: any;
  responseData: any;
  departments: any[];
  isAddMode!: boolean;

  constructor(
    private _scopeService: ScopeService,
    private builder: FormBuilder,
    private router: Router,
    private _coreService: CoreService,
    private loginservice: LoginService,
    private spinnerService: SpinnerService,
    private http: HttpClient
  ) {}
  scopeID: any;
  ngOnInit(): void {
    this.listScope();

    this.responseData = history.state.data;
    // this.scopeID = this.responseData.department.id;
    this.userRegistrationForm
      .get('departmentName')
      ?.patchValue(this.responseData.department.id);
    this.userRegistrationForm
      .get('description')
      ?.patchValue(this.responseData.description);

    // this._scopeService.getScopeData().subscribe((data: any) => {
    // });
  }

  userRegistrationForm = this.builder.group({
    departmentName: '',
    description: '',
  });

  listScope() {
    this.spinnerService.requestStarted();

    this._scopeService.listScopes().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((data) => {
      this.spinnerService.requestEnded();

      this.departments = data.departmentList;
    });
  }

  onFormSubmit() {

    let saveData = {
      id:  this.responseData.id,
      departmentId: this.userRegistrationForm.value.departmentName,
      description: this.userRegistrationForm.value.description,
      isDeleted: false,
      createdUtc:new Date().toISOString(),
      updatedUtc: new Date().toISOString(),
      createdBy: this.loginservice.getUsername(),
      updatedBy: this.loginservice.getUsername(),
      needTraining: false,
      scopeGroupId: null,
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
    };
    this.spinnerService.requestStarted();
    this._scopeService.updateScope(saveData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (response: any) => {
        this.spinnerService.requestEnded();
        if (response.message == true) {
          Swal.fire('Done!', 'Scope updated successfully', 'success').then((response)=>{
            if(response.isConfirmed){
              this.router.navigate(['/topnavbar/master-scope']);
            }
          });
        } else {
          return;
        }
      },
      error: (err: any) => {
        throw new Error('API Error', err);
      },
    });
  }
  onCancel() {
    this.router.navigate(['/topnavbar/master-scope']);
  }
}
