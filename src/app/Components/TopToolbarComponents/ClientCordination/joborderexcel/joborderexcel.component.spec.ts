import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoborderexcelComponent } from './joborderexcel.component';

describe('JoborderexcelComponent', () => {
  let component: JoborderexcelComponent;
  let fixture: ComponentFixture<JoborderexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoborderexcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoborderexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
