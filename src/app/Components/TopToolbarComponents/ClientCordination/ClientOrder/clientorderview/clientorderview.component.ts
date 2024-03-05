import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from 'src/Environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-clientorderview',
  templateUrl: './clientorderview.component.html',
  styleUrls: ['./clientorderview.component.scss']
})
export class ClientorderviewComponent {
  OrderDetails: any;


  constructor(private router: Router, private location: Location, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ClientorderviewComponent>, private http: HttpClient) {

    this.getOrderList();
  }

  goBack() {
    this.dialogRef.close();
  }


  getOrderList(){
    console.log(this.data,"firstDtaa");
    console.log(this.data.data,"secdlata");
    
    this.http.get<any>(environment.apiURL+`ClientOrderService/GetClientByOrderId/1?orderId=${this.data.data.orderId}`).subscribe({
      next:(results)=>{
        this.OrderDetails = results.fileUploadPath;
      }
    })
  
    
    }
  files: string[] = [];

  downloadFiles(path: string) {
    path = path.replace(/\\/g, '_');
    this.http.get<any>(environment.apiURL + `Allocation/getFileNames/${path}`).subscribe((result: any) => {
      this.files = result.files;
      if (this.files.length > 0) {
        this.files.forEach((value: string) => {
          const url =environment.apiURL+`Allocation/downloadFilesTest/${path}/${value}`;
          this.fileDownload(url, value);
        });
      }
    });
  }

  fileDownload(url: string, fileName: string): void {
    this.http
      .get(url, {
        responseType: 'blob',
      })
      .subscribe((response: Blob) => {
        saveAs(response, fileName);
      });
  }



  ///zip download
  
  enableZipDownloadBtn = false;
  zipcheck(): void {

    let path = this.OrderDetails;
    path = path.replace(/\\/g, '_');
    const fileUrl =environment.apiURL + 'Allocation/DownloadZipFile?path=' + `${path}`; // Replace with the actual URL of your zip file
    // Use HttpClient to make a GET request to fetch the zip file
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((response) => {
      this.saveFile(response);
    });
  }

  private saveFile(blob: Blob) {
    // Create a blob URL for the file
    const url = window.URL.createObjectURL(blob);
    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.data.filename}.zip`; // Replace with the desired file name
    document.body.appendChild(a);
    // Trigger the click event to start the download
    a.click();
    // Clean up the blob URL and the link element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  }
}
