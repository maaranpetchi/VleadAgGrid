import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-popupinvoice',
  templateUrl: './popupinvoice.component.html',
  styleUrls: ['./popupinvoice.component.scss']
})
export class PopupinvoiceComponent  implements OnInit {
  InvoiceNumber: any;
  shortName:any;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpClient) {

  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.InvoiceNumber = params['InvoiceNo'];
      this.shortName = params['ShortName'];
      console.log(this.InvoiceNumber, "GettingInvoiceNumber");

      const url = environment.apiURL + `Invoice/Reports?invoiceNumber=${this.InvoiceNumber}&type=invoice`;
      this.pdfurl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });

    this.download();

  }
  pdfurl: any;


  download() {

    // Set responseType to 'blob' to get the response as a Blob
    this.http.get(environment.apiURL + `Invoice/Reports?invoiceNumber=${this.InvoiceNumber}&type=invoice`, { responseType: 'blob' }).subscribe((res) => {
      console.log(res, "Resukt");


      const blobURL = window.URL.createObjectURL(res);

      // Create an anchor element
      const a = document.createElement('a');
      a.href = blobURL;
      a.download = `${this.shortName}_${this.InvoiceNumber}.pdf`; // Set the filename

      // Programmatically click the anchor element to trigger the download
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobURL);
    });

  }
}