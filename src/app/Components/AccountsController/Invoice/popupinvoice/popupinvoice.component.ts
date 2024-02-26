import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popupinvoice',
  templateUrl: './popupinvoice.component.html',
  styleUrls: ['./popupinvoice.component.scss']
})
export class PopupinvoiceComponent implements OnInit{

  constructor(private route: ActivatedRoute){
    
  }
  ngOnInit(): void {
    let InvoiceNumber = this.route.snapshot.queryParams['InvoiceNo'];
    console.log(InvoiceNumber,"GettingInvoiceNumber");
    
    this.parameters = {
      "InvoiceNo": InvoiceNumber,
     
      };     
  }
 
  reportServer: string = 'http://servicedesk.vleadservices.com/ReportServer';
  reportUrl: string = 'VleadMigration/Reports/Invoice';
  showParameters: string = "false"; 
  parameters: any = {
    "InvoiceNo":" ",
   
    };
  language: string = "en-us";
  width: number = 100;
  height: number = 100;
  toolbar: string = "true";
}