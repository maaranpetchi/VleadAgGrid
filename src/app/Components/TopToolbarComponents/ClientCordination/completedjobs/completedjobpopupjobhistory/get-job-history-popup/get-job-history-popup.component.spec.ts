import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetJobHistoryPopupComponent } from './get-job-history-popup.component';

describe('GetJobHistoryPopupComponent', () => {
  let component: GetJobHistoryPopupComponent;
  let fixture: ComponentFixture<GetJobHistoryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetJobHistoryPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetJobHistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
