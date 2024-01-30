import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsSewPopComponent } from './job-details-sew-pop.component';

describe('JobDetailsSewPopComponent', () => {
  let component: JobDetailsSewPopComponent;
  let fixture: ComponentFixture<JobDetailsSewPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailsSewPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetailsSewPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
