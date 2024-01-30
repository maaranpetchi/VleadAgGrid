import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsClientIndexComponent } from './job-details-client-index.component';

describe('JobDetailsClientIndexComponent', () => {
  let component: JobDetailsClientIndexComponent;
  let fixture: ComponentFixture<JobDetailsClientIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailsClientIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetailsClientIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
