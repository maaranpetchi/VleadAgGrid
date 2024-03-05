
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/Services/Login/login.service';
import { ProductionAllocationService } from 'src/app/Services/CoreStructure/ProductionAllocation/production-allocation.service';
import { JobAssignedDetailsPopupComponent } from '../job-assigned-details-popup/job-assigned-details-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { Observable, catchError, forkJoin, switchMap, throwError } from 'rxjs';
import { ProductionAllocatedPopupComponent } from '../production-allocated-popup/production-allocated-popup.component';
import { JoballocatedEmplpopupComponent } from '../joballocated-emplpopup/joballocated-emplpopup.component';
import { EmployeePopupTableComponent } from '../../QualityAllocation/employee-popup-table/employee-popup-table.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { ProductionQuotationComponent } from '../production-quotation/production-quotation.component';
import { SelectionModel } from '@angular/cdk/collections';
import {
  CellClickedEvent,
  CellValueChangedEvent,
  CheckboxCellRenderer,
  CheckboxSelectionCallbackParams,
  ColDef,
  GridApi,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { ActionsCellRendererComponent } from '../../ClientCordination/ClientOrder/actions-cell-renderer/actions-cell-renderer.component';
import { param } from 'jquery';
@Component({
  selector: 'app-productionallocationtable',
  templateUrl: './productionallocationtable.component.html',
  styleUrls: ['./productionallocationtable.component.scss'],
})
export class ProductionallocationtableComponent implements OnInit {
  exchangenumber: number;
  dataEmployeeSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedEmployeeColumnsVisibility: any = {
    emplselected: true,
    employees: true,
    allocatedEmployee: true,
    estTime: true,
    jobCategory: true,
    shift: true,
  };
  dataSource: MatTableDataSource<any>;
  displayedColumnsVisibility: any = {
    selected: true,
    jobId: true,
    allocatedJobId: true,
    quatationJobId: true,
    employee: true,
    estjob: true,
    fileName: true,
    fileInwardMode: true,
    client: true,
    customerSatisfaction: true,
    jobstatus: true,
    projectcode: true,
    status: true,
    scope: true,
    esttime: true,
    deliverydate: true,
  };
  scopes: any[] = [];
  selectedScope: any = 0;
  estTime = 0;
  selection = new SelectionModel<any>(true, []);
  emplselection = new SelectionModel<any>(true, []);
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pendingJobsCount: any;
  exchangeHeader: any;
  exmployeeEstTime: any;
  freshJobsCount: number;
  revisionJobsCount: number;
  reworkJobsCount: number;
  allocatedJobCount: number;
  queriesJobsCount: number;
  queryResponseJobsCount: number;
  errorJobsCount: number;
  quotationJobCount: number;
  employeeCount: any;
  QueryJobDate: any;
  CustomerJobType: any;
  StatusId: any;
  JobStatusId: any;
  totalEstimateTime: any; // AG grid

  rowData!: any;
  rowEmpData!: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  private gridEmplApi!: GridApi<any>;
  colDefs: ColDef[] = [
    {
      headerName: 'Job Id',
      field: 'jobId',
      checkboxSelection: true,
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
      colId: 'jobIdColumn' ,
      cellStyle: { color: 'blue' },
     
      cellRenderer: function (params) {
        return (
          '<button class="btn btn-sm btn-link p-0">' +
          params.value +
          '</button>'
        );
      },
    },
    {
      headerName: 'Job Id',
      field: 'jobId',
      checkboxSelection: true,
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
      colId: 'quotationIdColumn' ,
      cellStyle: { color: 'blue' },
     
      cellRenderer: function (params) {
        return (
          '<button class="btn btn-sm btn-link p-0">' +
          params.value +
          '</button>'
        );
      },
    },
    {
      headerName: 'Job Id',
      field: 'jobId',
      checkboxSelection: true,
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
      colId: 'allocatedIdColumn' ,
      cellStyle: { color: 'blue' },
     
      cellRenderer: function (params) {
        return (
          '<button class="btn btn-sm btn-link p-0">' +
          params.value +
          '</button>'
        );
      },
    },
    {
      headerName: 'Employee(s)',
      field: 'employeeName',
      width: 70,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
      colId: 'employeeNameColumn' ,
      cellStyle: { color: 'blue' },
     
      cellRenderer: function (params) {
        return (
          '<button class="btn btn-sm btn-link p-0">' +
          params.value +
          '</button>'
        );
      },
    },
    {
      headerName: 'Est Job/ Query Date',
      field: 'jobDate_QueryDate',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Client',
      field: 'shortName',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Customer Classification',
      field: 'customerClassification',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    
    {
      headerName: 'File Name',
      field: 'fileName',
      width: 50,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'File Inward Mode',
      field: 'fileInwardType',
      width: 50,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    
    {
      headerName: 'Job Status ',
      field: 'jobStatusDescription',
      headerClass: 'text-wrap',
      width: 100,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Project Code',
      field: 'projectCode',
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Estimated Time',
      field: 'allocatedEstimatedTime',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
      editable: true,
    },
    
    {
      headerName: 'Delivery Date',
      field: 'dateofDelivery',
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
    }
  ];
  colEmpDefs: ColDef[] = [
    {
      headerName:'Employee',
      field: 'employeenameWithCode',
      checkboxSelection: true,
      width: 100,
      headerClass: 'text-wrap',
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellStyle: { color: 'blue' },
      cellRenderer: function (params) {
        return (
          '<button class="btn btn-sm btn-link p-0">' +
          params.value +
          '</button>'
        );
      },
    },
    {
      headerName:'Est Time (In Mins)',
      field: 'estTime',
      headerClass: 'text-wrap',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
      editable: true,
    },
    {
      headerName:'Job Cat.',
      field: 'status',
      headerClass: 'text-wrap',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
      editable: true,
    },
    {
      headerName:'Shift',
      field: 'shift',
      headerClass: 'text-wrap',
      width: 100,
      suppressSizeToFit: true,
      sortable: true,
       filter: 'agTextColumnFilter',
      floatingFilter: true,
      editable: true,
    },
  ];
  gridOptions1 = {
    pagination: true,
    paginationPageSize: 25,
  };
  EmpgridOptions = {
    pagination: true,
    paginationPageSize: 25,
  };
  context: any;
  @ViewChild('agGrid') agGrid: any;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  public defaultEmpColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    field: 'empCheckBoxValue',
    headerCheckboxSelection: isEmpColumn,
    checkboxSelection: isEmpColumn,
  };
  public themeClass: string = 'ag-theme-quartz';
  constructor(
    private http: HttpClient,
    private loginservice: LoginService,
    private productionallocation: ProductionAllocationService,
    private _dialog: MatDialog,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
    // Initialize the `editing` flag for each job object to `false`
    this.dataEmployeeSource.data.forEach((job) => {
      job.editing = false;
    });
  }
  editTime: number;
  ngOnInit(): void {
    this.freshJobs(); //scopes
    this.fetchScopes();
    this.getJobCategoryStatus();
  } //
  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.gridApi.setColumnVisible('jobIdColumn', true);
    this.gridApi.setColumnVisible('quotationIdColumn', false);
    this.gridApi.setColumnVisible('allocatedIdColumn', false);
    this.gridApi.setColumnVisible('employeeNameColumn', false);
  }
  onGridEmpReady(params: GridReadyEvent<any>) {
    // this.gridApi = params.api;
    this.gridEmplApi = params.api;
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`
      )
      .subscribe((response) => {
        this.rowEmpData = response.employees;
      });
  }
  onCellJobClicked(event: CellClickedEvent) {
      const { colDef, data } = event;
      if (colDef.colId === 'jobIdColumn') {
        console.log(data,"PopupData");
        
       this.getProductionJob(data);
      }else if (colDef.colId === 'quotationIdColumn') {
        console.log(data,"PopupData");
        
       this.getQuatationJobId(data);
      } else if (colDef.colId === 'allocatedIdColumn') {
        console.log(data,"PopupData");
        
       this.getAllocatedJobId(data);
      } 
      else if (colDef.colId === 'employeeNameColumn') {
        console.log(data,"PopupData");
        
       this.getemployeeName(data);
      } 
  }
  onCellEmpClicked(event: CellClickedEvent) {
    const { colDef, data } = event;
    if (colDef.field === 'employeenameWithCode') {
      console.log(data,"PopupData");
      
     this.employeeProduction(data);
    }
}
  handleCellValueChanged(params: { colDef: ColDef; newValue: any; data: any }) {
    console.log(params, 'Parameter');
    console.log(params.data, 'ParameterData');

    if (params.colDef.field === 'allocatedEstimatedTime') {
      const selectedNodes = this.gridApi.getSelectedRows();
      
      selectedNodes.forEach((node) => {
        if (node.jobId === params.data.jobId) {
          node.allocatedEstimatedTime = params.newValue;
        }
      });

      this.gridApi.refreshCells(); 
    }
  }
onCellValueChanged(event: CellValueChangedEvent) {
  const updatedRow = event.data;
  // You can perform any validation or additional logic here if needed
  console.log("New Estimated Time for Job ID:", updatedRow.jobId, "is", updatedRow.allocatedEstimatedTime);
}
  onCellValueEmpChanged = (event: CellValueChangedEvent) => {
    console.log(event);
    if (parseInt(this.loginservice.getProcessId()) == 2) {
      console.log(this.loginservice.getProcessId(), "ulla");
  
      var colls = this.estTimeinput;
      console.table(colls);
  
      var Esttime1 = colls[0].estimatedTime;
      var Esttime2 = colls[1].estimatedTime;
      var Esttime3 = colls[2].estimatedTime;
      var Esttime4 = colls[3].estimatedTime;
      var desc1 = colls[0].description;
      var desc2 = colls[1].description;
      var desc3 = colls[2].description;
      var desc4 = colls[3].description;
      var desc5 = colls[4].description;
  
      // Assuming event.data contains the updated value of estTime
      var updatedEstTime = event.data.estTime;
  
      if (updatedEstTime <= Esttime1 && updatedEstTime > 0) {
        event.data.status = desc1;
      } else if (updatedEstTime <= Esttime2 && updatedEstTime > Esttime1) {
        event.data.status = desc2;
      } else if (updatedEstTime <= Esttime3 && updatedEstTime > Esttime2) {
        event.data.status = desc3;
      } else if (updatedEstTime <= Esttime4 && updatedEstTime > Esttime3) {
        event.data.status = desc4;
      } else if (updatedEstTime > Esttime4) {
        event.data.status = desc5;
      }
      
      // Update the row with the new data
      event.node.updateData(event.data);
    }
    console.log(`New Cell Valueemp: ${event.value}`);
    console.log(event);
  };
  
  onSelectionChangeds = (event: SelectionChangedEvent) => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    console.log('Row Selected!');
    const selectedRows = this.gridApi.getSelectedRows(); // Perform your bulk convert action with the selected rows
    console.log('Selected Rows:', selectedRows);
  };
  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedNodes = this.gridApi.getSelectedRows();
    console.log('Selected Rows:', selectedNodes); // Update exchangeHeader with the estimated time of the first selected row
    if (selectedNodes.length > 0) {
      this.exchangeHeader = selectedNodes[0].data.estimatedTime;
    } else {
      // If no row is selected, reset exchangeHeader
      this.exchangeHeader = null;
    }
    selectedNodes.forEach((item:any)=>{
      if (item.data.allocatedEstimatedTime == null) item.data.allocatedEstimatedTime = 0;
    if (item.data.employeeId == null) item.data.employeeId = 0;
    if (item.data.estimatedTime == null) item.data.estimatedTime = 0;
    this.selectedQuery.push({
      ...item.data,
      CategoryDesc: '',
      Comments: '',
      CommentsToClient: '',
      Remarks: '',
      SelectedEmployees: [],
      SelectedRows: [],
    });
    })
  }
  onSelectionEmpChanged(event: SelectionChangedEvent){
    const selectedEmpNodes = this.gridEmplApi.getSelectedNodes();
    console.log('Selected Rows:', selectedEmpNodes); // Update exchangeHeader with the estimated time of the first selected row
    selectedEmpNodes.forEach((item:any)=>{
      if (item.data.jId != null)
      this.selectedEmployee.push({
        ...item.data,
        CategoryDesc: '',
        Comments: '',
        CommentsToClient: '',
        FileInwardType: '',
        JobId: 0,
        Remarks: '',
        SelectedEmployees: [],
        SelectedRows: [],
        TimeStamp: '',
       // estimatedTime: this.totalEstimateTime
      });
    else {
      this.selectedEmployee.push({
        ...item.data,
        jId: 0,
          CategoryDesc: '',
          Comments: '',
          CommentsToClient: '',
          FileInwardType: '',
          JobId: 0,
          Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          TimeStamp: '',
        
      });
    }
    })
    
  }
  fetchScopes() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getScopeValues/${this.loginservice.getUsername()}`
      )
      .subscribe((scopedata) => {
        this.scopes = scopedata.scopeDetails;
        this.scopes.sort((a, b) => a.name.localeCompare(b.name)); // Sort the scopes based on the 'name' property
      });
  }
  selectedQuery: any[] = [];
  selectedEmployee: any[] = [];

  setEmployeeAll(item: any) {

   // if (completed == true) {
      if (item.jId != null)
        return {
          ...item,
          CategoryDesc: '',
          Comments: '',
          CommentsToClient: '',
          FileInwardType: '',
          JobId: 0,
          Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          TimeStamp: '',
          estimatedTime: item.estTime
        };
      else {
        return{
          ...item,
          jId: 0,
          CategoryDesc: '',
          Comments: '',
          CommentsToClient: '',
          FileInwardType: '',
          JobId: 0,
          Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          TimeStamp: '',
          estimatedTime: item.estTime
        };
      }
   // } else {
      // if (this.selectedEmployee.find((x) => x.id == item.id)) {
      //   this.selectedEmployee = this.selectedEmployee.filter((x) => {
      //     if (x.id != item.id) {
      //       return item;
      //     }
      //   });
      // }
   // }
  }
  benchChecked: boolean = false;
  onBenchCheckboxChange(event: any) {
    this.benchChecked = event.checked;
  }
  tab(action) {
    if (action == '1') {
      this.freshJobs();
      this.gridApi.setColumnVisible('jobIdColumn', true);
      this.gridApi.setColumnVisible('quotationIdColumn', false);
      this.gridApi.setColumnVisible('allocatedIdColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
    } else if (action == '2') {
      this.gridApi.setColumnVisible('jobIdColumn', true);
        this.gridApi.setColumnVisible('quotationIdColumn', false);
        this.gridApi.setColumnVisible('allocatedIdColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);

      this.revisionJobs();
    } else if (action == '3') {
      this.reworkJobs();
    } else if (action == '4') {
      this.allocaetdJobs();
      this.gridApi.setColumnVisible('jobIdColumn', false);
        this.gridApi.setColumnVisible('quotationIdColumn', false);
        this.gridApi.setColumnVisible('allocatedIdColumn', true);
      this.gridApi.setColumnVisible('employeeNameColumn', true);

    } else if (action == '5') {
      this.gridApi.setColumnVisible('jobIdColumn', true);
        this.gridApi.setColumnVisible('quotationIdColumn', false);
        this.gridApi.setColumnVisible('allocatedIdColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
      this.queries();
    } else if (action == '6') {
      this.gridApi.setColumnVisible('jobIdColumn', true);
        this.gridApi.setColumnVisible('quotationIdColumn', false);
        this.gridApi.setColumnVisible('allocatedIdColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);
      this.queryResposne();
    } else if (action == '7') {
      this.gridApi.setColumnVisible('jobIdColumn', true);
        this.gridApi.setColumnVisible('quotationIdColumn', false);
        this.gridApi.setColumnVisible('allocatedIdColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);

      this.errorJobs();
    } else if (action == '8') {
      this.gridApi.setColumnVisible('jobIdColumn', false);
        this.gridApi.setColumnVisible('quotationIdColumn', true);
        this.gridApi.setColumnVisible('allocatedIdColumn', false);
      this.gridApi.setColumnVisible('employeeNameColumn', false);

      this.quotationJobs();
    }
  }
  freshJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/1/0`
      )
      .subscribe({
        next: (freshJobs) => {
          this.spinnerService.requestEnded();
          if (this.gridApi) {
            // this.gridApi.setColumnVisible('jobId', true); // Show 'jobId' column // this.gridApi.setColumnVisible('AllocatedjobId', false); // Hide 'AllocatedjobId' column
          } else {
            console.error('gridApi is not initialized.');
          }
          this.rowData = freshJobs.allocationJobs;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  revisionJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/2/0`
      )
      .subscribe({
       next: (revisionJobs) => {
          this.spinnerService.requestEnded();
          this.spinnerService.requestEnded();
          this.gridApi.setColumnVisible('jobId', true);
          this.gridApi.setColumnVisible('AllocatedjobId', false);
          this.rowData = revisionJobs.allocationJobs;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          console.log(err);
        },
      });
  }
  reworkJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/3/0`
      )
      .subscribe({
       next: (revisionJobs) => {
          this.spinnerService.requestEnded();
          this.gridApi.setColumnVisible('jobId', true);
          this.gridApi.setColumnVisible('AllocatedjobId', false);
          this.rowData = revisionJobs.allocationJobs;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          console.log(err);
        },
      });
  }
  allocaetdJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/4/0`
      )
      .subscribe({
       next: (revisionJobs) => {
          this.spinnerService.requestEnded();
          this.gridApi.setColumnVisible('jobId', false);
          this.gridApi.setColumnVisible('AllocatedjobId', true);
          this.rowData = revisionJobs.allocationJobs;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          console.log(err);
        },
      });
  }
  queries() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getQueryPendingJobs/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/0`
      )
      .subscribe({
       next: (revisionJobs) => {
          this.spinnerService.requestEnded();
          this.gridApi.setColumnVisible('jobId', true);
          this.gridApi.setColumnVisible('AllocatedjobId', false);
          this.rowData = revisionJobs.queryPendingJobs;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          console.log(err);
        },
      });
  }
  queryResposne() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getQueryResponseJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/0`
      )
      .subscribe({
        next: (freshJobs) => {
          this.spinnerService.requestEnded();
          if (this.gridApi) {
            // this.gridApi.setColumnVisible('jobId', true); // Show 'jobId' column // this.gridApi.setColumnVisible('AllocatedjobId', false); // Hide 'AllocatedjobId' column
          } else {
            console.error('gridApi is not initialized.');
          }
          this.rowData = freshJobs.queryResponseJobs;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          console.error(err);
        },
      });
  }
  errorJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/5/0`
      )
      .subscribe({
        next: (freshJobs) => {
          this.spinnerService.requestEnded();
          if (this.gridApi) {
            // this.gridApi.setColumnVisible('jobId', true); // Show 'jobId' column // this.gridApi.setColumnVisible('AllocatedjobId', false); // Hide 'AllocatedjobId' column
          } else {
            console.error('gridApi is not initialized.');
          }
          this.rowData = freshJobs.allocationJobs;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          console.error(err);
        },
      });
  }
  quotationJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/7/0`
      )
      .subscribe({
        next: (freshJobs) => {
          this.spinnerService.requestEnded();
          if (this.gridApi) {
            // this.gridApi.setColumnVisible('jobId', true); // Show 'jobId' column // this.gridApi.setColumnVisible('AllocatedjobId', false); // Hide 'AllocatedjobId' column
          } else {
            console.error('gridApi is not initialized.');
          }
          this.rowData = freshJobs.allocationJobs;
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          console.error(err);
        },
      });
  }

  estTimeinput: any[] = [];
  getJobCategoryStatus() {
    this.productionallocation
      .getJobCategoryStatusMessage()
      .subscribe((data) => {
        this.estTimeinput = data;
      });
  }

  
  getProductionJob(data: any) {
    const dialogRef = this._dialog.open(JobAssignedDetailsPopupComponent, {
      width: '100%',
      height: '450px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.ngOnInit();
        }
      },
    });
  }
  getemployeeName(data: any) {
    const dialogRef = this._dialog.open(JoballocatedEmplpopupComponent, {
      width: '100%',
      height: '450px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.freshJobs();
        }
      },
    });
  }
  getAllocatedJobId(data: any) {
    console.log(data, 'EditedData');
    const dialogRef = this._dialog.open(ProductionAllocatedPopupComponent, {
      width: '100%',
      height: '850px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.freshJobs();
        }
      },
    });
  }
  getQuatationJobId(data: any) {
    const dialogRef = this._dialog.open(ProductionQuotationComponent, {
      width: '100%',
      height: '850px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.freshJobs();
        }
      },
    });
  }
  employeeProduction(data: any) {
    const dialogRef = this._dialog.open(EmployeePopupTableComponent, {
      width: '100%',
      height: '450px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.freshJobs();
        }
      },
    });
  }
  selectedJobs: any[] = [];
  selectedEmployees:any[]=[];
  sampleData() {
    const firstTable = this.gridApi.getSelectedRows();
    console.log(firstTable, 'FirstTable');
    const secondtable = this.gridEmplApi.getSelectedRows();

    console.log(secondtable, 'secondtable');
  }
  setExchangeHeader() {
    if (this.gridApi) {
      const selectedNodes = this.gridApi.getSelectedRows();

      selectedNodes.forEach((node) => {
        console.log(node, "node");
        if (node.jobId) {
          node.allocatedEstimatedTime = this.exchangeHeader;
          console.log(this.exchangeHeader, "exgheader");
        }
      });
      this.gridApi.refreshCells(); // Manually trigger change detection
    } else {
      console.error('AG Grid API not available');
    }
  }
 
  ScopeId: any;
  scopeChange(scope) {
    this.ScopeId = scope;
  }
 
  onSubmits() {
    this.selectedJobs= this.gridApi.getSelectedRows();
    this.selectedEmployees= this.gridEmplApi.getSelectedRows();

    console.log(this.selectedJobs,"this.selectedJobs");
    console.log(this.selectedEmployees.length,"this.selectedEmployees");
    
    this.spinnerService.requestStarted();
    var selectedJobCount = this.selectedJobs.length;
    var selectedEmployeeCount = this.selectedEmployees.length;
    if (this.loginservice.getProcessName() == 'Production Allocation') {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedJobCount > 1) {
          if (selectedEmployeeCount < 1) {
            Swal.fire('Info!', 'Please select one Employee!', 'info');
          }
          else {
            for (var i = 0; i < selectedJobCount; i++) {
              if (this.selectedJobs[i].estimatedTime == undefined || this.selectedJobs[i].estimatedTime == "" || this.selectedJobs[i].estimatedTime == 0) {
                Swal.fire('Info!', 'Please enter Estimated Time for Selected Job!', 'info');
                this.spinnerService.requestEnded();
                return;
              }
            }
            this.postJobs();
          }
        } else {
          for (var i = 0; i < selectedEmployeeCount; i++) {
            if (
              this.selectedEmployees[i].estimatedTime == undefined ||
              this.selectedEmployees[i].estimatedTime == '' ||
              this.selectedEmployees[i].estimatedTime == 0
            ) {
              Swal.fire('Info!', 'Please enter Estimated Time for Selected Employee!', 'info');
              this.spinnerService.requestEnded();
              return;
            }
          }
          this.postJobs();
        }
      } else {
        Swal.fire('Info!', 'Please select Job and Employees!', 'info');
        this.spinnerService.requestEnded();
      }
    } else {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedEmployeeCount > 1) {
          console.log(selectedEmployeeCount, 'employeecount');

          Swal.fire('Info!', 'Please select one Employee!', 'info');
          this.spinnerService.requestEnded();
          return;
        }
        this.postJobs();
      } else {
        Swal.fire('Info!', 'Please select Job and Employee!', 'info');
        this.spinnerService.requestEnded();
      }
    }


  }
  onSubmit() {
    console.log(this.gridApi.getSelectedRows(), 'rowselection');

    this. selectedJobs= this.gridApi.getSelectedRows(); // let selectedJobs = this.gridApi.getSelectedRows().forEach(x => this.setAll(x)); // let seleectedJobsData = selectedJobs.push([{...selectedJobs,employeeId:'',allocatedEstimatedTime:'',jId:''}])
    this. selectedEmployees= this.gridEmplApi.getSelectedRows(); // let selectedEmployees =   this.gridEmplApi.getSelectedRows().forEach(x => this.setEmployeeAll(true, x)); // let seleectedEmployeeData = selectedEmployees.push([{...selectedEmployees,employeeId:'',allocatedEstimatedTime:'',jId:''}]) // console.log(seleectedEmployeeData,"seleectedEmployeeData"); // console.log(seleectedJobsData,"seleectedJobsData"); // Reset variables
  
    console.log(this.selectedJobs, 'SelectedJobs');
    console.log(this.selectedEmployees.length, 'selectedEmployees'); // Handle the case where no jobs or employees are selected
    if (this.selectedJobs.length === 0 || this.selectedEmployees.length === 0) {
      Swal.fire('Info!', 'Please select Job and Employee!', 'info');
      this.spinnerService.requestEnded();
      return;
    } // Handle the case where multiple employees are selected
    if (this.selectedEmployees.length < 1) {
      Swal.fire('Info!', 'Please select one Employee!', 'info');
      this.spinnerService.requestEnded();
      // this.postJobs();
      return;
    } 
    // if (this.gridApi) {
    //   const selectedNodes = this.gridApi.getSelectedNodes();
    //   selectedNodes.forEach((node) => {
    //     if (node.data.jobId) {
    //       // Update the data directly, which will trigger Angular's change detection
    //       node.setDataValue('allocatedEstimatedTime', this.exchangeHeader);
    //     }
    //   }); // Reset exchangeHeader after updating the selected rows
    //   // this.exchangeHeader = null;
    // } // Handle the case where multiple jobs are selected
    if (this.selectedJobs.length > 1) {
      for (let i = 0; i < this.selectedJobs.length; i++) {
        // if (this.selectedJobs[i].this.exchangeHeader) {
          if (
            this.selectedJobs[i].allocatedEstimatedTime == undefined ||
            this.selectedJobs[i].allocatedEstimatedTime == '' ||
            this.selectedJobs[i].allocatedEstimatedTime == 0
          ){
          Swal.fire(
            'Info!',
            'Please enter Estimated Time for Selected Job!',
            'info'
          );
          this.spinnerService.requestEnded();
          // this.postJobs();
          return;
        }
      }
    } else {
      for (var i = 0; i < this.selectedEmployees.length; i++) {
        console.table(this.selectedEmployee)
        console.table(this.selectedEmployees,)
        if (
          this.selectedEmployees[i].estTime == undefined ||
          this.selectedEmployees[i].estTime == '' ||
          this.selectedEmployees[i].estTime == 0
        ) {
          Swal.fire('Info!', 'Please enter Estimated Time for Selected Employee!', 'info');
          this.spinnerService.requestEnded();
          return;
        }
      }
      // this.postJobs();
    }
    
    // Update estimatedTime for selected jobs
    // this.selectedJobs.forEach((job) => (job.estimatedTime = this.exchangeHeader)); // Update estimatedTime for selected employees
    // this.selectedEmployees.forEach((employee) => {
      
      // if (!employee.estimatedTime) {
      //   Swal.fire(
      //     'Info!',
      //     'Please enter Estimated Time for Selected Employee!',
      //     'info'
      //   );
      //   this.spinnerService.requestEnded();
      //   this.postJobs();
      //   return;
      // }
    // }); // Reset exchangeHeader after updating the selected rows // this.exchangeHeader = null; // Continue with your logic to post jobs
    this.postJobs();
  }
  postJobs() {
    console.log(this.selectedJobs,"selectedjobs");
    console.log(this.selectedJobs, "selectedemployee");
    
    let processMovement = {
      id: 0,
      processId: this.loginservice.getProcessId(),
      statusId: 1,
      selectedScopeId: this.ScopeId ? this.ScopeId : 0,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: 'string',
      isBench: this.benchChecked,
      jobId: 'string',
      value: 0,
      amount: 0,
      stitchCount: 0,
      estimationTime:this.exchangeHeader?? this.selectedEmployees.reduce(
        (total, employee) => total + employee.estTime,
        0
      ),
      dateofDelivery: '2023-06-22T11:47:25.193Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: 0,
      jId: 0,
      estimatedTime:this.exchangeHeader??this.selectedEmployees.reduce(
        (total, employee) => total + employee.estTime,
        0
      ),
      tranMasterId: 0,
      selectedRows: this.selectedJobs.map(x=>this.setAll(x)),
      selectedEmployees: this.selectedEmployees.map(x=>this.setEmployeeAll(x)),
      departmentId: 0,
      updatedUTC: new Date().toISOString,
      categoryDesc: 'string',
      allocatedEstimatedTime: this.exchangeHeader??this.selectedEmployees.reduce(
        (total, employee) => total + employee.estTime,
        0
      ),
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: '',
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: new Date().toISOString,
      clientId: 0,
      customerId: 0,
      fileReceivedDate: '2023-06-22T11:47:25.193Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    if (this.loginservice.getProcessName() == 'Quality Allocation') {
      this.ProcessMovementData('QARestriction', processMovement).subscribe(
        (result) => {
          var SameQAEmployeeJobList:any[] = processMovement.selectedRows.filter(
            function (item:any) {
              var exists = result.jids.some((x) => x == item?.jId);
              return exists;
            }
          );
          var processedRows = processMovement.selectedRows.filter(function (
            item:any
          ) {
            var exists = result.jids.some((x) => x == item?.jId);
            return !exists;
          });
          if (processedRows.length > 0) {
            processMovement.selectedRows = processedRows;
            this.jobMovement(processMovement);
          }
          if (SameQAEmployeeJobList.length > 0) {
            var strJobId = '';
            for (var i = 0; i < SameQAEmployeeJobList.length; i++) {
              if (i == 0) {
                strJobId += SameQAEmployeeJobList[i].JobId;
              } else {
                strJobId += ',' + SameQAEmployeeJobList[i].JobId;
              }
            }
            Swal.fire(
              'Info!',
              'Following Job Ids are assigne to same Employee!',
              'info'
            ); // alert('Following Job Ids are assigne to same employee ' + strJobId);
          }
        }
      );
    } else {
      this.jobMovement(processMovement);
    }
  }
  jobMovement(processMovement) {
    var confirmationMessage: any;
    let AttachedFiles = []; // this.selectedJobs = processMovement.SelectedRows; // this.selectedEmployee = processMovement.SelectedEmployees;
    this.selectedJobs = this.gridApi.getSelectedRows();
    this.selectedEmployee = this.gridEmplApi.getSelectedRows();
    const sendingSelectedJobs = [{ ...this.selectedJobs, employeeId: '' }];
    this.spinnerService.requestStarted();
    this.http
      .post(environment.apiURL + 'Allocation/processMovement', processMovement)
      .subscribe((response: any) => {
        this.spinnerService.requestEnded();
        confirmationMessage = response;
        if (response.success === false) {
          Swal.fire('Info!', 'Error the job assign!', 'info'); // window.location.reload()
          this.spinnerService.resetSpinner();
        } else if (response.success === true) {
          Swal.fire('Done!', 'Job assigned successfully!', 'success').then(
            (response) => {
              if (response.isConfirmed) {
                this.refreshPage();
              }
            }
          );
          this.spinnerService.resetSpinner(); // this.http // .post(environment.apiURL + 'Allocation/processMovement', processMovement) // .subscribe((result) => { // confirmationMessage = result;
          if (AttachedFiles.length > 0) {
            var fd = new FormData();
            for (let i = 0; i < AttachedFiles.length; i++) {
              fd.append('file', AttachedFiles[i]);
            }
            let file = {
              orderId: 0,
              isClientOrder: 0,
              processId: 0,
              statusId: 0,
              sourcePath: 'string',
              dynamicFolderPath: 'string',
              folderPath: 'string',
              fileName: 'string',
              fileCount: 0,
              wfmId: 0,
              wftId: 0,
              orignalPath: 'string',
              orignalDynamicPath: 'string',
              jobId: 'string',
              isProcessWorkFlowTranInserted: 0,
              isCopyFiles: 0,
              pid: 0,
              fakeProcessId: 0,
              fakeStatusId: 0,
              fakeDynamicFolderPath: 'string',
              jobFileName: 'string',
              files: ['string'],
              message: 'string',
              creditMessage: 'string',
              clientName: 'string',
              clientId: 0,
            };
            this.spinnerService.requestStarted();
            this.http
              .post(environment.apiURL + 'JobOrder/openFolder', file)
              .subscribe({
                next: (data) => {
                  this.spinnerService.requestEnded();
                  AttachedFiles = [];
                },
                error: (err) => {
                  this.spinnerService.resetSpinner();
                  console.log(err);
                },
              });
          } // });
          this.router.navigate(['topnavbar/production']);
        }
        (error) => {
          console.error('Error occurred during API call:', error);
          this.spinnerService.resetSpinner();
          Swal.fire('Done!', 'Job assigned Failed!', 'error');
        };
      });
  }
  refreshPage() {
    this.freshJobs();
    window.location.reload();
  }
  ProcessMovementData(url: string, data: any): Observable<any> {
    return this.http.post(
      environment.apiURL + 'Allocation/QARestriction ',
      data
    );
  }
  updateTotalEstimateTime(): void {
    this.totalEstimateTime = this.dataEmployeeSource.data.reduce(
      (total, employee) => total + employee.estTime,
      0
    );
  }
  setAll(item: any) {
    if (item.allocatedEstimatedTime == null) item.allocatedEstimatedTime = 0;
    if (item.employeeId == null) item.employeeId = 0;
    if (item.estimatedTime == null) item.estimatedTime = 0;
    return {
      ...item,
      CategoryDesc: '',
      Comments: '',
      CommentsToClient: '',
      Remarks: '',
      SelectedEmployees: [],
      SelectedRows: [],
      
    };
  } //textcolor

  getCellClass(data) {
    return {
      'text-color-green': data.employeeCount === 1,
      'text-color-brown': data.queryJobDate !== null,
      'text-color-blue': data.employeeCount > 1,
      'text-color-DeepSkyBlue': data.customerJobType === 'Trial',
      'text-color-yellow': data.statusId === 10,
      'text-color-red': data.statusId === 11,
      SuperRush:
        data.jobStatusId === 1 ||
        data.jobStatusId === 3 ||
        data.jobStatusId === 7,
      Rush:
        data.jobStatusId === 2 ||
        data.jobStatusId === 4 ||
        data.jobStatusId === 8,
    };
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
function isEmpColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsisEmpColumn = displayedColumns[0] === params.column;
  return thisIsisEmpColumn;
}