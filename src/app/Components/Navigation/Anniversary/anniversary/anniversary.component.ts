import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-anniversary',
  templateUrl: './anniversary.component.html',
  styleUrls: ['./anniversary.component.scss']
})
export class AnniversaryComponent implements OnInit{
  dataSource!: MatTableDataSource<any>;


  constructor(
   private http:HttpClient, public dialogRef: MatDialogRef<AnniversaryComponent>,
) {}

displayedColumns: string[] = ['EmployeeCode', 'EmployeeName', 'Department', 'Designation'];
  ngOnInit(): void {
    this.getBirthdayWishes();
  }

  close(){
    this.dialogRef.close();
  }

  getBirthdayWishes(){
    this.http.get<any>(environment.apiURL+'BJWish/GetBJWish').subscribe((result)=>{
      console.log(result.bjList.dobObjList,"Birthday");
      console.log(result,"Birthday");

      this.dataSource = result.bjList.dojObjList;
      
    })
  }

}
