import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobhistoryDetailsComponent } from './jobhistory-details.component';

describe('JobhistoryDetailsComponent', () => {
  let component: JobhistoryDetailsComponent;
  let fixture: ComponentFixture<JobhistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobhistoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobhistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
