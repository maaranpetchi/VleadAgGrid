import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

interface MoveData {
  movedFrom: string;
  movedTo: string;
  movedDate: string;
  movedBy: string;
  // remarks: string;
}


@Component({
  selector: 'app-proofjobhistorypopup',
  templateUrl: './proofjobhistorypopup.component.html',
  styleUrls: ['./proofjobhistorypopup.component.scss']
})
export class ProofjobhistorypopupComponent implements OnInit {
  displayedColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy', 'remarks'];
  dataSource: MatTableDataSource<MoveData>;
  

  constructor(private http: HttpClient,public dialogRef: MatDialogRef<ProofjobhistorypopupComponent>) {}

  ngOnInit(): void {
    this.http
      .get<MoveData[]>('http://your-rest-api-url.com/move-data')
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<MoveData>(data);
      });
  }

  closejobform(){
    this.dialogRef.close();
  }
}
