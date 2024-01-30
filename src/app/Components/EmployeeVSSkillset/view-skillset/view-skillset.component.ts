import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../Spinner/spinner.service';
import { EmployeevsskillsetService } from 'src/app/Services/EmployeeVsSkillset/employeevsskillset.service';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
@Component({
  selector: 'app-view-skillset',
  templateUrl: './view-skillset.component.html',
  styleUrls: ['./view-skillset.component.scss']
})
export class ViewSkillsetComponent implements OnInit {
  apiResponseData: any;
  ngOnInit(): void {
    let data: any[] = [];
    if (this._empservice.shouldFetchData) {
      const data = this._empservice.getData();
      this.apiResponseData = data.data;
      this.fetchUpdateData();
      this._empservice.shouldFetchData = false;
    }
  }

  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerService, private _empservice: EmployeevsskillsetService,private _empService:EmployeevsskillsetService) { }

  employeeCode: string;
  employeeName: string;
  employeeDivision: string;
  employeeWorkingStatus: string;
  employeeSkill: string;
  proficiencyLevel: string;

  fetchUpdateData() {
    this.employeeCode = this.apiResponseData.employeeCode
    this.employeeName = this.apiResponseData.employeeName
    this.employeeDivision = this.apiResponseData.divisionName
    this.employeeWorkingStatus = this.apiResponseData.workingStatus
    this.employeeSkill = this.apiResponseData.skillSetName
    this.proficiencyLevel = this.apiResponseData.proficiencyLevel

  }



  openEditForm() {
    this.spinnerService.requestStarted();

    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/GetEmployeeVsSkillsetbyId?id=${this.apiResponseData.id}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(results => {
      this.spinnerService.requestEnded();
      this._empService.setViewData({ type: 'EDIT', data: results });
      this._empService.shouldFetchData = true;
      this.router.navigate(['/topnavbar/updateskillset']);
    });
  
  }


  cancel(){
    this.router.navigate(['/topnavbar/indexskillset']);

  }
}
