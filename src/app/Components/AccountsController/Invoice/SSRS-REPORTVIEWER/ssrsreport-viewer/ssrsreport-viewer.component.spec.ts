import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSRSReportViewerComponent } from './ssrsreport-viewer.component';

describe('SSRSReportViewerComponent', () => {
  let component: SSRSReportViewerComponent;
  let fixture: ComponentFixture<SSRSReportViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSRSReportViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SSRSReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
