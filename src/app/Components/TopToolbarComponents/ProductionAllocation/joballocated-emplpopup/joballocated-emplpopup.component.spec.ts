import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoballocatedEmplpopupComponent } from './joballocated-emplpopup.component';

describe('JoballocatedEmplpopupComponent', () => {
  let component: JoballocatedEmplpopupComponent;
  let fixture: ComponentFixture<JoballocatedEmplpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoballocatedEmplpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoballocatedEmplpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
