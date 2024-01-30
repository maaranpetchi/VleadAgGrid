import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-job-details-sew-pop',
  templateUrl: './job-details-sew-pop.component.html',
  styleUrls: ['./job-details-sew-pop.component.scss']
})
export class JobDetailsSewPopComponent implements OnInit {
  displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks'];
  dataJobSource: MatTableDataSource<any>;

  constructor(private http: HttpClient,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<JobDetailsSewPopComponent>) { this.dataJobSource = data.jobHistory;}
  jobHistory: any[] = [];
  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
    // Add any additional logic here to navigate away from the current page
  }

}