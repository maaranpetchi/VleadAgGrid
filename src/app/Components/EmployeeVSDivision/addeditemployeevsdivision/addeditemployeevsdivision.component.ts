import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { log } from 'console';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from '../../Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { catchError } from 'rxjs';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { DeleteActionRenderingComponent } from '../delete-action-rendering/delete-action-rendering.component';
import { AgGridAngular } from 'ag-grid-angular';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-addeditemployeevsdivision',

  templateUrl: './addeditemployeevsdivision.component.html',
  styleUrls: ['./addeditemployeevsdivision.component.scss']
})
export class AddeditemployeevsdivisionComponent implements OnInit {
  displayedColumns = ['employeeCode', 'employeeCodeName', 'selected'];
  table1Data: MatTableDataSource<any>;

  table2Data: MatTableDataSource<any>;
  // public dialogRef: MatDialogRef<AddeditemployeevsdivisionComponent>;

  myForm: FormGroup;
  // table1Data: any;
  // table2Data: any;

  table1selectedarray: any[] = [];
  table2selectedarray: any[] = [];


  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  context: any;
  constructor(private spinnerService: SpinnerService, private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog, private loginservice: LoginService,
    private dialogRef: MatDialogRef<AddeditemployeevsdivisionComponent> ) {

  }


  ngOnInit(): void {
    // this.myForm = this.fb.group({
    //   selectedValues: this.fb.array([])
    // });
    this.myForm = new FormGroup({ selectedValues: this.fb.array([]) });


    this.getTable1();
    this.getTable2();

  }


  getTable1() {
    this.spinnerService.requestStarted();

    this.http.get<any>(environment.apiURL + 'EmployeeVsDivision/GetEmployee').pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe(data => {
      // this.table1Data =data.eEvDList ;
      this.rowData = data.eEvDList;
      this.spinnerService.requestEnded();
      this.table1Data.data.forEach(row => {
        this.myForm.addControl(row.employeeId.toString(), new FormControl());
      });

    });
  }

  getTable2() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'EmployeeVsDivision/GetDivision').pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe(data => {
      this.table2rowData = data.dEvDList;
      this.spinnerService.requestEnded();

      this.table2Data.data.forEach(row => {
        this.myForm.addControl(row.id.toString() + "hi", new FormControl());
      });
    });
  }
  onSubmit() {
    this.selection.selected.forEach(x => this.setAll2(x));
    this.spinnerService.requestStarted();
    if (this.table1selectedarray.length > 0 && this.table2selectedarray.length > 0) {
      const selectedValues = this.myForm.get('selectedValues')?.value
      const data = { selectedValues };

      // Submit the selected values to the REST API using HttpClient

      this.http.post<any>(environment.apiURL + 'EmployeeVsDivision/SetEmployeeVsDivision', {
        "selectedEmployee": this.table1selectedarray,
        "selectedDivision": this.table2selectedarray,
        "createdBy": 152,
      }).pipe(
        catchError((error) => {
          this.spinnerService.requestEnded();
          console.error('API Error:', error);
          return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
        })
      ).subscribe(response => {
        this.spinnerService.requestEnded();

        // Handle the response from the API
        this.table1selectedarray = [];
        this.table2selectedarray = [];


        if (response.sEvDList == "Inserted Sucessfully") {
          Swal.fire(
            'Done!',
            response.sEvDList,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close(true);
            }
          })
        }

        else {
          Swal.fire(
            'info!',
            response.sEvDList,
            'error'
          ).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close(true);
            }
          })
        }
      });
    }
    else {
      this.spinnerService.requestEnded();
    }
  }


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table1Data.filter = filterValue.trim().toLowerCase();
    if (this.table1Data.paginator) {
      this.table1Data.paginator.firstPage();
    }
  }


  setAll(completed: boolean, item: any) {
    if (completed == true) {
      this.table1selectedarray.push({ employeeId: item.employeeId, departmentId: item.departmentId })
    }
  }


  setAll2(item: any) {
    this.table2selectedarray.push({ id: item.id })
  }
  selection = new SelectionModel<Element>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.table2Data.data.length;
    return numSelected === numRows;
  }

  filterValue: any;
  filterValue1: any;
  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.table1Data.filter = this.filterValue.trim().toLowerCase();

    if (this.table1Data.paginator) {
      this.table1Data.paginator.firstPage();
    }
  }

  applyEmployeeFilter(event: Event) {
    this.filterValue1 = (event.target as HTMLInputElement).value;
    this.table2Data.filter = this.filterValue1.trim().toLowerCase();
    // this.selection.clear();
    // this.dataSource.filteredData.forEach(x=>this.selection.select(x));
    if (this.table2Data.paginator) {
      this.table2Data.paginator.firstPage();
    }
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    else if (this.filterValue) {
      this.selection.clear();
      this.table2Data.filteredData.forEach(x => this.selection.select(x));
    } else {
      this.table2Data.data.forEach(row => this.selection.select(row));
    }

  }


  /////////////////////////Ag-grid module///////////////////////////////
  @ViewChild('agGrid1') agGrid1: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;

  private gridApi1!: GridApi;
  private gridApi2!: GridApi;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  public table2defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isSecondColumn,
    checkboxSelection: isSecondColumn,
  };

  table1def: ColDef[] = [
    { headerName: 'EmployeeCode ', field: 'employeeCode', filter: true, },
    { headerName: 'EmployeeName ', field: 'employeeName', filter: true, },

  ];
  table2def: ColDef[] = [

    { headerName: 'Division', field: 'divisionName', filter: true, },
  ];






  public rowSelection: 'single' | 'multiple' = 'multiple';
  public table2rowSelection: 'single' | 'multiple' = 'multiple';

  public rowData: any[]=[];
  public table2rowData!: any[];

  public themeClass: string =
    "ag-theme-quartz";

  onGridReady1(params: GridReadyEvent) {
    this.gridApi1 = params.api;
  }

  onGridReady2(params: GridReadyEvent) {
    this.gridApi2 = params.api;
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
  selectedRows1: any;
  selectedRows2: any;
  testSubmit() {
    this.selectedRows1 = this.gridApi1.getSelectedRows();
    this.selectedRows2 = this.gridApi2.getSelectedRows();

    console.log('Selected Rows from Table 1:', this.selectedRows1);
    console.log('Selected Rows from Table 2:', this.selectedRows2);

    this.spinnerService.requestStarted();

    this.http.post<any>(environment.apiURL + 'EmployeeVsDivision/SetEmployeeVsDivision', {
      "selectedEmployee": this.selectedRows1,
      "selectedDivision": this.selectedRows2,
      "createdBy": this.loginservice.getUsername(),
    }).pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
      })
    ).subscribe(response => {
      this.spinnerService.requestEnded();

      // Handle the response from the API
      this.selectedRows1 = [];
      this.selectedRows2 = [];


      if (response.sEvDList == "Inserted Sucessfully") {
        Swal.fire(
          'Done!',
          response.sEvDList,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close(true);
          }
        })
      }

      else {
        Swal.fire(
          'Error!',
          response.sEvDList,
          'error'
        ).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close(true);
          }
        })
      }
    });
  }

}
function isFirstColumn(
  params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

function isSecondColumn(
  params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsSecondColumn = displayedColumns[0] === params.column;
  return thisIsSecondColumn;
}