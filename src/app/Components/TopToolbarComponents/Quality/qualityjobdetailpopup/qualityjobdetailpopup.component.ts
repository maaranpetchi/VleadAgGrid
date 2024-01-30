import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qualityjobdetailpopup',
  templateUrl: './qualityjobdetailpopup.component.html',
  styleUrls: ['./qualityjobdetailpopup.component.scss']
})
export class QualityjobdetailpopupComponent  implements OnInit{

  restApiData: any[];
  isPopupOpen: boolean = false;
  displayedColumns: string[] = [
    'movedFrom',
    'movedTo',
    'movedDate',
    'movedBy',
    'movedToAgain',
    'remarks'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const apiUrl = 'YOUR_REST_API_URL';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.restApiData = response;
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }

  closepop(){
    this.isPopupOpen = true;
  }
}