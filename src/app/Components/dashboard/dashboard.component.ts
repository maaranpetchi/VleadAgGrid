import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../Spinner/spinner.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public firstValue: string='';
  public secondValue: string='';
  public thirdValue: string='';
  public isChecked: boolean=true;
  process: { Id: any; Name: any; };
  isAdmin: any;
  UserId: string;
  username: string;
  constructor(private http:HttpClient,private router:Router,private loginservice:LoginService,private spinnerService:SpinnerService,private cookieService:CookieService) { }

  ngOnInit(): void {
    this.getProcesses();
    this.checkIsAdmin();
  }
  employeeProcess:any;



  getData(){
    this.http.get<any>(environment.apiURL+`Account/getEmployeeProcess/${this.loginservice.getUsername()}`).subscribe(results =>{
      this.employeeProcess = results.employeeProcess
      if (this.employeeProcess != null) {
        if (this.employeeProcess.length > 1) {
        }
        else if (this.employeeProcess.length == 1) {
            this.process = {
                Id: this.employeeProcess[0].id,
                Name: this.employeeProcess[0].name
            };
            if (this.process.Name != "Reports")
            {
                this.gotoProcess(process);
            }
        }
    }
    else {
        alert('This Employee don\'t have permission')
    }
      });
  }

  gotoProcess(process: any) {
    localStorage.setItem('processId', process.id);
    localStorage.setItem('processName', process.name);

    if (process.id == 1) {
      this.router.navigate(['/topnavbar/clientindex']);
    } else if (process.id == 2 || process.id == 4 || process.id == 6) {
      this.router.navigate(['/PendingJobList']);
    } else if (process.id == 3 || process.id == 5 || process.id == 7 || process.id == 9 || process.id == 11) {
      this.router.navigate(['/Workflow']);
    } else if (process.Name == "Reports") {
      this.openReportsWindow();
    }
  }

  openReportsWindow() {
    const UserId = localStorage.getItem('UserId');
    window.open('http://localhost:61928/#/Login?id=' + UserId, '_blank');
  }


  Processes: any[] = [];
  getProcesses() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Account/getEmployeeProcess/${this.loginservice.getUsername()}`).subscribe(data => {
      this.spinnerService.requestEnded();
      this.Processes = data.employeeProcess;

    }, error => {
      this.spinnerService.resetSpinner();
    });
  }

  routeNav(process: any) {
    if (process.id == 1) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/clientindex']);
    }
    else if (process.id == 2) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/production']);
    }
    else if (process.id == 3) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/productionmain']);
    }
    else if (process.id == 4) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/qualityallocation']);
    }
    else if (process.id == 5) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/quality']);
    }
    else if (process.id == 6) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/proofreadingallocation']);
    }
    else if (process.id == 7) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/proofreading']);
    }
    else if (process.id == 9) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/buddyproof']);
    }
    else if (process.id == 11) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/sewout']);
    }
    else if (process.id == 1013) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.username = this.loginservice.getUsername();
      this.UserId = this.loginservice.getUserId();
      const url = `http://servicedesk.vleadservices.com:85/#/Login?id=${this.UserId}`;

      // Open the URL in a new tab/window
      window.open(url, '_blank');

    }
  }

  report(processId: number) {
    this.cookieService.set('processId', processId.toString());
    this.username = this.loginservice.getUsername();
    this.UserId = this.loginservice.getUserId();
    const url = `http://servicedesk.vleadservices.com:85/#/Login?id=${this.UserId}`;

    // Open the URL in a new tab/window
    window.open(url, '_blank');
  }
permission: any[] = []
  checkIsAdmin() {
    // this.loader = true;
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Account/checkIsAdmin/${this.loginservice.getUsername()}`).subscribe(
      (data) => {
        this.spinnerService.requestEnded();
        this.isAdmin = data.success;
        this.permission = this.GetMenuPermission(data.menu);
      },
      (error) => {
        console.error('Error checking admin status:', error);
      },
      () => {
        this.spinnerService.resetSpinner();
      }
    );
  }
  GetMenuPermission(val: string) {

    if (val) {

      val = val.replaceAll('|', '');
      const b = val.split(',');
      const c = b.map(x => parseInt(x))
      return c;
    }
    return [];
  }


  checkIsTrue(inputarray, isAdmin) {
    let result = false
    if (isAdmin) {
      result = true;
    }
    if (!result) {
      this.permission.forEach(x => {
        if (inputarray.includes(x)) {
          result = true;

        }
      })
    }
    return result;
  }
  IsMenuHaveAccess(val:number){
    console.log(val,"Value");

    let item=this.Processes.find(x=>x.id==val);

    
    if(item)
      return true;
    return false;
  }


  setProcessId(processId: number) {
    this.cookieService.set('processId', processId.toString());
  }

  setClientProcessId(processId: number) {
    this.cookieService.set('processId', processId.toString());
  }
  setProductionAllocationProcessId(processId: number) {
    this.cookieService.set('processId', processId.toString());
  }
  setQualityAllocationProcessId(processId: number) {
    this.cookieService.set('processId', processId.toString());
  }
  setQualityProcessId(processId: number) {
    this.cookieService.set('processId', processId.toString());
  }
  setProofReadingAllocationProcessId(processId: number) {
    this.cookieService.set('processId', processId.toString());
  }
  setProofReadingProcessId(processId: number) {
    this.cookieService.set('processId', processId.toString());
  }
  setBuddyProofProcessId(processId: number) {
    this.cookieService.set('processId', processId.toString());
  }
  setSewOutProcessId(processId: number) {
    this.cookieService.set('processId', processId.toString());
  }


}