import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ssrsreport-viewer',
  templateUrl: './ssrsreport-viewer.component.html',
  styleUrls: ['./ssrsreport-viewer.component.scss']
})
export class SSRSReportViewerComponent implements OnInit{

  constructor(private route: ActivatedRoute){
    
  }
  ngOnInit(): void {
    let InvoiceNumber = this.route.snapshot.queryParams['InvoiceNo'];
    console.log(InvoiceNumber,"GettingInvoiceNumber");
    
    this.parameters = {
      "InvoiceNo": InvoiceNumber,

      };    
      console.log(this.parameters,"Parameter");
      
  }
 
  reportServer: string = 'http://servicedesk.vleadservices.com/ReportServer';
  reportUrl: string = 'VleadMigration/Reports/ArtAnnexure';
  ReportServerDomain: "vleadservices.com";
  ReportServerUserName:"vleadservices\\visvlead";
  ReportServerPassword:"V1e@d@!@#";
  showParameters: string = "false"; 
  parameters: any = {
    "InvoiceNo":" ",
   
    };
  language: string = "en-us";
  width: number = 100;
  height: number = 100;
  toolbar: string = "true";
}