import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';
import { DetailsComponent } from 'src/app/Components/AccountsController/Invoice/details/details.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CustomerreceiptsService } from 'src/app/Services/AccountController/CustomerReceipts/customerreceipts.service';
import { SharedService } from 'src/app/Services/SharedService/shared.service';

@Component({
  selector: 'app-checklistpop',
  templateUrl: './checklistpop.component.html',
  styleUrls: ['./checklistpop.component.scss']
})
export class ChecklistpopComponent implements OnInit{
  gettingData: any[]=[];


  constructor(private sharedDataService:SharedService, private dialog: MatDialog, private spinnerService: SpinnerService,public dialogRef: MatDialogRef<ChecklistpopComponent>,private _empservice:CustomerreceiptsService){
    const data = this._empservice.getData();
  console.log(data,'injected Data');
    
this.gettingData = data.data
      
    }
  ngOnInit(): void {

  }

  ok(){
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close(false);
    }
}


