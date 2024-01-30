import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { ProofjobhistorypopupComponent } from '../proofjobhistorypopup/proofjobhistorypopup.component';

interface TimeData {
  totalTimeWorked: string;
  break: string
  trainingMeeting: string;
  hold: string;
  others: string;
}
@Component({
  selector: 'app-proofworkflow',
  templateUrl: './proofworkflow.component.html',
  styleUrls: ['./proofworkflow.component.scss']
})
export class ProofworkflowComponent implements OnInit {

  timeData: TimeData = {
    totalTimeWorked: '0 Minutes',
    break: '0 Minutes',
    trainingMeeting: '0 Minutes',
    hold: '0 Minutes',
    others: '0 Minutes',
  };

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['startDate', 'endDate', 'timeTaken', 'status'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    // Fetch your API data and assign it to the dataSource main table
    this.http.get<any>('Restapi to display in table').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    }
  openJobHistory(): void {
    this.dialog.open(ProofjobhistorypopupComponent, {
      width: '800px',
    });
  }
}
