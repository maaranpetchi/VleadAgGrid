import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generatedinvoice',
  templateUrl: './generatedinvoice.component.html',
  styleUrls: ['./generatedinvoice.component.scss']
})
export class GeneratedinvoiceComponent implements OnInit{

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
  reportUrl: string = 'VleadMigration/Reports/DigiAnnexure';
  showParameters: string = "false"; 
  parameters: any = {
    "InvoiceNo":" ",
   
    };
  language: string = "en-us";
  width: number = 100;
  height: number = 100;
  toolbar: string = "true";
}