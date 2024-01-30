
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';

@Component({
  selector: 'app-prodjobpopup',
  templateUrl: './prodjobpopup.component.html',
  styleUrls: ['./prodjobpopup.component.scss']
})
export class ProdjobpopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private spinnerService:SpinnerService,private http: HttpClient,public dialogRef: MatDialogRef<ProdjobpopupComponent>){}
  
 displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataJobSource: MatTableDataSource<any>;

 remarks: string;  // to store the remark value
 selectedQureryStatus: string; // to store the selected query status


 copyPreviousTrayFiles:boolean = false;
  ngOnInit() {

    // Fetch data from the REST API and populate the table job history
 this.getData();
  }


  getData(){
    this.spinnerService.requestStarted();

    this.http.post<any>(environment.apiURL+'JobOrder/getJobHistory',this.data.jid).subscribe(data => {
      this.spinnerService.requestEnded();
      this.dataJobSource = data.jobHistory;      
    });
  }
  selectedFile: File;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  closeDialog(){
this.dialogRef.close();
  }
}
