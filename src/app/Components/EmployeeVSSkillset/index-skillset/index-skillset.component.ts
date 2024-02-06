import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from '../../Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { EmployeevsskillsetService } from 'src/app/Services/EmployeeVsSkillset/employeevsskillset.service';
import { catchError } from 'rxjs';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { EmpskillactionrenderingComponent } from '../empskillactionrendering/empskillactionrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
@Component({
  selector: 'app-index-skillset',
  templateUrl: './index-skillset.component.html',
  styleUrls: ['./index-skillset.component.scss']
})
export class IndexSkillsetComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['EmployeeCode', 'EmployeeName', 'Skill', 'ProficiencyLevel', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  context: any = "EmployeeVSSkillset";

  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerService, private _empService: EmployeevsskillsetService, private sharedDataService: SharedService) {
    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.getFetchTables();
    });
  }

  ngOnInit(): void {
    this.getFetchTables();
  }
  getFetchTables() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/ShowEmployeeVsSkillset`).subscribe({
      next: (employees) => {
        this.spinnerService.requestEnded();
        this.rowData = employees.gEvSlist;

      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        console.error(err);
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }

  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //aCTIONS

  viewEmployee(id: number) {

  }
  deleteEmployee(id: number) {

  }

  OpenNewForm() {
    this.router.navigate(['/topnavbar/addeditskillset']);
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
    { headerName: 'EmployeeCode ', field: 'employeeCode', filter: true, },
    { headerName: 'EmployeeName ', field: 'employeeName', filter: true, },
    { headerName: 'Skill', field: 'skill', filter: true, },
    { headerName: 'ProficiencyLevel', field: 'proficiencyLevel', filter: true, },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: EmpskillactionrenderingComponent, // JS comp by Direct Reference
      autoHeight: true,
    }
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: any[];
  public themeClass: string =
    "ag-theme-quartz";

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/ShowEmployeeVsSkillset`).subscribe((response) => (this.rowData = response.gEvSlist));
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