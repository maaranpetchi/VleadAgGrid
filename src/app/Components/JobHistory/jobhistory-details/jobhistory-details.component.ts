import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JobHistoryComponent } from '../job-history/job-history.component';
import { environment } from 'src/Environments/environment';
import saveAs from 'file-saver';
import { SpinnerService } from '../../Spinner/spinner.service';
import { catchError } from 'rxjs';
import { error } from 'jquery';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-jobhistory-details',
  templateUrl: './jobhistory-details.component.html',
  styleUrls: ['./jobhistory-details.component.scss']
})
export class JobhistoryDetailsComponent implements OnInit {

  displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks' , 'files'];
  displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks' ,'ProcessStatus', 'files'];
  jobHistory: any;
  jobcommonDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    public dialogRef: MatDialogRef<JobHistoryComponent>,
private spinnerservice:SpinnerService
  ){}
  dataJobSource: MatTableDataSource<any>;
  queryDataJobSource: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getJobHistoryDetails(this.data);
    
  }

  getJobHistoryDetails(data:any){
    this.spinnerservice.requestStarted();
    this.http.post<any>(environment.apiURL+'JobOrder/getJobHistory',this.data.jId).pipe(catchError((error)=>{
      this.spinnerservice.requestEnded();
      return Swal.fire('Alert!','An error occurred while processing your request','error');

    })).subscribe(data => {
      this.spinnerservice.requestEnded();
      this.dataJobSource = data.jobHistory;
      this.jobcommonDetails = data.jobCommonDetails;
      this.queryDataJobSource = data.jobQueryHistory 
  })
  }
  files: string[] = [];

  downloadExcell(path: any): void {
    
    // let path= this.jobHistory.fileUploadPath
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
  getFileNameFromPath(filePath: string): string {
    const pathParts = filePath.split('/');
    return pathParts[pathParts.length - 1];
  }

  closeButton(){
    this.dialogRef.close();
  }

}
