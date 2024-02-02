import { Component, Injector, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SharedService } from 'src/app/Services/SharedService/shared.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-startrendering',
    template: `<a   style="color: skyblue;cursor:pointer" (click)="changeWorkflow(params.data,'End')"> End</a>`,

    styles: []
})
export class EndRenderingComponent implements ICellRendererAngularComp {
    iconClicked: boolean=false;
    constructor(private loginservice: LoginService, private http: HttpClient, private spinnerService: SpinnerService, private sharedDataService: SharedService) { }

    gettingData: any;
    componentParent: any;
    params: ICellRendererParams<any, any, any>;
    private dialog: MatDialog;

    // gets called once before the renderer is used
    agInit(params: ICellRendererParams): void {
        this.gettingData = params.data;
        console.log(this.gettingData, "GettingData");
        this.params = params;

    }
    refresh(params: ICellRendererParams) {
        return false;
    }
    changeWorkflow(data, worktype) {
        this.iconClicked = true;

        this.sharedDataService.selectDivision$.subscribe((selectdivision) => {
          
            if (this.iconClicked) {

            if (selectdivision === 0) {
                Swal.fire(
                    'Alert!',
                    'Select Division!',
                    'info'
                ).then((response) => {
                    if (response.isConfirmed) {
                        // this.ngOnInit();
                    }
                })
            }
            else {
                const processMovement =
                {
                    "wftid": 0,
                    "wfmid": 0,
                    "workType": worktype,
                    "status": "",
                    "remarks": "",
                    "employeeId": this.loginservice.getUsername(),
                    "copyFiles": true,
                    "errorCategoryId": 0,
                    "value": 0,
                    "scopeId": selectdivision,
                    "Scope": '',
                    "processId": localStorage.getItem('processId'),
                    "stitchCount": 0,
                    "orderId": 0,
                    "isClientOrder": 0,
                    "statusId": 1,
                    "sourcePath": "",
                    "dynamicFolderPath": "",
                    "folderPath": "",
                    "fileName": "",
                    "fileCount": 0,
                    "orignalPath": "",
                    "orignalDynamicPath": "",
                    "jobId": "",
                    "isProcessWorkFlowTranInserted": 0,
                    "isCopyFiles": 0,
                    "pid": 0,
                    "fakeProcessId": 0,
                    "fakeStatusId": 0,
                    "fakeDynamicFolderPath": "",
                    "jobFileName": "",
                    "files": [],
                    "commentsToClient": "",
                    "tranFileUploadPath": "",
                    "SelectedRows": [
                        { ...data, stitchCount: 0, files: [], Remarks: '', WorkType: '', FolderPath: '', SourcePath: '', JobFileName: '', OrignalPath: '', SelectedRows: [], CommentsToClient: '', DynamicFolderPath: '', OrignalDynamicPath: '', TranFileUploadPath: '', FakeDynamicFolderPath: '' }
                    ]
                };
                const fd = new FormData();
                fd.append('data', JSON.stringify(processMovement));

                const headers = new HttpHeaders();
                headers.append('Content-Type', 'multipart/form-data');
                this.spinnerService.requestStarted();
                this.http.post<any>(environment.apiURL + `Workflow/processMovement`, fd, { headers }).subscribe((response) => {
                    this.spinnerService.requestEnded();
                    if (response.success == true) {
                        Swal.fire('Done', response.message, 'success').then((response) => {
                            if (response.isConfirmed) {
                                this.sharedDataService.triggerRefresh();
                            }
                        })
                    }
                    else {
                        Swal.fire('info', 'Job Not Moved', 'info').then((response) => {
                            if (response.isConfirmed) {
                                this.sharedDataService.triggerRefresh();
                            }
                        })
                    }
                })
            }
            this.iconClicked = false;

        }
        });
    }
}