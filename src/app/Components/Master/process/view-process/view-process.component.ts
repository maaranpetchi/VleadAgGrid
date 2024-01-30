import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-process',
  templateUrl: './view-process.component.html',
  styleUrls: ['./view-process.component.scss']
})
export class ViewProcessComponent implements OnInit{
responseData: any;
constructor(
  private http: HttpClient,
  private route: Router
){}

  ngOnInit(): void {
    
    const data = history.state.data;
    
    this.responseData = history.state.data;
  }

  onCancel(){
    this.route.navigate(["topnavbar/processMaster"]);
  }
  onUpdate(){
    this.route.navigate(["topnavbar/process-addEdit"]);
  }
}
