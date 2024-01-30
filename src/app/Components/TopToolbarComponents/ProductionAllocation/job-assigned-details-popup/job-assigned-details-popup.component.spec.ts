import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAssignedDetailsPopupComponent } from './job-assigned-details-popup.component';

describe('JobAssignedDetailsPopupComponent', () => {
  let component: JobAssignedDetailsPopupComponent;
  let fixture: ComponentFixture<JobAssignedDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAssignedDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAssignedDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
