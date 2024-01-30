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
      this.queryDataJobSource = data.jobQueryHistory 
  })
  }
  downloadExcell(path: any): void {
    
    // let path= this.jobHistory.fileUploadPath
    path = path.replace(/\\/g, '_');
    this.spinnerservice.requestStarted();
    this.http
      .get(
        environment.apiURL +
          `Allocation/getFileNames/${path}`
      ).pipe(catchError((error)=>{
        this.spinnerservice.requestEnded();
        return Swal.fire('Alert!','An error occurred while processing your request','error');
      }))
      .subscribe((response: any) => {
        this.spinnerservice.requestEnded();
        const fileUrls: string[] = response.files;
        fileUrls.forEach((url) => {
          this.http.get(environment.apiURL+'Allocation/downloadFilesTest/'+`${path}/`+url).subscribe((response:any) => {
            saveAs(new Blob([response.data], { type: "application/octet-stream" }), url);
          })
        });
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
