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

@Component({
  selector: 'app-addeditemployeevsdivision',

  templateUrl: './addeditemployeevsdivision.component.html',
  styleUrls: ['./addeditemployeevsdivision.component.scss']
})
export class AddeditemployeevsdivisionComponent implements OnInit {
  displayedColumns = ['employeeCode', 'employeeCodeName', 'selected'];
  table1Data: MatTableDataSource<any>;

  table2Data: MatTableDataSource<any>;
  public dialogRef: MatDialogRef<AddeditemployeevsdivisionComponent>;

  myForm: FormGroup;
  // table1Data: any;
  // table2Data: any;

  table1selectedarray: any[] = [];
  table2selectedarray: any[] = [];


  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  constructor(private spinnerService: SpinnerService, private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) {

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
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe(data => {
      // this.table1Data =data.eEvDList ;
      this.table1Data = new MatTableDataSource(data.eEvDList);
      this.spinnerService.requestEnded();
      this.table1Data.data.forEach(row => {
        this.myForm.addControl(row.employeeId.toString(), new FormControl());
      });
      this.table1Data.paginator = this.paginator1;

    });
  }

  getTable2() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'EmployeeVsDivision/GetDivision').pipe(
      catchError((error) => {
        this.spinnerService.requestEnded();
        console.error('API Error:', error);
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      })
    ).subscribe(data => {
      this.table2Data = new MatTableDataSource(data.dEvDList);
      this.spinnerService.requestEnded();

      this.table2Data.data.forEach(row => {
        this.myForm.addControl(row.id.toString() + "hi", new FormControl());
      });
      this.table2Data.paginator = this.paginator2;
    });
  }
  onSubmit() {
    this.selection.selected.forEach(x=>this.setAll2(x));
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
          return Swal.fire('Alert!','An error occurred while processing your request','error');
        })
      ).subscribe(response => {
        this.spinnerService.requestEnded();

        // Handle the response from the API
        this.table1selectedarray = [];
        this.table2selectedarray = [];


        if (response.sEvDList =="Inserted Sucessfully") {
          Swal.fire(
            'Done!',
            response.sEvDList,
            'success'
          ).then((result)=>{
            if(result.isConfirmed){
              window.location.reload();
            }
          })
        }

        else {
          Swal.fire(
            'Error!',
            response.sEvDList,
            'error'
          ).then((result)=>{
            if(result.isConfirmed){
              window.location.reload();
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


  setAll2( item: any) {
      this.table2selectedarray.push({ id: item.id })
  }
  selection = new SelectionModel<Element>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.table2Data.data.length;
    return numSelected === numRows;
  }

  filterValue:any;
  filterValue1:any;
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
    else if(this.filterValue){
    this.selection.clear();
      this.table2Data.filteredData.forEach(x=>this.selection.select(x));
    } else {
      this.table2Data.data.forEach(row => this.selection.select(row));
    }
 
  }
}
