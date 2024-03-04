import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { Observable, map, startWith } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { DeleteActionRenderingComponent } from 'src/app/Components/EmployeeVSDivision/delete-action-rendering/delete-action-rendering.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-customervsdivisionindex',
  templateUrl: './customervsdivisionindex.component.html',
  styleUrls: ['./customervsdivisionindex.component.scss']
})
export class CustomervsdivisionindexComponent implements OnInit {
context: any="customervsdivision";
  ngOnInit(): void {
    this.fetchShortName();
    this.fetchtableData();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  constructor(private http: HttpClient, private spinnerService: SpinnerService, private loginservice: LoginService,private sharedDataService:SharedService) { 
    this.sharedDataService.refreshData$.subscribe(() => {
      this.fetchtableData();
    });
  }
 
  //ngmodel
  selectedShortname: any;
  selectedDepartment: number;
  selectedDivision: number;
  //dropdown array declarations
  customers: any[] = [];
  departments = [
    { name: 'Artwork', value: 1 },
    { name: 'Digitizing', value: 2 }
  ];
  divisions: any[] = []
  
  // input filter
  myControl = new FormControl('');
  filteredOptions:any;
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(option => option.toLowerCase().includes(filterValue));
  }

  fetchShortName() {
    this.http.get<any>(environment.apiURL + `Report/GetProcess`).subscribe(response => {
      this.customers = response.customerList;
      this.divisions = response.divisionList;
    })
  }
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'customershortname',
    'department',
    'division',
    'action',
  ];
  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchtableData() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `CustomerVsDivision/GetCustomerVsDivision`).subscribe(res => {
      this.spinnerService.requestEnded();
      this.rowData = res.gCvDList;
   
    })
  }

  submit() {
    let payload = {
      "customerId": this.selectedShortname,
      "departmentId": this.selectedDepartment,
      "divisionId": this.selectedDivision,
      "employeeId": this.loginservice.getUsername()
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `CustomerVsDivision/SetCustomerVsDivision`, payload).subscribe(results => {
      this.spinnerService.requestEnded();
      Swal.fire(
        'Done!',
        'Inserted Sucessfully',
        'success'
      )
      this.selectedDepartment = 0;
      this.selectedDivision = 0;
      this.selectedShortname = 0;
      this.fetchtableData();

    }, error => {
      Swal.fire(
        'Error!',
        'Error Occured',
        'error'
      )
      this.spinnerService.resetSpinner();
    });

  }
  @ViewChild('agGrid') agGrid: any;

  private gridApi!: GridApi<any>;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };

  columnDefs: ColDef[] = [
    { headerName: 'Customer Short Name ', field: 'customerShortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Department ', field: 'department', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Division', field: 'division', filter: 'agTextColumnFilter',
      floatingFilter: true, },

    {
      headerName: 'Actions',
      cellStyle: { innerWidth: 20 },

      field: 'action',
      cellRenderer: DeleteActionRenderingComponent, // JS comp by Direct Reference
      autoHeight: true,
    }
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[]=[];
  public themeClass: string =
    "ag-theme-quartz";

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  handleCellValueChanged(params: { colDef: ColDef, newValue: any, data: any }) {
    console.log(params, "Parameter");
    console.log(params.data, "ParameterData");
    let parameterData = params.data
    if (params.colDef.field === 'filecount') { // Check if the changed column is 'price'

    }
  }


  handlePress(newvalue, parameterData) {
    console.log(newvalue, "HandlepressNewValue");
    console.log(parameterData, "ParameterValue");

  }


}

function isFirstColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}
