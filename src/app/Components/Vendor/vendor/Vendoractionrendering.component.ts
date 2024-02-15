import { Component, Injector, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import Swal from 'sweetalert2';

import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { catchError } from 'rxjs';
import { UpdatevendorComponent } from '../updatevendor/updatevendor.component';
import { EditadvanceadjustmentComponent } from '../../AccountsController/AdvanceAdjustment/Edit/editadvanceadjustment/editadvanceadjustment.component';
import { Router } from '@angular/router';
import { CustomerSalesApprovalService } from 'src/app/Services/sales/CustomerSalesApproval/customer-sales-approval.service';

@Component({
    selector: 'app-vendorrenderer',
    template: `
    <span class="total-value-renderer">
      <i class="fa fa-edit" matTooltip="edit" style="cursor: pointer;color:green" (click)=" EditButton(params)"></i>
    </span>
  `,
    styles: [``]
})
export class VendoractionrenderingComponent implements ICellRendererAngularComp {

    gettingData: any;
    componentParent: any;
    params: ICellRendererParams<any, any, any>;
    private dialog: MatDialog;
    Context: any;
    AdvanceAdjustmentContext: any;
    AdvanceAdjustmentSelectedDepartment: any;

    constructor(private sharedService: SharedService, private injector: Injector, private spinnerService: SpinnerService, private http: HttpClient, private loginservice: LoginService, private sharedDataService: SharedService,
        private router: Router,
        private SharedCustomerResult:CustomerSalesApprovalService
    ) { }
    iconClicked: boolean = false;

    // gets called once before the renderer is used
    agInit(params: ICellRendererParams): void {
        this.gettingData = params.data;
        console.log(this.gettingData, "GettingData");
        this.params = params;
        this.dialog = this.injector.get(MatDialog);


    }



    EditButton(params) {
        this.iconClicked = true;
        let viewData = params.data;
        console.log(viewData, "ViewData");
        this.Context = params.context;
        console.log(this.Context, "params");
        this.AdvanceAdjustmentContext = params.context.context;
        console.log(this.AdvanceAdjustmentContext, "AdvanceAdjustmentContext");
        this.AdvanceAdjustmentSelectedDepartment = params.context.department

        ///EmployeeVSDivision
        if (this.Context == 'vendor') {
            this.openclientorder(params)
        }
        ///AdvanceAdjustment
        if (this.AdvanceAdjustmentContext == 'advanceadjustment') {
            this.editAdvanceAdjustment(params)
        }
        ///CustomerSalesApproval
        if (this.Context == 'customersalesapproval') {
            this.editCustomerSalesApproval(params)
        }


    }
    ///EmployeeVSDivision

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

    ///AdvanceAdjustment


    editAdvanceAdjustment(params) {
        const dialogRef: MatDialogRef<EditadvanceadjustmentComponent> = this.dialog.open(EditadvanceadjustmentComponent, {
            width: '70vw',
            height: '90vh',
            data: {
                id: params.data.id,
                availableAdvance: params.data.availableAdvance,
                department: this.AdvanceAdjustmentSelectedDepartment,
            },
        });
    }

    ///CustomerSalesApproval
    editCustomerSalesApproval(params) {

        console.log(params.data.id ,"Idgetting");
        
        let payload = {
            "id": params.data.id,
        }
        this.http.get<any>(environment.apiURL + `Customer/getAppAllCustomerContactDetails?customerId=${params.data.id}`).subscribe(results => {
            this.SharedCustomerResult.setData(results);
            this.router.navigate(['/topnavbar/multistepform']);
        });
    }
}