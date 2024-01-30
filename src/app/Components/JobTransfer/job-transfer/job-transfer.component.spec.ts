import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTransferComponent } from './job-transfer.component';

describe('JobTransferComponent', () => {
  let component: JobTransferComponent;
  let fixture: ComponentFixture<JobTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
