import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/AccountController/NonBillablejobs/Core/core.service';
import { NonbillablejobsService } from 'src/app/Services/AccountController/NonBillablejobs/nonbillablejobs.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-nonbillablejobs',
  templateUrl: './nonbillablejobs.component.html',
  styleUrls: ['./nonbillablejobs.component.scss']
})
export class NonbillablejobsComponent implements OnInit {
  displayedColumns: string[] = [
    'selected',
    'jobid',
    'jobdate',
    'filename',
    'department',
    'jobstatus',
    'customer',
    'Scope',
    'stitchcount',
    'nonbillablestatus',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorttable!: MatSort;
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private _empService: NonbillablejobsService,
    private spinnerService: SpinnerService,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      fromdate: '',
      todate: '',
      customer: 0,
      department: 0,
    });
  }

  selectednonbillableOption: any = 0;
  Nonbillabledropdownvalues: any[] = [];

  //Customerdropdownvalues dropdowndeclaration
  selectedcustomerOption: any = '';
  Customerdropdownvalues: any[] = [];
  //Customerdropdownvalues dropdowndeclaration
  selecteddepartmentOption: any = '';
  Departmentdropdownvalues: any[] = [];

  ngOnInit(): void {

    this.getCustomerData();
    this.getDropdownData();
    this.getNonBillable();



  }

  getCustomerData() {
    // customerdata dropdown fetch the values from the API
    this.spinnerService.requestStarted();
    this.http.get<any[]>(environment.apiURL + 'Dropdown/GetCustomers').subscribe({
      next: (customerdata) => {
        this.spinnerService.requestEnded();

        this.Customerdropdownvalues = customerdata;
        // Sort the array by a specific property
        this.Customerdropdownvalues.sort((a, b) => {
          if (a.shortName < b.shortName) {
            return -1;
          } else if (a.shortName > b.shortName) {
            return 1;
          } else {
            return 0;
          }
        });
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    });
  }

  getDropdownData() {
    // Departmentdropdownvalues  dropdown fetch the values from the API
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'Employee/GetDropDownList').subscribe({
      next: (departmentdata) => {
        this.spinnerService.requestEnded();
        this.Departmentdropdownvalues = departmentdata.designationList;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    });
  }

  getNonBillable() {
    //Nonbillable
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'JobOrder/nGetNonBillable').subscribe({
      next: (nonbillabledata) => {
        this.spinnerService.requestEnded();

        this.Nonbillabledropdownvalues = nonbillabledata.getDDLNBList;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred while deleting data.',
          'error'
        );
      }
    });
  }
  selectedInvoices: any[] = [];

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
  shownonbillable: boolean = false;

  employeeFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onFormSubmit() {
    this.spinnerService.requestStarted();

    this._empService.addEmployee(this.empForm.value).subscribe({
      next: (val: any) => {
        this.spinnerService.requestStarted();
        Swal.fire(
          'Done!',
          'Data Added Successfully!.',
          'success'
        );

      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  onGoButtonClick() {
    this.shownonbillable = true;
    let data: any = {
      "fromDate": this.empForm.value.fromdate,
      "toDate": this.empForm.value.todate,
      "clientId": this.empForm.value.customer,
      "departmentId": this.empForm.value.department
    };
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'JobOrder/nGetNonBillableData', data).subscribe({
      next: (response) => {
        this.spinnerService.requestEnded();

        this.dataSource.data = response.getNonBList;
        // Sort dataSource based on MatSort
        this.dataSource.sort = this.sorttable;
        // Paginate dataSource based on MatPaginator
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    });
    // PricingBillingInvoiceFactory.GetJobsHistory('GetWaiverJobWithclientIdfileName', jobOrder).$promise.then(function (result) {
    //    completedjobs.data = result.WaiverJobList;
    // });
  }

  submitnonbillable() {
    let temparray = this.selectedInvoices.map(x => {
      return {
        "id": x.id,
        "nonBillableId": 0,
        "getNBPara": []
      }
    })

    let data = {
      "id": 0,
      "nonBillableId": this.selectednonbillableOption,
      "getNBPara": temparray
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'JobOrder/nUpdateNonBillable', data).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();

        Swal.fire(
          'Done!',
          data.updateNonBList,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.selectedInvoices = [];
            this.onGoButtonClick();
        }
        });
       
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }
    })
  }

};

