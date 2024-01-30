import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-view-unapprovaljobs',
  templateUrl: './view-unapprovaljobs.component.html',
  styleUrls: ['./view-unapprovaljobs.component.scss']
})
export class ViewUnapprovaljobsComponent implements OnInit {
  responseData: any;  
  constructor (
    private router: Router,
    private spinner:SpinnerService,
    private http:HttpClient,
  ){}
  ngOnInit(): void {
    this.getviewDetils(history.state.data)
    
    this.responseData = history.state.data;
  }
  getviewDetils(data:any){
    this.spinner.requestStarted();
    this.http.get(environment.apiURL+`ClientOrderService/GetClientByOrderId/1?orderId=${data}`).subscribe({
      next:(response)=>{
        this.responseData = response;
        this.spinner.requestEnded();
      },
      error: (err) => {
        this.spinner.resetSpinner();

        console.log(err);
      },
    })
  }

  workFiles(path: string): void {
    path = path.replace(/\\/g, '_');
    this.http
      .get<any>(environment.apiURL + `Allocation/getFileNames/${path}`)
      .subscribe((response) => {
        if (response.files && response.files.length > 0) {
          const downloadObservables = response.files.map((value) =>
            this.downloadFile(path, value)
          );
        }
      });
  }
  downloadFile(path: string, filename: string): void {
    this.http
      .get(environment.apiURL + `Allocation/DownloadFilesTest/${path}/${filename}`,{
        headers:{'Content-Type': 'application/octet-stream'},
        responseType: 'blob',
        observe: 'response'
      })
      .subscribe((response) => {
        const contentType = response.headers.get('Content-Type');
        if (response.body?.size) {
        const fileBlob: Blob = response.body;
        const fileURL = URL.createObjectURL(fileBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = filename;
        downloadLink.click();
        }
      });
  }

  onCancel() {
    this.router.navigate(['/topnavbar/unapprovalJobs']);
  }

}
