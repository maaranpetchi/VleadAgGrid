import { ClientorderstableComponent } from '../clientorderstable/clientorderstable.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
@Component({
  selector: 'app-clientorders',
  templateUrl: './clientorders.component.html',
  styleUrls: ['./clientorders.component.scss'],
})
export class ClientordersComponent implements OnInit {
  @ViewChild(ClientorderstableComponent)
  ClientorderstableComponent: ClientorderstableComponent;

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  DivisionApiData: any[];
  ngOnInit(): void {
    this.getDivisionAPi();
    this.getmattabcount();
    this.getclientordercount();
  }

  getDivisionAPi() {
    //division dropdown
    this.spinnerService.requestStarted();
    this.http
      .get<any>(environment.apiURL + 'ClientOrderService/nGetDivisionForJO')
      .subscribe({
        next: (divisiondata) => {
          this.spinnerService.requestEnded();
          this.DivisionApiData = divisiondata;
        },
        error: (err) => {
          this.spinnerService.resetSpinner(); // Reset spinner on error
          console.error(err);
          Swal.fire('Error!', 'An error occurred !.', 'error');
        },
      });
  }

  onTabChange(event: any) {
    // Update the REST API based on the selected tab

    switch (event.index) {
      case 0: // Fresh Jobs tab
        // Call your REST API for Fresh Jobs
        this.BindPendingJobs();

        break;
      case 1: // Revision Jobs tab
        // Call your REST API for Revision Jobs
        this.quotationjobs();

        break;
      case 2: // Rework Jobs tab
        // Call your REST API for Rework Jobs
        this.convertedjobs();
        break;
      case 3: // Quote Jobs tab
        // Call your REST API for Quote Jobs
        this.deletedjobs();
        break;
      case 4: // Bulk Jobs tab
        // Call your REST API for Bulk Jobs
        this.quotenotapprovaljobs();
        break;
      case 5: // Bulk Upload Jobs tab
        // Call your REST API for Bulk Upload Jobs
        this.queryforsp();
        break;
      default:
        break;
    }
  }

  BindPendingJobs() {
    this.ClientorderstableComponent.tab('1');
  }
  quotationjobs() {
    this.ClientorderstableComponent.tab('2');

    
  }
  convertedjobs() {
    this.ClientorderstableComponent.tab('3');
  }
  deletedjobs() {
    this.ClientorderstableComponent.tab('4');
  }
  quotenotapprovaljobs() {
    this.ClientorderstableComponent.tab('5');
  }
  queryforsp() {
    this.ClientorderstableComponent.tab('6');
  }

  NewJobCount: any;
  QuoteJobCount: any;
  getclientordercount() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(environment.apiURL + `ClientOrderService/ClientOrdersCount/1`).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);

   

          return Swal.fire('Alert!','An error occurred while processing your request','error');

        })

      )
      .subscribe((responsedata1) => {
        this.spinnerService.requestEnded();
        this.NewJobCount = responsedata1.count;
      });
    this.spinnerService.requestStarted();
    this.http
      .get<any>(environment.apiURL + `ClientOrderService/ClientOrdersCount/2`).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);

   

          return Swal.fire('Alert!','An error occurred while processing your request','error');

        })

      )
      .subscribe((responsedata2) => {
        this.spinnerService.requestEnded();
        this.QuoteJobCount = responsedata2.count;
      });
  }

  NewJobTabCount: number;
  QuotationTabCount: number;
  ConvertedJobTabCount: number;
  DeletedJobTabCount: number;
  QuoteNotApprovalJobTabCount: number;
  QueryforjobJobTabCount: number;

  getmattabcount() {
    this.spinnerService.requestStarted();

    this.http
      .get<any>(environment.apiURL + `ClientOrderService/ClientOrdersCount/1`).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);

   

          return Swal.fire('Alert!','An error occurred while processing your request','error');

        })

      )
      .subscribe((responsedata1) => {
        this.spinnerService.requestEnded();

        this.NewJobTabCount = responsedata1.count;
      });

    this.spinnerService.requestStarted();
    this.http
      .get<any>(environment.apiURL + `ClientOrderService/ClientOrdersCount/2`).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);

   

          return Swal.fire('Alert!','An error occurred while processing your request','error');

        })

      )
      .subscribe((responsedata2) => {
        this.spinnerService.requestEnded();

        this.QuotationTabCount = responsedata2.count;
      });
    this.spinnerService.requestStarted();

    this.http
      .get<any>(environment.apiURL + `ClientOrderService/ClientOrdersCount/3`).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);

   

          return Swal.fire('Alert!','An error occurred while processing your request','error');

        })

      )
      .subscribe((responsedata3) => {
        this.spinnerService.requestEnded();

        this.ConvertedJobTabCount = responsedata3.count;
      });
    this.spinnerService.requestStarted();

    this.http
      .get<any>(environment.apiURL + `ClientOrderService/ClientOrdersCount/4`).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);

   

          return Swal.fire('Alert!','An error occurred while processing your request','error');

        })

      )
      .subscribe((responsedata4) => {
        this.spinnerService.requestEnded();

        this.DeletedJobTabCount = responsedata4.count;
      });
    this.spinnerService.requestStarted();

    this.http
      .get<any>(environment.apiURL + `ClientOrderService/ClientOrdersCount/5`).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);

   

          return Swal.fire('Alert!','An error occurred while processing your request','error');

        })

      )
      .subscribe((responsedata5) => {
        this.spinnerService.requestEnded();

        responsedata5;
        this.QuoteNotApprovalJobTabCount = responsedata5.count;
      });
    this.spinnerService.requestStarted();

    this.http
      .get<any>(
        environment.apiURL +
          `CustomerQuery/GetNotApprovedQueryForSPJobsToCCCount`
      ).pipe(

        catchError((error) => {

          this.spinnerService.requestEnded();

          console.error('API Error:', error);

   

          return Swal.fire('Alert!','An error occurred while processing your request','error');

        })

      )
      .subscribe((responsedata6) => {
        this.spinnerService.requestEnded();

        this.QueryforjobJobTabCount = responsedata6.count;
      });
  }
}
