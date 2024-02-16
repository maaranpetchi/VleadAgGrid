import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { Subscription, catchError } from 'rxjs';
import { customernormsrenderingcomponent } from 'src/app/Components/CustomerNorms/customernormsindex/customerNormsRendering.component';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { BenchStatusService } from 'src/app/Services/Benchstatus/bench-status.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { EditService } from 'src/app/Services/Displayorhideform/edit-service.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bench-status',
  templateUrl: './bench-status.component.html',
  styleUrls: ['./bench-status.component.scss'],
})
export class BenchStatusComponent implements OnInit {
  editDescription: string = '';
  responseData: any;

  //  Table view heading
  displayedColumns: string[] = ['BenchStatus', 'Action'];

  context: any = "benchstatus";
  private subscription: Subscription;
  tableGettingData: any;


  constructor(
    private loginservice: LoginService,
    private _service: BenchStatusService,
    private _coreService: CoreService,// private modalService: NgbModal
    private spinnerService: SpinnerService,
    private editservice: EditService
  ) {

    this.subscription = this.editservice.editTriggered$.subscribe(() => {

      this.tableGettingData = this.editservice.getViewData();
      console.log(this.thidTableGettingData, "thirdTableGettingData");
      this.editDescription = this.tableGettingData
    });
  }
  thidTableGettingData(thidTableGettingData: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.viewBenchStatus();
    this.responseData = history.state.data;
  }

  viewBenchStatus() {
    this.spinnerService.requestStarted();
    this._service.viewBenchStatusDescription().pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.rowData =data;

      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  id: any;
  openEditForm(row: any) {
    this.spinnerService.requestStarted();

    this._service.editBenchStatus(row).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe((response: any) => {
      this.spinnerService.requestEnded();
      this.editDescription = response.description;
      this.id = response.id;
    });
  }

  deleteBenchStatus(id: any) {
    this.spinnerService.requestStarted();

    this._service.deleteBenchStatusDescription(id).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();
        Swal.fire('Done!', 'Data deleted Successfully', 'success');
        if (res.status === 'success') {
          this.viewBenchStatus();
        }
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  upateChanges() {

    let updateData = {
      "id": this.id,
      "description": this.editDescription,
      "division": " ",
      "createdBy": this.loginservice.getUsername(),
      "createdUtc":  new Date().toISOString(),
      "updatedBy":this.loginservice.getUsername(),
      "updatedUtc": new Date().toISOString(),
      "isDeleted": true
    };

    
    this.spinnerService.requestStarted();

    this._service.updateBenchStatus(updateData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (response) => {
        this.spinnerService.requestEnded();

        if (response.message === "Updated Bench Status Successfully....!") {
          Swal.fire('Done!', 'Updated Bench Status Successfully', 'success').then((response) => {
            if (response.isConfirmed) {
              this.viewBenchStatus();
            }
          });
          // window.location.reload();
        }
        else {
          return
        }
      },
      error: (err) => {
        throw new Error('API Error', err);

      }
    })
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
    { headerName: 'Description', field: 'description', filter: true, },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: customernormsrenderingcomponent, // JS comp by Direct Reference
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