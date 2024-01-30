import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientorderstableComponent } from '../clientorderstable/clientorderstable.component';
import { environment } from 'src/Environments/environment';

export interface TableData {
  amount: number;
  instruction: string;
  suggestion: string;
  vleadComments: string;
  department: string;
}
@Component({
  selector: 'app-clientdetailspopup',
  templateUrl: './clientdetailspopup.component.html',
  styleUrls: ['./clientdetailspopup.component.scss']
})
export class ClientdetailspopupComponent implements OnInit {
  displayedColumns: string[] = ['amount', 'instruction', 'suggestion', 'vleadComments', 'department'];
  dataSource: TableData[] = [];

  @ViewChild(ClientorderstableComponent) ClientorderstableComponent: ClientorderstableComponent;
  constructor(private http: HttpClient,private dialogRef: MatDialogRef<ClientdetailspopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { this.fetchTableData(data.id);}

  ngOnInit() {
   
  }

  fetchTableData(id) {
    let a:any[] = [];
    this.http.get<any>(environment.apiURL+`ClientOrderService/GetJobOrderByJobId?JobId=${id}`).subscribe(data => {
    a.push(data);  
    this.dataSource = a;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  
}