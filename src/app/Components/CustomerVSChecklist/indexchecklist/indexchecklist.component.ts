import { Component } from '@angular/core';
import { AddchecklistComponent } from '../addchecklist/addchecklist.component';
import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomervschecklistService } from 'src/app/Services/CustomerVSChecklist/customervschecklist.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { ViewchecklistComponent } from '../viewchecklist/viewchecklist.component';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { EmpskillactionrenderingComponent } from '../../EmployeeVSSkillset/empskillactionrendering/empskillactionrendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
@Component({
  selector: 'app-indexchecklist',
  templateUrl: './indexchecklist.component.html',
  styleUrls: ['./indexchecklist.component.scss']
})
export class IndexchecklistComponent implements OnInit {
  context: any = "CustomerVSChecklist";
  ngOnInit(): void {
    this.fetchtableData();
  }
  constructor(private _coreService: CoreService, private checklistservice: CustomervschecklistService, private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private _dialog: MatDialog, private spinnerService: SpinnerService,private sharedDataService:SharedService) { 
    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.fetchtableData();
    });
  }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(AddchecklistComponent) AddchecklistComponent: AddchecklistComponent;

  displayedColumns: string[] = ['shortname', 'description', 'department', 'Action'];

  fetchtableData() {
    this.checklistservice.getEmployeeList().subscribe(data => {

      this.rowData = data.gCvCList;

    });
  }


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openvendor() {
    const dialogRef = this._dialog.open(AddchecklistComponent, {
      height: '70vh',
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchtableData();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddchecklistComponent, {
      height: '70vh',
      width: '50vw',
      data: {
        type: "edit",
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchtableData();
        }
      },
    });
  }

  deleteEmployee(id: number) {
   
  }


  openViewForm(data: any) {
    const dialogRef = this._dialog.open(ViewchecklistComponent, {
      height: '40vh',
      width: '50vw',
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchtableData();
        }
      },
    });
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
    { headerName: 'ShortName ', field: 'shortName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Description ', field: 'description', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Department', field: 'department', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    {
      headerName: 'Actions',
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
    this.checklistservice.getEmployeeList().subscribe(data => {
      this.rowData = data.gCvCList;
    })
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
