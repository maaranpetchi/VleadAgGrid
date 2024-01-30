import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CreditDaysService } from 'src/app/Services/sales/creditdaysApproval/credit-days.service';
import { SpinnerService } from '../../Spinner/spinner.service';

@Component({
  selector: 'app-creditdays-approval',
  templateUrl: './creditdays-approval.component.html',
  styleUrls: ['./creditdays-approval.component.scss'],
})
export class CreditdaysApprovalComponent implements OnInit, OnDestroy {
  constructor(
    private _service: CreditDaysService,
    private loginservice: LoginService,
    private http: HttpClient,
    private spinner: SpinnerService
  ) {}

  displayedColumns: string[] = [
    'customerName',
    'Creditdays',
    'creditLimit',
    'remarks',
    'approvedBy',
    'approveddate',
    'createdBy',
    'createddate',
    'approvalType',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.getAllApprovals();
  }
  checkAdmin(): Observable<any> {
    return this.http.get(
      environment.apiURL +
        `Account/checkIsAdmin/${this.loginservice.getUsername()}`
    );
  }
  checkUserName(): Observable<any> {
    return this.http.get(
      environment.apiURL +
        `Account/getEmployeeProcess/${this.loginservice.getUsername()}`
    );
  }
  getAllApprovals() {
    this.spinner.requestStarted();
    let saveData = {
      creditDays: 0,
      remarks: 'string',
      approvalType: 'string',
      clientId: 0,
      employeeId: this.loginservice.getUsername(),
      creditLimit: 0,
    };
    this.http
      .post(environment.apiURL + 'ClientOrderService/GetAllApproval', saveData)
      .subscribe({
        next: (response: any) => {
          this.spinner.requestEnded();
          this.dataSource = new MatTableDataSource(response.approvalDetails);
          // this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          this.spinner.resetSpinner();

          console.log(err);
        },
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
