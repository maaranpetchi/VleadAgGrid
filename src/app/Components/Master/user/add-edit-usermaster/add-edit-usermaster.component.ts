import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserMasterService } from 'src/app/Services/Master/user-master.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-add-edit-usermaster',
  templateUrl: './add-edit-usermaster.component.html',
  styleUrls: ['./add-edit-usermaster.component.scss']
})

 
export class AddEditUsermasterComponent implements OnInit {

  selectedAccessNameOption:string;
  AccessNamedropdownvalues:any[] = [];
  isInputDisabled = false;
  hide= true;
  selectedRole:any;
  isEmployee: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  employees:any  = {};
  selectedCustomerName: string;
  customers: any[] = [];
  employeeName:string=''
  selectedMenu:any[] = [];
  selectedMenuArray:any[] = [];
  constructor(
    private builder: FormBuilder,
    private _service:UserMasterService,
    private _empService: UserMasterService,
    private http:HttpClient,
    private _coreService: CoreService,
    private loginservice: LoginService,
    private spinnerService: SpinnerService,

    public dialogRef: MatDialogRef<AddEditUsermasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ) {
      this.employeeName= this.data.userTypeDesc;
  }




  ngOnInit(): void {
    this.getAllUsersById(this.data.id);
    
    
  }


  getAllUsersById(data:any){
    this._service.getUserByEmployeeId(data).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe(
      (data: any) => {
        this.employees = data;
        this.userRegistrationForm.patchValue(data);
        if(this.employees.roles === "Employee"){
          this.showAdminData()
        }
        if(this.employees.roles === "User"){
          this.showUserData()
        } 
      },
      (error: any) => {
        console.log(error);
        
      }
    );
    
  }
  userRegistrationForm = this.builder.group({
    userType:'',
    userTypeDesc: '',
    username:'',
    password:'',
    roles:'',
    checkboxMenu:''
  })
  showAdminData(){
    this.isAdmin = true;
    this.isEmployee = false;
    this.selectedMenu=[]
    this.selectedMenuArray=[]
  }
  showUserData(){
    this.isAdmin = false;
    this.isEmployee = true;
    this.selectedMenu=this.employees.menuAccess.split('|').filter(x=>x!='').map(x=>+x);
    this.selectedMenuArray=[]
    console.log("split",this.selectedMenu)
    this.getMenuDetails();
  }
  menus:any[] = []
  getMenuDetails(){
    console.log('MenuDetails')
    this._empService.getMenu().subscribe(
    (data: any) => {
      this.menus = data;
   },
  (error: any) => {
  }
  );
}

keepGoing = true;
getSubMenuPadding(parentId: any , padding:any) {
  var paddingLeft = padding;
  if (parentId != null) {
      paddingLeft = paddingLeft + 20;
      let t :any= {};
      this.menus.forEach( (item) => {
          if (this.keepGoing) {
              var id = '|' + parentId + '|';
              if (item.Id == id) {
                  t = item;
                  this.keepGoing = false;
              }
          }
      });
      this.keepGoing = true;
      if (t.ParentId != null && t.ParentId != undefined) {
          var res =this.getSubMenuPadding(t.ParentId, paddingLeft);
          return res;
      }
  }
  var result = paddingLeft + 'px';

  return {'padding-left':result}
}

onMenuSelection =  (event:any ,id) => {
  this.selectedMenuArray=this.selectedMenu;
    var idx = this.selectedMenuArray.indexOf(id);
    if (idx > -1) {
        this.selectedMenuArray.splice(idx, 1);
    }
    else {
        this.selectedMenuArray.push(id);
    }
    this.selectedMenu = this.selectedMenuArray;
};


onCancel():void {
    this.dialogRef.close();
}
  onFormSubmit(id:any){
    let str:string = this.selectedMenu.reduce((str,item)=>{
      return str+"|" + item+"|,";
    },"")
    let updateUserData = {
        menuAccess: str.substring(0,str.length-1),
          id: this.employees.id,
          username: this.userRegistrationForm.value.username,
          roles: this.userRegistrationForm.value.roles,
          password:this.userRegistrationForm.value.password,
          userType:this.userRegistrationForm.value.userType,
          userTypeDesc:this.userRegistrationForm.value.userTypeDesc,
          checkboxMenu:this.userRegistrationForm.value.checkboxMenu,
          customerId: '',
          isDeleted: false,
          createdBy: this.loginservice.getUsername(),
          createdDate: new Date().toISOString(),
          customer: null,
          employee: null
        }
        //  This is for the Save Api Call.
    this.http.post(environment.apiURL+`User/SaveUser?actionType=2`, updateUserData).pipe(catchError((error) => {
      // this.http.post(environment.apiURL+`User/SaveUser?actionType=${id}`, updateUserData).pipe(catchError((error) => {
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!', 'An error occurred while processing your request', 'error');
    })).subscribe({
      next: (data: any) =>{
        Swal.fire('Done','User detail added!','success').then((result)=>{
          if(result.isConfirmed){
            this.dialogRef.close();
          }
        });
      },
      error: (err: any) => {
        throw new Error('API Error', err);
      },
    })
  }
}
