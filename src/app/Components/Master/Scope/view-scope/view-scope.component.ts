import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-scope',
  templateUrl: './view-scope.component.html',
  styleUrls: ['./view-scope.component.scss']
})
export class ViewScopeComponent  implements OnInit {
  responseData: any;
  data:any

  constructor(
    private router: Router,) {}
  ngOnInit(): void {
    const data = history.state.data;
    
    this.responseData = history.state.data;

  }
  onUpdate(){
    this.router.navigate(["topnavbar/master-scope/edit"]);
  }
  onCancel() {
    this.router.navigate(['/topnavbar/master-scope']);
  }

}