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
    template: `<a *ngIf="params.data.workStatus !== 'Working'"  style="color: skyblue;cursor:pointer" (click)="changeWorkflow(params.data,'Start')"> Start</a>`,

    styles: []
})
export class StartRenderingComponent implements ICellRendererAngularComp {
    constructor(private loginservice: LoginService, private http: HttpClient, private spinnerService: SpinnerService,private sharedDataService:SharedService) { }

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
        if (worktype === 'Start') {
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
                "scopeId": "",
                "Scope": [],
                "processId": this.gettingData.processId,
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
                this.sharedDataService.triggerRefresh();
            })
        }
        else {
            console.log("Else block");

        }
    }

 
}