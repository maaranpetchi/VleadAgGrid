import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environments/environment';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
@Component({
  selector: 'app-bench-options',
  templateUrl: './bench-options.component.html',
  styleUrls: ['./bench-options.component.scss']
})
export class BenchOptionsComponent implements OnInit {
  list: any;
  disableWorkTypeEnd: boolean;

  Statusid: string = '';
  Remarks: string = '';
  ngOnInit(): void {
    this.getStatus();
    this.getButton();
  }
  constructor(private http: HttpClient, private _coreService: CoreService, private loginservice: LoginService, private spinnerService: SpinnerService, private router: Router) { }
  disableWorkType: boolean = false;


  GetStatuslist: any[] = [];
  getStatus() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `BenchOption/GetStatus?EmployeeId=${this.loginservice.getUsername()}`).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (results) => {
        this.spinnerService.requestEnded();

        this.GetStatuslist = results.data;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred!',
          'error'
        );
      }
    })
  }
  getButton() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `BenchOption/Getbutton?EmployeeId=${this.loginservice.getUsername()}`).subscribe((status) => {
      this.spinnerService.requestEnded();
      this.disableWorkType = status.data.start;
      console.log(status, "Status")
      console.log(status.data.start, "StatusStart")

      if (status.data.message == "Null") {
        Swal.fire('Alert', 'Close you regular job for further step..!', 'info').then((res) => {
          if (res.isConfirmed) {
            this.router.navigate(['/topnavbar/dashboard']);

            // window.location.reload();
          }
        })
      }
    })
  }



  changeBench(data) {
    if (data == 'Start') {
      var Startbench = {
        EmployeeId: this.loginservice.getUsername(),
        Status: ''
      }
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + `BenchOption/Startbench?Worktype=Start`, Startbench).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe({
        next: (result) => {
          this.spinnerService.requestEnded();
          this.list = result;
          if (result.data == true) {
            this.disableWorkType = true;
            this.disableWorkTypeEnd = false;
          }
        },
        error: (err) => {
          this.spinnerService.resetSpinner(); // Reset spinner on error
          console.error(err);
          Swal.fire(
            'Error!',
            'An error occurred!',
            'error'
          );
        }
      });


    }
    else if (data == 'Break') {
      var Startbench = {
        EmployeeId: this.loginservice.getUsername(),
        Status: ''
      }

      this.spinnerService.requestStarted();

      this.http.post<any>(environment.apiURL + `BenchOption/Startbench?Worktype=Break`, Startbench).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe({
        next: (result) => {
          this.spinnerService.requestEnded();
          this.list = result;
          if (result.data == true) {
            this.disableWorkType = false;
            this.disableWorkTypeEnd = true;
          }
        },
        error: (err) => {
          this.spinnerService.resetSpinner(); // Reset spinner on error
          console.error(err);
          Swal.fire(
            'Error!',
            'An error occurred!',
            'error'
          );
        }
      });

    }
    else {
      const requiredFields: string[] = [];
      if (!this.Statusid) {
        requiredFields.push('Status');
      }
      if (!this.Remarks) {
        requiredFields.push('Remark');
      }



      if (requiredFields.length === 0) {
        let Startbench = {
          Status: this.Statusid,
          EmployeeId: this.loginservice.getUsername(),
          Remarks: this.Remarks,
        }
        this.spinnerService.requestStarted();
        this.http.post<any>(environment.apiURL + `BenchOption/Startbench?Worktype=End`, Startbench).pipe(catchError((error) => {
          this.spinnerService.requestEnded();
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
        })).subscribe({
          next: (result) => {
            this.spinnerService.requestEnded();

            this.list = result;
            if (result.data == true) {
              this.Statusid = "";
              this.Remarks = "";
              this.disableWorkType = false;
              this.disableWorkTypeEnd = true;
              Swal.fire(
                'Done!',
                'End files successfully!',
                'success'
              );
            }
          },
          error: (err) => {
            this.spinnerService.resetSpinner(); // Reset spinner on error
            console.error(err);
            Swal.fire(
              'Info!',
              'An error occurred !',
              'info'
            );
          }
        });

      } else {
        // Show validation error message with missing field names
        const missingFields = requiredFields.join(', ');
        Swal.fire('Required Fields', `Please fill in the following required fields: ${missingFields}.`, 'error');
      }


      // else {
      //     alert('in else');
      // }
    }
  }



}
