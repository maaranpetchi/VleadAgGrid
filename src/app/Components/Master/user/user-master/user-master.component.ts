import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserMasterService } from 'src/app/Services/Master/user-master.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdduserMasterComponent } from '../adduser-master/adduser-master.component';
import { AddEditUsermasterComponent } from '../add-edit-usermaster/add-edit-usermaster.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { customernormsrenderingcomponent } from 'src/app/Components/CustomerNorms/customernormsindex/customerNormsRendering.component';
import { environment } from 'src/Environments/environment';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {

  displayedColumns: string[] = [
    'Name',
    'UserName',
    'UserType',
    'Role',
    'action',
  ]

  employees: any = {};

  context: any = "user";

  constructor(
    private _dialog: MatDialog,
    private _empService: UserMasterService,
    private _coreService: CoreService,
    private spinnerService: SpinnerService,
    private sharedDataService:SharedService
  ) { 
    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.getMasterUsers();
    });}
  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    userType: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    Password: new FormControl('')
  })
  ngOnInit(): void {
    this.getMasterUsers();
  }

  getMasterUsers() {
    this.spinnerService.requestStarted();
    this._empService.getAllMasterUsers().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.rowData = data;

      },
      error: (err) => {
        this.spinnerService.resetSpinner();
        console.log(err);
      }
    })
  }



  openAddUsers() {
    const dialogRef = this._dialog.open(AdduserMasterComponent, {
      width: '100%',
      height: '550px',
    })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMasterUsers();
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
    { headerName: 'Name ', field: 'userTypeDesc', filter: true, },
    { headerName: 'User Name ', field: 'username', filter: true, },
    { headerName: 'User Type', field: 'userType', filter: true, },
    { headerName: 'Role', field: 'roles', filter: true, },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: customernormsrenderingcomponent, // JS comp by Direct Reference
      autoHeight: true,
    }
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[] = [];
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