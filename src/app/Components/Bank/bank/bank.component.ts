import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { catchError } from 'rxjs';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { EmpskillactionrenderingComponent } from '../../EmployeeVSSkillset/empskillactionrendering/empskillactionrendering.component';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['bankname', 'closingdate', 'closingbalance'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
context: any = "Bank";

  constructor(private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private spinnerService: SpinnerService) { }
  ngOnInit(): void {
    this.fetchData();
  }
  BankName: string = '';
  selectedDate: string = '';
  ClosingBalance: string = '';



  BankSubmit() {
    var postData = {
      "id": 0,
      "bankName": this.BankName,
      "closingDate": this.selectedDate,
      "closingBalance": this.ClosingBalance,
      "employeeId": this.loginservice.getUsername()
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `ITAsset/nSetBankDetails`, postData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();

        if (data.setBDetailList == "Record Added Successfully!") {
          Swal.fire(
            'Done!',
            data.setBDetailList,
            'success'
          ).then((result) => {

            if (result.isConfirmed) {
              this.BankName = '';
              this.selectedDate = '';
              this.ClosingBalance = '';
              this.fetchData();
            }

          })
        }
        else {
          Swal.fire(
            'Error!',
            'An error occurred !.',
            'error'
          );
        }


      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error

      }

    });
  }

  fetchData() {
    // Make an HTTP request to your REST API and fetch the data
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'ITAsset/nGetBankDetails').pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data) => {
        this.spinnerService.requestEnded();
        this.rowData = data.getBDetailList;
      
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    });
  }



  //to save the checkbox value
  selectedQuery: any[] = [];

  setAll(completed: boolean, item: any) {
    if (completed == true) {
      this.selectedQuery.push(item)
    }
    else {

      if (this.selectedQuery.find(x => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
  }


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    { headerName: 'Bank Name ', field: 'bankName', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Closing Date ', field: 'closingDate', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    { headerName: 'Closing Balance', field: 'closingBalance', filter: 'agTextColumnFilter',
      floatingFilter: true, },
    
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[]=[];
  public themeClass: string =
    "ag-theme-quartz";

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.http.get<any>(environment.apiURL + 'ITAsset/nGetBankDetails').subscribe((response) => (this.rowData = response.getBDetailList));
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