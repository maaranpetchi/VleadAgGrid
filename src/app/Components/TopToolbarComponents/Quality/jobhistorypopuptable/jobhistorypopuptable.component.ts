import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { environment } from 'src/Environments/environment';

interface MoveData {
  movedFrom: string;
  movedTo: string;
  movedDate: string;
  movedBy: string;
  remarks: string;
}


@Component({
  selector: 'app-jobhistorypopuptable',
  templateUrl: './jobhistorypopuptable.component.html',
  styleUrls: ['./jobhistorypopuptable.component.scss']
})
export class JobhistorypopuptableComponent implements OnInit {
  displayedColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','movedtoemployee' ,'remarks'];

  dataSource: MatTableDataSource<any>;  

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient,public dialogRef: MatDialogRef<JobhistorypopuptableComponent>) {
  }

  ngOnInit(): void {
  this.getData();
  }

  
getData(){
  this.http.post<any>(environment.apiURL+`JobOrder/getJobHistory`,this.data.jid).subscribe(response =>{
  
    
    this.dataSource = new MatTableDataSource(response.jobHistory)  });
}
  closejobform(){
    this.dialogRef.close();
  }
}