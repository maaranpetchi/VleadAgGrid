import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-error-category',
  templateUrl: './view-error-category.component.html',
  styleUrls: ['./view-error-category.component.scss']
})
export class ViewErrorCategoryComponent implements OnInit{


  responseData: any;

  constructor(private route:Router){}
  ngOnInit(): void {
    
    const data = history.state.data;
    
    this.responseData = history.state.data;
  }

  onCancel(){
    this.route.navigate(["topnavbar/errorCategory"]);
  }
  onUpdate(){
    this.route.navigate(["topnavbar/error-Categoryedit"]);
  }
}
