import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-ssrsreport-viewer',
  templateUrl: './ssrsreport-viewer.component.html',
  styleUrls: ['./ssrsreport-viewer.component.scss']
})
export class SSRSReportViewerComponent implements OnInit {
  InvoiceNumber: any;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.InvoiceNumber = this.route.snapshot.queryParams['InvoiceNo'];
    console.log(this.InvoiceNumber,"InvoiceNumber");
    
    this.route.queryParams.subscribe(params => {
      const invoiceNumber = params['InvoiceNo'];
      const url = environment.apiURL + `Invoice/DownloadReport/${invoiceNumber}`;
      this.pdfurl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });

    this.download();

  }
  pdfurl: any;

  // reportServer: string = 'http://servicedesk.vleadservices.com/ReportServer';
  // reportUrl: string = 'VleadMigration/Reports/ArtAnnexure';
  // ReportServerDomain: "vleadservices.com";
  // ReportServerUserName:"vleadservices\\visvlead";
  // ReportServerPassword:"V1e@d@!@#";
  // showParameters: string = "false"; 
  // parameters: any = {
  //   "InvoiceNo":" ",

  //   };
  // language: string = "en-us";
  // width: number = 100;
  // height: number = 100;
  // toolbar: string = "true";

  download() {

    // Set responseType to 'blob' to get the response as a Blob
    this.http.get(environment.apiURL + `Invoice/DownloadReport/${this.InvoiceNumber}`, { responseType: 'blob' }).subscribe((res) => {
      console.log(res,"Resukt");


      const blobURL = window.URL.createObjectURL(res);

      // Create an anchor element
      const a = document.createElement('a');
      a.href = blobURL;
      a.download = `Invoice_${this.InvoiceNumber}.pdf`; // Set the filename

      // Programmatically click the anchor element to trigger the download
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobURL);
    });

  }
}