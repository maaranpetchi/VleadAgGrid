import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/Environments/environment';
import { Router } from '@angular/router';
import { ItassetsService } from 'src/app/Services/ITAssets/itassets.service';

@Component({
  selector: 'app-it-assetindex',
  templateUrl: './it-assetindex.component.html',
  styleUrls: ['./it-assetindex.component.scss']
})
export class ItAssetindexComponent implements OnInit {
  apiResponseData: any;
  ngOnInit(): void {
    this.fetchtableData();
  }
  constructor(private router: Router, private _coreService: CoreService, private sharedDataService: ItassetsService, private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private _dialog: MatDialog, private spinnerService: SpinnerService) { }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['baynumber', 'location', 'pcname', 'pctype', 'roll', 'workingstatus', 'Action'];

  fetchtableData() {
    this.http.get<any>(environment.apiURL + `ITAsset/nGetTableITAsset`).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.titDetailList);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openvendor() {
    this.router.navigate(['/topnavbar/addITAsset']);
  }

  openEditForm(id: number) {
    let payload = {
      "id": id,
    }
    this.http.post<any>(environment.apiURL + `ITAsset/nGetEditedITAsset`,payload).subscribe(results => {
      this.sharedDataService.setData({ type: 'EDIT', data: results });
      this.sharedDataService.shouldFetchData = true;

      this.router.navigate(['/topnavbar/addITAsset']);
    });
    
  }

  deleteEmployee(id: number) {

    let payload = {
      "id": id
    }
    this.http.post<any>(environment.apiURL + `ITAsset/nDeleteITHAsset`, payload).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.fetchtableData();
      }
    });
  }


  openViewForm(data: any) {
    // const dialogRef = this._dialog.open(ViewchecklistComponent, {
    //   height: '60vh',
    //   width: '50vw',
    //   data
    // });

    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.fetchtableData();
    //     }
    //   },
    // });
  }
}
