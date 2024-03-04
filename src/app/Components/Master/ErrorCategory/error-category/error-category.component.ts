import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { environment } from 'src/Environments/environment';
import { EmpskillactionrenderingComponent } from 'src/app/Components/EmployeeVSSkillset/empskillactionrendering/empskillactionrendering.component';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { ErrorCategoryService } from 'src/app/Services/Errorcategory/error-category.service';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-error-category',
  templateUrl: './error-category.component.html',
  styleUrls: ['./error-category.component.scss']
})
export class ErrorCategoryComponent implements OnInit{

  //  Table view heading

  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
context: any="errorcategory";

  constructor(
    private router:Router,
    private builder: FormBuilder,
    private _service:ErrorCategoryService,
    private http :HttpClient,
    private _coreService: CoreService,
    private sharedDataService:SharedService
  ){
    this.sharedDataService.refreshData$.subscribe(() => {
      // Update your data or call the necessary methods to refresh the data
      this.getErrorCategory();
    });
  }
  
  ngOnInit(): void {
    this.getErrorCategory();
  }

  scopeRegistrationForm = this.builder.group({})

  getErrorCategory(){
    this._service.getErrorCategoryList().subscribe({
      next:(data)=>{
        this.rowData = data;
 
      },
      error:(err:any) => {
        console.log(err);
      }
    })
  }

  addItem(){
    this.router.navigate(['/topnavbar/error-Categoryadd']);
  }

  openViewForm(data:any){
    this.http.get(environment.apiURL+`ErrorCategory/GetErrorCategoryDetails?Id=${data.id}`).subscribe((response:any) =>{
    this.router.navigate(['/topnavbar/error-Categoryview'], {state:{data:response}});
  })
  }
  openEditForm(id:any){
    this.http.get(environment.apiURL+`ErrorCategory/GetErrorCategoryDetails?Id=${id}`).subscribe((response:any) =>{
    this.router.navigate(['/topnavbar/error-Categoryedit'], {state:{data:response}});
  })
  }

  deleteScopeUser(id:number){
    this._service.deleteErrorCategoryDetails(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar('Error Category deleted!', 'done');
        if(res.status === 'success'){
          this.getErrorCategory();
        }
        window.location.reload();
      },
      error:(err:any)=>{
        console.log(err);
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
    { headerName: 'Department Name ', field: 'department.description', filter: 'agTextColumnFilter',
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
