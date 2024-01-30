import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientorderstableComponent } from '../clientorderstable.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';

interface TableData {
  fileName: string;
  poNo: string;
  poDate: string;
  instruction: string;
  salesPersonName: string;
  transactionType: string;
  division: string;
}

@Component({
  selector: 'app-fileconvert',
  templateUrl: './fileconvert.component.html',
  styleUrls: ['./fileconvert.component.scss'],
})
export class FileconvertComponent implements OnInit {
  displayedColumns: string[] = [
    'fileName',
    'poNo',
    'poDate',
    'instruction',
    'salesPersonName',
    'transactionType',
    'division',
  ];
  dataSource = new MatTableDataSource<TableData>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(ClientorderstableComponent)
  ClientorderstableComponent: ClientorderstableComponent;

  @Output() childEvent = new EventEmitter();
  division = 0;

  constructor(
    private loginservice: LoginService,
    private http: HttpClient,
    private _dialog: MatDialog,
    // private snackBar: MatSnackBar,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<FileconvertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.gettingdata(data);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  a: any[] = [];

  gettingdata(data: any) {
    let GetAllvalues = data.row;
    let count = data.fileCount;
    for (let i = 0; i < count; i++) {
      let GetAddList = {
        FileName: GetAllvalues.fileName,
        PoNo: GetAllvalues.poNo,
        PODate: GetAllvalues.poDate,
        Remarks: GetAllvalues.instruction,
        SalesPersonName: GetAllvalues.salesPersonName,
        JobStatusId: GetAllvalues.jobStatusId,
        TransactionId: GetAllvalues.transactionType,
        DepartmentId: GetAllvalues.workType,
        ClientId: GetAllvalues.clientId,
        EmployeeId: this.loginservice.getUsername(),
        FileReceivedDate: GetAllvalues.fileReceivedDate,
        ClientOrderId: GetAllvalues.orderId,
        CCId: GetAllvalues.ccId, //
        CCEmailId: GetAllvalues.ccEmailId, //
        FileInwardTypeId: GetAllvalues.fileInwardTypeId, //
        DivisionId: data.divisionid, // //
        getAllValues: [],
        ApparelLogoLocation: 'apparel',
        poNo: '',
        clientName: '',
        clientJobId: '',
        jobStatusDescription: '',
        username: '',
        clientSalesPerson: '',
        customerName: '',
        temp: '',
        style: '',
        projectCode: '',
        teamCode: '',
        schoolName: '',
        ground: '',
        gender: '',
        fileInwardMode: '',
        jobDescription: '',
        color: '',
        logoDimensionWidth: '',
        logoDimensionsLength: '',
        apparelLogoLocation: '',
        imprintColors1: '',
        imprintColors2: '',
        imprintColors3: '',
        virtualProof: '',

        customerJobType: '',

        viewDatas: [],
      };
      this.a.push(GetAddList);
      this.dataSource = new MatTableDataSource(this.a);
    }
  }

  multiorderconvert() {
    let senddata = {
      id: 0,
      dateofReceived: '2023-05-12T07:08:03.495Z',
      clientName: '',
      clientJobId: '',
      fileName: '',
      jobStatusDescription: '',
      username: '',
      salesPersonName: '',
      clientSalesPerson: '',
      customerName: '',
      temp: '',
      style: '',
      projectCode: '',
      teamCode: '',
      schoolName: '',
      ground: '',
      gender: '',
      fileInwardMode: '',
      status: true,
      fileReceivedDate: '2023-05-12T07:08:03.495Z',
      jobDescription: '',
      jobStatusId: 0,
      departmentId: 0,
      divisionId: 0,
      employeeId: 0,
      clientId: 0,
      remarks: '',
      poNo: '',
      fileInwardTypeId: 0,
      color: '',
      logoDimensionWidth: '',
      logoDimensionsLength: '',
      apparelLogoLocation: '',
      imprintColors1: '',
      imprintColors2: '',
      imprintColors3: '',
      virtualProof: '',
      dateofUpload: '2023-05-12T07:08:03.495Z',
      dateofClose: '2023-05-12T07:08:03.495Z',
      customerJobType: '',
      jobDate: '2023-05-12T07:08:03.495Z',
      clientOrderId: 0,
      viewDatas: [
        {
          id: 0,
          department: '',
          clientStatus: '',
          dateofReceived: '2023-05-12T07:08:03.495Z',
          clientName: '',
          clientJobId: '',
          fileName: '',
          jobStatusDescription: '',
          username: '',
          salesPersonName: '',
          customerName: '',
          temp: '',
          style: '',
          projectCode: '',
          teamCode: '',
          schoolName: '',
          ground: '',
          gender: '',
          fileInwardMode: '',
          status: true,
          dateofUpload: '',
          priority: '',
          clientSalesPerson: '',
          poNo: '',
          dateofDelivery: '',
          division: '',
          uploadedBy: 0,
        },
      ],
      createdBy: 0,
      poDate: '2023-05-12T07:08:03.495Z',
      ccId: 0,
      ccEmailId: '',
      dateofDelivery: '2023-05-12T07:08:03.495Z',
      getAllValues: this.dataSource.data,
    };
    this.http
      .post<any>(environment.apiURL + 'JobOrder/DirectOrder', senddata)
      .subscribe((multiorderdataconvert) => {
        // this.showSnackBar('Converted successfully');
        this.dialogRef.close();
      });
  }

  updatefilename(event: Event, i, row) {
    let getfile = (event.target as HTMLInputElement).value;
    delete row.FileName;
    row = { FileName: getfile, ...row };
    let data = this.dataSource.data.map((person, index) =>
      index === i ? row : person
    );
    this.dataSource = new MatTableDataSource(data);
  }

  // showSnackBar(message: string): void {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 3000, // Duration in milliseconds
  //     verticalPosition: 'top', // Position of the snack bar
  //   });
  // }


  close(){
    this.dialogRef.close();
  }
}
