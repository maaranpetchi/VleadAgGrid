import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/Environments/environment';
import { Router } from '@angular/router';
import { ItassetsService } from 'src/app/Services/ITAssets/itassets.service';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { customernormsrenderingcomponent } from '../../CustomerNorms/customernormsindex/customerNormsRendering.component';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-it-assetindex',
  templateUrl: './it-assetindex.component.html',
  styleUrls: ['./it-assetindex.component.scss']
})
export class ItAssetindexComponent implements OnInit {
  apiResponseData: any;
context: any="ITASSET";
  ngOnInit(): void {
    this.fetchtableData();
  }
  constructor(private router: Router, private _coreService: CoreService, private sharedDataService: ItassetsService, private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private _dialog: MatDialog, private spinnerService: SpinnerService,private sharedDataSService:SharedService) { 

    this.sharedDataSService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.fetchtableData();
    });
  }

  fetchtableData() {
    this.http.get<any>(environment.apiURL + `ITAsset/nGetTableITAsset`).subscribe(data => {
      this.rowData =data.titDetailList;
    });
  }

  openvendor() {
    this.router.navigate(['/topnavbar/addITAsset']);
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
  { headerName: 'Bay Number ', field:'bayNumber', filter: true, },
  { headerName: 'Location', field:'location', filter: true, },
  { headerName: 'PC Name', field:'pcName', filter: true, },
  { headerName: 'Description', field:'description', filter: true, },
  { headerName: 'Roll', field:'roll', filter: true, },
  { headerName: 'Working Status', field:'workingStatus', filter: true, },
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
  this.http.get<any>(environment.apiURL + `ITAsset/nGetTableITAsset`).subscribe((response) => (this.rowData = response.titDetailList));
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