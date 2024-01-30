import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFilesLocationMasterIndexComponent } from './job-files-location-master-index.component';

describe('JobFilesLocationMasterIndexComponent', () => {
  let component: JobFilesLocationMasterIndexComponent;
  let fixture: ComponentFixture<JobFilesLocationMasterIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFilesLocationMasterIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobFilesLocationMasterIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
