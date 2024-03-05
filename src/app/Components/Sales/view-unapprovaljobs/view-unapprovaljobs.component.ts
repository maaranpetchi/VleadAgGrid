import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environments/environment';
import saveAs from 'file-saver';

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
  files: string[] = [];

  workFiles(path: string): void {
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
  onCancel() {
    this.router.navigate(['/topnavbar/unapprovalJobs']);
  }

}
