import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCategorypopupComponent } from './job-categorypopup.component';

describe('JobCategorypopupComponent', () => {
  let component: JobCategorypopupComponent;
  let fixture: ComponentFixture<JobCategorypopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCategorypopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCategorypopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
