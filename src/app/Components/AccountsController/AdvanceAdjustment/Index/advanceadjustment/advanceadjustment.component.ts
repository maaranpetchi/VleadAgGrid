import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditadvanceadjustmentComponent } from '../../Edit/editadvanceadjustment/editadvanceadjustment.component';
import { AdvanceadjustmentService } from 'src/app/Services/AccountController/AdvanceAdjustment/advanceadjustment.service';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-advanceadjustment',
  templateUrl: './advanceadjustment.component.html',
  styleUrls: ['./advanceadjustment.component.scss']
})
export class AdvanceadjustmentComponent implements OnInit {
  
  selectedOption: string;

  displayedColumns: string[] = [
    'VocherNumber',
    'collectionDate',
    'Description',
    'adjustmentAmount',
    'UnadjustedAdvance',
    'action'
  ];
    dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  options: any[] = [];

  constructor(
    private advanceservice:AdvanceadjustmentService,
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private http: HttpClient,
  ) { }


  ngOnInit(): void {
    // department dropdown fetch the values from the API
  //   this..subscribe(departmentdata => {
  //     this.Departmentdropdownvalues = departmentdata;
  //     this.Departmentdropdownvalues.sort();
  // });

  this.advanceservice.getdropdownvalues().subscribe(departmentdata => {
        this.Departmentdropdownvalues = departmentdata;
        this.Departmentdropdownvalues.sort();
    });

}


//Customerdropdownvalues dropdowndeclaration
selecteddepartmentOption: any = '';
Departmentdropdownvalues: any[] = [];



employeeFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
openEditForm(data: any) {
  const dialogRef: MatDialogRef<EditadvanceadjustmentComponent> = this._dialog.open(EditadvanceadjustmentComponent, {
    width: '70vw',
    height: '90vh',
    data: {
      id: data.id,
      availableAdvance: data.availableAdvance,
      department: this.selecteddepartmentOption,
    },
  });

  dialogRef.afterClosed().subscribe(result => {

      // Call the loaddata() method here
      this.loadData();
  });
}
getcustomerid(){
  
  return this.selecteddepartmentOption;
  
}

loadData() {
  this.http.get<any[]>(environment.apiURL+`AdvanceAdjustment/GetAllCustomerAdvance?CustomerId=${this.selecteddepartmentOption}`).subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    
  });
}

}

