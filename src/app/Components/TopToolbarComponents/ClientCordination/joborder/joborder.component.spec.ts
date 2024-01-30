import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoborderComponent } from './joborder.component';

describe('JoborderComponent', () => {
  let component: JoborderComponent;
  let fixture: ComponentFixture<JoborderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoborderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoborderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
