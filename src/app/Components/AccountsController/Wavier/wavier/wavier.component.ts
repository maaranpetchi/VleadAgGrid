import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PopupwavierconfirmationComponent } from '../popupwavierconfirmation/popupwavierconfirmation.component';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
declare var $: any;
@Component({
  selector: 'app-wavier',
  templateUrl: './wavier.component.html',
  styleUrls: ['./wavier.component.scss']
})
export class WavierComponent {
  selectedFilter: number;
  selectedClient: number;
  selectedFileName: string;
  fromDate: string;
  toDate: string;



  message:string='';

  clients: any[]; // Change to match the shape of your client data

  constructor(private http: HttpClient, private dialog: MatDialog,private spinnerservice:SpinnerService) { }
  displayedColumns: string[] = [
    'selected',
    'jobnumber',
    'jobdate',
    'department',
    'client',
    'jobstatus',
    'filename',
    'jobdate1',

  ];

  selectedInvoices: any[] = [];


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setAll(completed: boolean, item: any) {
    if (completed == true) {
      this.selectedInvoices.push({id:item.id})
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

  


  ngOnInit(): void {

    this.onGoButtonClick()
  }

  fetchData() {
    // let url = '<your API endpoint here>';
    // // Add any necessary query parameters based on the selected filter and inputs
    // this.http.get(url).subscribe((response: any) => {
    //   this.dataSource.data = response;
    // });
  }


  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm = new FormGroup({

    selectdropdown: new FormControl("", Validators.required),
    client: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required),
    filename: new FormControl("")
  });




  onSubmit() {

    this.fetchData();
  }

  submitassignvalue(){
    if (this.selectedInvoices.length == 0) {
      // const dialogRef = this.dialog.open(PopupwavierconfirmationComponent, {
      //   width: '500px',
      //   height: '150px',
      //   data: 'Please select the list items!'

      // }
      // );
      this.message="please select the list items!"
      $('#myModal1').appendTo("body").modal('show');
    }
    else{
      
      $('#myModal').appendTo("body").modal('show');
    }
  }



  ///practice

  customers: boolean = false;
  dateFields: boolean = false;
  inputField: boolean = false;

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
this.spinnerservice.requestStarted();
      this.http.get<any[]>(environment.apiURL+'Customer/GetCustomers').subscribe({next:(clientdata) => {
        this.spinnerservice.requestEnded();

        this.clients = clientdata;
      },
      error: (err) => {
        this.spinnerservice.resetSpinner(); // Reset spinner on error
        console.error(err); 
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
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

  closebutton(){
    $('#myModal').modal('hide');
    $('#myModal1').modal('hide');
  }


  //job history

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
        DepartmentId: departmentId,
        ClientId: this.selectedClient,
        FileName: this.selectedFileName,
        JobClosedUTC: this.fromDate,
        DateofUpload: this.toDate
      };
      this.spinnerservice.requestStarted();

      this.http.post<any>(environment.apiURL+'Invoice/GetWaiverJobWithclientIdfileName', jobOrder).subscribe({next:(response) => {
        this.spinnerservice.requestEnded();
        
      this.dataSource.data = response.waiverJobList;
        // Sort dataSource based on MatSort
        this.dataSource.sort = this.sort;
        // Paginate dataSource based on MatPaginator
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.spinnerservice.resetSpinner(); // Reset spinner on error
        console.error(err); 
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
      });
      // PricingBillingInvoiceFactory.GetJobsHistory('GetWaiverJobWithclientIdfileName', jobOrder).$promise.then(function (result) {
      //    completedjobs.data = result.WaiverJobList;
      // });
    }
  };


  savechanges(){
    
    $('#myModal').modal('hide');
    this.http.post<any>(environment.apiURL+'Invoice/AddWaiverJobList',this.selectedInvoices).subscribe(data => {
     this.onGoButtonClick();
    this.message=data.message;
      $('#myModal1').appendTo("body").modal('show');
    });
  }
}
