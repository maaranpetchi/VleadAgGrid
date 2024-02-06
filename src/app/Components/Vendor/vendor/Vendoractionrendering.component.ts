import { Component, Injector, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import Swal from 'sweetalert2';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { catchError } from 'rxjs';
import { UpdatevendorComponent } from '../updatevendor/updatevendor.component';

@Component({
    selector: 'app-vendorrenderer',
    template: `
    <span class="total-value-renderer">
      <i class="fa fa-edit" matTooltip="edit" style="cursor: pointer;color:green" (click)=" openclientorder(params)"></i>
    </span>
  `,
    styles: [``]
})
export class VendoractionrenderingComponent implements ICellRendererAngularComp {

    gettingData: any;
    componentParent: any;
    params: ICellRendererParams<any, any, any>;
    private dialog: MatDialog;

    constructor(private sharedService: SharedService, private injector: Injector, private spinnerService: SpinnerService, private http: HttpClient, private loginservice: LoginService, private sharedDataService: SharedService) { }
    iconClicked: boolean = false;

    // gets called once before the renderer is used
    agInit(params: ICellRendererParams): void {
        this.gettingData = params.data;
        console.log(this.gettingData, "GettingData");
        this.params = params;
        this.dialog = this.injector.get(MatDialog);


    }


    openclientorder(params) {
        const dialogRef = this.dialog.open(UpdatevendorComponent, {
            data: {
                type: "edit",
                data: params.data
            },
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    console.log("After vendor closing");
                    this.sharedDataService.triggerRefresh();

                }
            }
        });
    }
    refresh(params: ICellRendererParams) {
        return false;
    }
    selectedJobs: any[] = [];
    selectedQuery: any[] = [];




}