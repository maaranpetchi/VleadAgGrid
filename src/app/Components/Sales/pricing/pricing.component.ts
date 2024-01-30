import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../Spinner/spinner.service';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  // Declarations
  showTable: boolean = false;
  notshowntodigi: boolean = false;
  type2: boolean = false;
  type22: boolean = false;
  type6: boolean = false;
  showeffective: boolean = false;
  showstaffingcounttable: boolean = false;
  showstaffingcount: boolean = false;
  notshowntocount: boolean = false;
  showcounttable: boolean = false;
  showcounttabletime: boolean = false;
  ScopeBasedRateBasedFileCountTable: boolean = false;
  EstimatedTimeTable: boolean = false;
  StaffingCountTable: boolean = false;
  showtodate: boolean = false;

  Customer: any[] = [];
  customers: any;
  departments: any;
  selectedValue: any;
  Pricings: any;
  selectedPricing: any;
  selectedCustomers: any;
  selectedScope: any;
  selectedAdditionalRate: any;
  selectedEstTime: any;
  selectedMaximumPrice: any;
  selectedfromDate: any;
  selectedValueEfect: any;
  selectedEffectivefromDate: any;
  selectedEffectivetoDate: any;
  selectedPrice: any;
  selectedFrom: any;
  selectedTo: any;
  selectedCountPrice: any;
  selectedDesignation: any;
  Scopes: any[] = [];
  dropdownOptions: any;
  ViewFileCountTable: any[]=[];
  AddedRecord: any = [];
  newItem: any = {};

  pricingtype: any;
  submitted: boolean;
  jobStatusFormControl: any;
  userRegistrationForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private spinner: SpinnerService,
    private loginservice: LoginService,
    private _coreService: CoreService,
    private router:Router
  ) {}
  departmentFormControl = new FormControl('', Validators.required);
  ngOnInit(): void {
    this.loadDepartments();
    this.loadCustomer();
    this.userRegistrationForm = this.builder.group({
      departmentFormControl: this.departmentFormControl,
      pricingFormControl: ['', Validators.required],
      customersFormControl: ['', Validators.required],
      additionalRateFormControl: ['', Validators.required],
      estimatedTimeFormControl: ['', Validators.required],
      maximumPriceFormControl: ['', Validators.required],
      effectFormControl: ['', Validators.required],
      jobStatusFormControl: ['', Validators.required],
      effectToControl: ['', Validators.required],
      PriceFormControl: ['', Validators.required],
      scopeCountFormControl: ['', Validators.required],
      countFromFormControl: ['', Validators.required],
      countToFormControl: ['', Validators.required],
      countPriceFormControl: ['', Validators.required],
      designationFormControl: ['', Validators.required],
    });
  }
  onDepartmentChange(): void {
    this.selectedCustomers = null;
    this.http
      .get(
        environment.apiURL +
          `Pricing/PricingTypesByDeptId?departmentId=${this.selectedValue}`
      )
      .subscribe({
        next: (response: any) => {
          this.Pricings = response;
          this.showTable = true;
        },
        error: (err) => {
          console.log(err, 'Error');
        },
      });
  }
  loadDepartments(): void {
    this.http.get(environment.apiURL + 'Pricing/pricingList').subscribe(
      (response: any) => {
        this.departments = response.departments;
      },
      (error) => {
        console.log('Error loading departments values:', error);
      }
    );
  }
  onPricingTypeChange(pricingType: any): void {
    if (pricingType != undefined) {
      //  this.pricingtype = pricingType.Id;
      if (pricingType == 1 || pricingType == 9) {
        this.type2 = false;
        this.type22 = false;
        this.type6 = false;
        this.showeffective = true;
        this.notshowntodigi = true;
        //$scope.showstaffing = false;
        this.showcounttable = false;
        this.showcounttabletime = false;
        this.showstaffingcounttable = false;
        this.notshowntocount = true;
        this.ScopeBasedRateBasedFileCountTable = false;
        this.EstimatedTimeTable = false;
        this.showtodate = false;
      } else if (pricingType == 2) {
        this.type2 = true;
        this.type22 = true;
        this.type6 = false;
        this.showeffective = true;
        this.notshowntodigi = true;
        //$scope.showstaffing = false;
        this.showcounttable = false;
        this.showcounttabletime = false;
        this.showstaffingcounttable = false;
        this.notshowntocount = true;
        this.ScopeBasedRateBasedFileCountTable = false;
        this.EstimatedTimeTable = false;
        this.showtodate = false;
      } else if (pricingType == 13 || pricingType == 14) {
        this.type2 = true;
        this.type22 = false;
        this.type6 = false;
        this.showeffective = true;
        this.notshowntodigi = true;
        //$scope.showstaffing = false;
        this.showcounttable = false;
        this.showcounttabletime = false;
        this.showstaffingcounttable = false;
        this.notshowntocount = false;
        this.ScopeBasedRateBasedFileCountTable = false;
        this.EstimatedTimeTable = false;
        this.showtodate = false;
      } else if (pricingType == 11 || pricingType == 12) {
        this.type2 = false;
        this.type22 = false;
        this.type6 = false;
        this.showeffective = true;
        this.notshowntodigi = false;
        //$scope.showstaffing = false;
        this.showcounttable = false;
        this.showcounttabletime = true;
        this.showstaffingcounttable = false;
        this.showstaffingcount = false;
        this.notshowntocount = false;
        this.ScopeBasedRateBasedFileCountTable = false;
        this.EstimatedTimeTable = false;
        this.showtodate = false;
      } else if (pricingType == 3 || pricingType == 4 || pricingType == 10) {
        this.type2 = false;
        this.type22 = false;
        this.type6 = false;
        this.showeffective = true;
        this.notshowntodigi = false;
        //$scope.showstaffing = false;
        this.showcounttable = true;
        this.showcounttabletime = false;
        this.showstaffingcounttable = false;
        this.notshowntocount = false;
        this.ScopeBasedRateBasedFileCountTable = false;
        this.EstimatedTimeTable = false;
        this.showtodate = false;
      } else if (pricingType == 5 || pricingType == 15) {
        this.type2 = false;
        this.type22 = false;
        this.type6 = false;
        this.showeffective = false;
        this.notshowntodigi = false;
        //$scope.showstaffing = false;
        this.showcounttable = false;
        this.showcounttabletime = false;
        this.showstaffingcounttable = true;
        this.showstaffingcount = true;
        this.notshowntocount = false;
        this.ScopeBasedRateBasedFileCountTable = false;
        this.EstimatedTimeTable = false;
        this.showtodate = false;
      } else if (pricingType == 6) {
        this.type2 = false;
        this.type22 = false;
        this.type6 = true;
        this.showeffective = true;
        this.notshowntodigi = false;
        //$scope.showstaffing = false;
        this.showcounttable = false;
        this.showcounttabletime = false;
        this.showstaffingcounttable = false;
        this.notshowntocount = true;
        this.ScopeBasedRateBasedFileCountTable = false;
        this.EstimatedTimeTable = false;
        this.showtodate = false;
      }
      this.selectedCustomers = null;
      this.http.get(environment.apiURL + 'Pricing/GetjobStatusList').subscribe({
        next: (response: any) => {
          this.dropdownOptions = response.jsList;
        },
        error: (error) => {
          console.log(error, 'Api Error');
        },
      });
    }
  }
  loadCustomer(): void {
    this.http.get(environment.apiURL + 'Pricing/pricingList').subscribe(
      (response: any) => {
        this.Customer = response.customers;
      },
      (error) => {
        console.log('Error loading departments values:', error);
      }
    );
  }
  onCustomerChange() {
    this.spinner.requestStarted();
    this.http
      .get(
        environment.apiURL +
          `Pricing/ShowDetailsofPricing?clientid=${this.selectedCustomers}`
      )
      .subscribe({
        next: (response: any) => {
          this.spinner.requestEnded();
          this.loadScope();
          this.customers = response;
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log(err, 'Error');
        },
      });
  }
  loadScope() {
    this.http
      .get(
        environment.apiURL +
          `Pricing/ScopeByDeptCustId?clientid=${this.selectedCustomers}&departmentId=${this.selectedValue}`
      )
      .subscribe(
        (response: any) => {
          this.Scopes = response;
        },
        (error) => {
          console.log('Error loading departments values:', error);
        }
      );
  }
  RejectClick(id: any): void {
    this.http.get(environment.apiURL+`Pricing/RemovePricing?pricingId=${id}`, id).subscribe((response:any)=>{
      if(response == true){
        alert("Success")
      }
      else{
        alert("Failed to remove")
      }
    })
  }
  onCancel() {
    window.location.reload();
    // this.router.navigate(['topnavbar/pricing'])
  }
  back() {
    window.location.reload();
  }
  CreateRateBasedFileCountAndConcession() {
    this.submitted = true;
    if (this.newItem.selectedCountPrice) {
      this.ViewFileCountTable.push(this.newItem);
      this.newItem = {};
      this.ScopeBasedRateBasedFileCountTable = true;
      return;
    }
    this.ScopeBasedRateBasedFileCountTable = true;
  }
  CreateEstimatedTime() {
    this.submitted = true;
    if (this.userRegistrationForm.valid) {
      this.userRegistrationForm.markAllAsTouched();
      if (
        this.selectedFrom < this.selectedTo &&
        this.selectedFrom != this.selectedTo
      ) {
        var filecountdata = {
          ScopeId: this.selectedScope.id,
          ScopeTempDesc: this.selectedScope.description,
          FromRange: this.selectedFrom,
          ToRange: this.selectedTo,
          Price: this.selectedCountPrice,
        };
        this.AddedRecord.push(filecountdata);
        this.ViewFileCountTable = this.AddedRecord;
        this.EstimatedTimeTable = true;
        $('#ddlCurrentStaff').val('');
        $('#countfrom').val('');
        $('#countto').val('');
        $('#countprice').val('');
        $('#txtwefromdate').val('');
      } else {
        alert('Check FromValue Less or Equal');
      }
    }
    this.EstimatedTimeTable = true;
  }
  CreateStaffing() {
    this.submitted = true;
    let filecountdata: any;
    if (this.userRegistrationForm.valid) {
      this.userRegistrationForm.markAllAsTouched();
      if (this.selectedFrom != null || this.selectedTo != undefined) {
        if (this.selectedTo) {
          // if (this.ToRange <=this.ViewModel.WEToDate) {
          filecountdata = {
            ScopeTempDesc: this.selectedScope,
            FromDate: this.selectedFrom,
            ToDate: this.selectedTo,
            Price: this.selectedCountPrice,
          };
        } else {
          alert('Todate Should Less then EffectiveTo Date');
        }
      } else {
        filecountdata = {
          ScopeTempDesc: this.selectedScope,
          FromDate: this.selectedFrom,
          ToDate: this.selectedEffectivefromDate,
          Price: this.selectedCountPrice,
        };
      }
      // $('#ddlCurrentStaff').val('');
      // $('#countfrom').val('');
      // $('#countto').val('');
      // $('#countprice').val('');
      this.ViewFileCountTable.push(filecountdata);
      this.ViewFileCountTable = this.AddedRecord;
      this.ScopeBasedRateBasedFileCountTable = true;
    }
  }
  RemoveId: any;
  btnRemoveScope(index: any) {
    this.RemoveId = index;
  }
  btndeleteScopepopup() {
    this.ViewFileCountTable.splice(this.RemoveId, 1);
  }
  CreatePricing() {
    let datas: any;
    if (this.selectedPricing == 1 || this.selectedPricing == 9) {
      datas = {
        departments: [],
        selectedDepartment: null,
        pricingTypes: [],
        selectedPricingType: null,
        customers: [],
        selectedCustomer: null,
        pricings: [],
        selectedScope: null,
        scopeTempDesc: this.Scopes.find((x) => x.id === this.selectedScope)
          .description,
        estimatedTime: 'string',
        ratePerHour: 0,
        fromRange: 0,
        toRange: 0,
        price: this.selectedPrice,
        createdBy: this.loginservice.getUsername(),
        customerId: this.selectedCustomers,
        departmentId: this.selectedValue,
        scopeId: this.selectedScope,
        jobStatusId: this.selectedValueEfect,
        pricingTypeId: this.selectedPricing,
        fromDate: this.selectedfromDate,
        toDate: '2023-08-03T06:48:55.900Z',
        designation: 'string',
        cusShortName: 'string',
        numberofArtist: 0,
        weFromDate: '2023-08-03T06:48:55.900Z',
        weToDate: '2023-08-03T06:48:55.900Z',
        id: 0,
        addCountDatas: [],
      };
    } else if (this.selectedPricing == 2) {
      datas = {
        departments: [],
        selectedDepartment: null,
        pricingTypes: [],
        selectedPricingType: null,
        customers: [],
        selectedCustomer: null,
        pricings: [],
        selectedScope: null,
        scopeTempDesc: this.Scopes.find((x) => x.id === this.selectedScope)
        .description,
        estimatedTime:  this.selectedEstTime,
        ratePerHour: this.selectedAdditionalRate,
        fromRange: 0,
        toRange: 0,
        price:  this.selectedPrice,
        createdBy: this.loginservice.getUsername(),
        customerId: this.selectedCustomers,
        departmentId: this.selectedValue,
        scopeId:this.selectedScope,
        jobStatusId: this.selectedValueEfect,
        pricingTypeId: this.selectedPricing,
        fromDate: '2023-08-03T06:48:55.900Z',
        toDate: '2023-08-03T06:48:55.900Z',
        designation: 'string',
        cusShortName: 'string',
        numberofArtist: 0,
        weFromDate: this.selectedfromDate,
        weToDate: this.selectedEffectivetoDate,
        id: 0,
        addCountDatas: [],
      };
    } else if (this.selectedPricing == 13 || this.selectedPricing == 14) {
      datas = {
        departments: [],
        selectedDepartment: null,
        pricingTypes: [],
        selectedPricingType: null,
        customers: [],
        selectedCustomer: null,
        pricings: [],
        selectedScope: null,
        scopeTempDesc: this.Scopes.find((x) => x.id === this.selectedScope)
        .description,
        estimatedTime: 'string',
        ratePerHour: this.selectedAdditionalRate,
        fromRange: 0,
        toRange: 0,
        price:  this.selectedPrice,
        createdBy: this.loginservice.getUsername(),
        customerId: this.selectedCustomers,
        departmentId: this.selectedValue,
        scopeId: 0,
        jobStatusId: this.selectedValueEfect,
        pricingTypeId: this.selectedPricing,
        fromDate: '2023-08-03T06:48:55.900Z',
        toDate: '2023-08-03T06:48:55.900Z',
        designation: 'string',
        cusShortName: 'string',
        numberofArtist: 0,
        weFromDate: this.selectedfromDate,
        weToDate: this.selectedEffectivetoDate,
        id: 0,
        addCountDatas: [],
      };
    } else if (this.selectedPricing == 11 || this.selectedPricing == 12) {
      datas = {
        departments: [],
        selectedDepartment: null,
        pricingTypes: [],
        selectedPricingType: null,
        customers: [],
        selectedCustomer: null,
        pricings: [],
        selectedScope: null,
        scopeTempDesc: this.Scopes.find((x) => x.id === this.selectedScope)
        .description,
        estimatedTime: 'string',
        ratePerHour: this.selectedAdditionalRate,
        fromRange: 0,
        toRange: 0,
        price:  this.selectedPrice,
        createdBy: this.loginservice.getUsername(),
        customerId: this.selectedCustomers,
        departmentId: this.selectedValue,
        scopeId: 0,
        jobStatusId: this.selectedValueEfect,
        pricingTypeId: this.selectedPricing,
        fromDate: '2023-08-03T06:48:55.900Z',
        toDate: '2023-08-03T06:48:55.900Z',
        designation: 'string',
        cusShortName: 'string',
        numberofArtist: 0,
        weFromDate: this.selectedfromDate,
        weToDate: this.selectedEffectivetoDate,
        id: 0,
        addCountDatas: [],
      };
    } else if (
      this.selectedPricing == 3 ||
      this.selectedPricing == 4 ||
      this.selectedPricing == 10
    ) {
      datas = {
        departments: [],
        selectedDepartment: null,
        pricingTypes: [],
        selectedPricingType: null,
        customers: [],
        selectedCustomer: null,
        pricings: [],
        selectedScope: null,
        scopeTempDesc: this.Scopes.find((x) => x.id === this.selectedScope)
        .description,
        estimatedTime: 'string',
        ratePerHour: this.selectedAdditionalRate,
        fromRange: 0,
        toRange: 0,
        price:  this.selectedPrice,
        createdBy: this.loginservice.getUsername(),
        customerId: this.selectedCustomers,
        departmentId: this.selectedValue,
        scopeId: 0,
        jobStatusId: this.selectedValueEfect,
        pricingTypeId: this.selectedPricing,
        fromDate: '2023-08-03T06:48:55.900Z',
        toDate: '2023-08-03T06:48:55.900Z',
        designation: 'string',
        cusShortName: 'string',
        numberofArtist: 0,
        weFromDate: this.selectedfromDate,
        weToDate: this.selectedEffectivetoDate,
        id: 0,
        addCountDatas: [],
      };
    } else if (this.selectedPricing == 5 || this.selectedPricing == 15) {
      datas = {
        departments: [],
        selectedDepartment: null,
        pricingTypes: [],
        selectedPricingType: null,
        customers: [],
        selectedCustomer: null,
        pricings: [],
        selectedScope: null,
        scopeTempDesc: this.Scopes.find((x) => x.id === this.selectedScope)
        .description,
        estimatedTime: 'string',
        ratePerHour: this.selectedAdditionalRate,
        fromRange: 0,
        toRange: 0,
        price:  this.selectedPrice,
        createdBy: this.loginservice.getUsername(),
        customerId: this.selectedCustomers,
        departmentId: this.selectedValue,
        scopeId: 0,
        jobStatusId: this.selectedValueEfect,
        pricingTypeId: this.selectedPricing,
        fromDate: '2023-08-03T06:48:55.900Z',
        toDate: '2023-08-03T06:48:55.900Z',
        designation: 'string',
        cusShortName: 'string',
        numberofArtist: 0,
        weFromDate: this.selectedfromDate,
        weToDate: this.selectedEffectivetoDate,
        id: 0,
        addCountDatas: [],
      };
    } else if (this.selectedPricing == 6) {
      datas = {
        departments: [],
        selectedDepartment: null,
        pricingTypes: [],
        selectedPricingType: null,
        customers: [],
        selectedCustomer: null,
        pricings: [],
        selectedScope: null,
        scopeTempDesc: 'Embroidery Digitizing',
        estimatedTime: 'string',
        ratePerHour: this.selectedAdditionalRate,
        fromRange: 0,
        toRange: 0,
        price:  this.selectedPrice,
        createdBy: this.loginservice.getUsername(),
        customerId: this.selectedCustomers,
        departmentId: this.selectedValue,
        scopeId: 21,
        jobStatusId: this.selectedValueEfect,
        pricingTypeId: this.selectedPricing,
        fromDate: '2023-08-03T06:48:55.900Z',
        toDate: '2023-08-03T06:48:55.900Z',
        designation: 'string',
        cusShortName: 'string',
        numberofArtist: 0,
        weFromDate: this.selectedfromDate,
        weToDate: '2023-08-03T06:48:55.900Z',
        id: 0,
        addCountDatas: [],
      };
    }
    this.spinner.requestStarted();
    this.http
      .post(environment.apiURL + `Pricing/AddPricingWithScope`, datas)
      .subscribe((response:any) => {
        this.spinner.requestEnded();
        this.jobStatusFormControl = response;
        if(response && response.stringList ==="Pricing Added Successfully"){
          Swal.fire(
            'Done!',
            response.stringList,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
          }
          })
        }
        else{
          Swal.fire(
            'Error!',
            response.stringList,
            'error'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
          }
          })
        }
      });
  }


}
