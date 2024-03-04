import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { EmpskillactionrenderingComponent } from 'src/app/Components/EmployeeVSSkillset/empskillactionrendering/empskillactionrendering.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { ScopeService } from 'src/app/Services/Scope/scope.service';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss']
})
export class ScopeComponent {

  //  Table view heading
  displayedColumns: string[] = [
    'DepartmentName',
    'Description',
    'action',
  ]

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
context: any="scope";

  constructor(
    private _scopeService: ScopeService,
    private builder: FormBuilder,
    private router: Router,
    private _coreService: CoreService,
    private http: HttpClient,
    private spinnerService: SpinnerService,
    private sharedDataService:SharedService
  ) { 
    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.listScope();
    });
  }
  scopeRegistrationForm = this.builder.group({

  });

  ngOnInit() {
    this.listScope()
  }

  listScope() {
    this.spinnerService.requestStarted();
    this._scopeService.getListScope().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.rowData = data;

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addItem() {
    this.router.navigate(['/topnavbar/master-scopeAdd']);
  }






  /////////////////////////Ag-grid module///////////////////////////////
  @ViewChild('agGrid') agGrid: any;

  private gridApi!: GridApi<any>;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };

  columnDefs: ColDef[] = [
    { headerName: 'Department Name ', field: 'departmentDescription', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Description ', field: 'description', filter: 'agTextColumnFilter',
      floatingFilter: true, },

    {
      headerName: 'Actions',
      cellStyle: { innerWidth: 20 },

      field: 'action',
      cellRenderer: EmpskillactionrenderingComponent, // JS comp by Direct Reference
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