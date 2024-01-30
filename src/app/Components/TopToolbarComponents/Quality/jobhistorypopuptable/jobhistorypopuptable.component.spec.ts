import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobhistorypopuptableComponent } from './jobhistorypopuptable.component';

describe('JobhistorypopuptableComponent', () => {
  let component: JobhistorypopuptableComponent;
  let fixture: ComponentFixture<JobhistorypopuptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobhistorypopuptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobhistorypopuptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
