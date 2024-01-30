import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JobHistoryService } from 'src/app/Services/JobHistory/job-history.service';
import { JobhistoryDetailsComponent } from '../jobhistory-details/jobhistory-details.component';
import { SpinnerService } from '../../Spinner/spinner.service';
import { environment } from 'src/Environments/environment';
import { catchError } from 'rxjs';
import { error } from 'jquery';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.scss']
})
export class JobHistoryComponent implements OnInit {
  selectedFilter: number;
  selectedClient: number;
  recordCount: number;
  selectedFileName: string;
  fromDate: string;
  toDate: string;
  clients: any[];

  selectedInvoices: any[] = [];


  client: boolean = false;
  customers: boolean = false;
  dateFields: boolean = false;
  inputField: boolean = false;


  constructor(
    private _service: JobHistoryService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private spinnerService: SpinnerService,
  ) { }

  displayedColumns: string[] = [
    'jobnumber',
    'estqueryDate',
    'department',
    'client',
    'clientstatus',
    'jobstatus',
    'projectCode',
    'filename',
    'fileinward',
    'filereceived',
    'process',
    'status',
    'comments',

  ];



  dataSource = new MatTableDataSource<any>([]); // Replace YourDataType with the actual type of your data
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.onGoButtonClick()

    const records = [];

  }

  myForm = new FormGroup({
    selectdropdown: new FormControl("", Validators.required),
    client: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required),
    filename: new FormControl(""),
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  });

  onFilterChange() {
    if (this.selectedFilter == 1 || this.selectedFilter == 2 || this.selectedFilter == 0) {
      this.customers = false;
      this.inputField = false;
      this.dateFields = false;
      this.selectedFileName = '';
      this.fromDate = '';
      this.toDate = '';

      this.selectedClient = 0;
    }
    if (this.selectedFilter == 3) {
      this.customers = true;
      this.inputField = false;
      this.dateFields = false;
      this.selectedFileName = '';
      this.fromDate = '';
      this.toDate = '';

      this.spinnerService.requestStarted();
      this.http.get<any>(environment.apiURL + 'Customer/GetCustomers').pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(clientdata => {
        this.spinnerService.requestEnded();
        this.clients = clientdata.sort();
      });

    }
    else if (this.selectedFilter == 4) {
      this.inputField = true;
      this.customers = false;
      this.dateFields = false;
      this.selectedClient = 0;
      this.fromDate = '';
      this.toDate = '';

    }

    else if (this.selectedFilter == 6) {
      this.inputField = false;
      this.customers = false;
      this.dateFields = true;
      this.selectedClient = 0;
      this.selectedFileName = '';

    }
  };
  onGoButtonClick() {

    if (this.selectedClient != undefined || this.selectedFileName != undefined || this.selectedFilter != undefined || this.fromDate != undefined || this.toDate != undefined) {
      if ((this.selectedClient == undefined || this.selectedClient == null)) {
        this.selectedClient = 0;
      }
      if ((this.selectedFileName == undefined || this.selectedFileName == null || this.selectedFileName == '')) {
        this.selectedFileName = '';
      }
      var departmentId = this.selectedFilter;
      if (departmentId == 3 || departmentId == 4 || departmentId == 6) {
        departmentId = 0;
      }
      var jobOrder = {
        "clientId": this.selectedClient,
        "departmentId": departmentId,
        "transactionId": 0,
        "jobClosedUTC": "",
        "dateofUpload": "",
        "fileName": this.selectedFileName
      };
      this.spinnerService.requestStarted();
      this.http.post<any>(environment.apiURL + 'Allocation/getJobMovementJobsWithclientIdfileName', jobOrder).pipe(catchError((error) => {
        this.spinnerService.requestEnded();
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })).subscribe(response => {
        this.spinnerService.requestEnded();
        this.dataSource.data = response.jobMovement;
        this.recordCount = response.jobMovement.length;
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      })
    }
  };
  setAll(completed: boolean, item: any) {
    if (completed == true) {
      this.selectedInvoices.push({ id: item.id })
    }
    else {

      if (this.selectedInvoices.find(x => x.id == item.id)) {
        this.selectedInvoices = this.selectedInvoices.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getJobHistory(data) {
    this.dialog.open(JobhistoryDetailsComponent, {
      height: '80vh',
      width: '80vw',
      data: data
    })
  }


  // Function to export table data as CSV
  exportToCsv() {
    // Check if there is no data in the table
    if (this.dataSource.data.length === 0) {
      Swal.fire('Alert', 'No Records in the table', 'info');
      return;
    }

    const header = ['JobNumber', 'Est Job/Query Date', 'Department', 'Client', 'Client Status', 'JobStatus', 'Project Code', 'FileName', 'File Inward Mode', 'File Recevied Date', 'Process', 'Status', 'Comments To Client'];

    // Access the data array from the MatTableDataSource
    const csvData = this.dataSource.data.map(row => {
      return [
        row.jobId,
        row.estJobDate,
        row.description,
        row.name,
        row.customerJobType,
        row.jobStatusDescription,
        row.projectCode,
        row.fileName,
        row.fileInwardType,
        row.fileReceivedDate,
        row.processName,
        row.status,
        row.commentsToClient
      ].join(',');
    });

    const csv = [header.join(','), ...csvData].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    FileSaver.saveAs(blob, 'Job-History.csv');
  }

}
