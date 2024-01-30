import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvoicecancelleddetailsComponent } from '../invoicecancelleddetails/invoicecancelleddetails.component';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-invoicecancellation',
  templateUrl: './invoicecancellation.component.html',
  styleUrls: ['./invoicecancellation.component.scss']
})
export class InvoicecancellationComponent {
  @Output() invoiceNumberSelected = new EventEmitter<string>();
 
 
  invoicenumbers: any;
  invoiceNumber: any;

  constructor(private http: HttpClient,private dialog: MatDialog,private loginservice:LoginService) { }

  displayedColumns: string[] = [
    'invoicenumber',
    'invoicedate',
    'productvalue',
    'wavier',
    'roundoff',
    'discount',
    'invoicevalue',

  ];


  openPopupForm(invoiceNo: string): void {
    const dialogRef = this.dialog.open(InvoicecancelleddetailsComponent, {
      width: '800px',
      data: { invoiceNo: this.myForm.value.invoicenumber }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
    this.invoiceNumberSelected.emit(invoiceNo);
  }
  
  selectedInvoices: any[] = [];



  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  setAll(completed: boolean, item: any) {
    if (completed == true) {
      this.selectedInvoices.push(item)
    }
    else {

      if (this.selectedInvoices.find(x => x.id == item.id)) {
        this.selectedInvoices = this.selectedInvoices.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
  }


  ngOnInit(): void {
    this.invoicenumbers = [];
    //client dropdown
    this.http.get<any>(environment.apiURL+'invoice/getdropclientforinvoicecancel').subscribe(data => {
      this.clientdata = data;
    });

    //invoicenumber dropdown
    this.http.get<any>(environment.apiURL+'invoice/getallinvoicemasterdetails').subscribe(invoicedata => {
      this.invoicenumberdata = invoicedata;
    });
  }

  clientdata: any = {
    clientDrop: [],
  };
  invoicenumberdata: any = {
    getInvoice: [],
  };

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm = new FormGroup({
    invoicenumber: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required)
  });

  storinginvoicevalue: any[] = [];

  onOptionSelected(event: any, myform: FormGroup) {
    const apiUrl = environment.apiURL+"Invoice/GetDropInvoiceforCancel"; // replace with your actual API URL
    const requestData = {
      id: myform.value.ClientId
    };

    this.http.post<any>(apiUrl, requestData).subscribe(response => {
      this.storinginvoicevalue = response.clientList;
    });
  }

  onSubmit() {
    // Call the API to get the search results
    this.http.post<any>(environment.apiURL+'Invoice/GetInvoiceMasterforSalesCancel', {
      "Id": 0,
      "invoiceNo":this.myForm.value.invoicenumber
    }).subscribe((results: any) => {
      // Set the search results in the data source


      this.dataSource.data = results.invoicesc;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.invoiceNumber = results.invoicesc.invoiceNo;


    }
    )
  }

  cancelInvoice(){
    let payload={
      "id": 0,
      "customerID": 0,
      "employeeId": this.loginservice.getUsername(),
      "invoiceNo": this.myForm.value.invoicenumber,
      "invoicesc": [ ]
    }
    this.http.post<any>(environment.apiURL+`Invoice/GetUpdateMasterforSalesCancel`,payload).subscribe(data=>{
      
      Swal.fire({
        title: 'Are you sure wanting to cancel this Invoice?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire(data.stringList)
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })    })
  }
}
