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

    this.route.queryParams.subscribe(params => {
      this.InvoiceNumber = params['InvoiceNo'];
      console.log(this.InvoiceNumber, "GettingInvoiceNumber");

      const url = environment.apiURL + `Invoice/Reports?invoiceNumber=${this.InvoiceNumber}&type=artwork`;
      this.pdfurl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });

    this.download();

  }
  pdfurl: any;


  download() {

    // Set responseType to 'blob' to get the response as a Blob
    this.http.get(environment.apiURL + `Invoice/Reports?invoiceNumber=${this.InvoiceNumber}&type=artwork`, { responseType: 'blob' }).subscribe((res) => {
      console.log(res, "Resukt");


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