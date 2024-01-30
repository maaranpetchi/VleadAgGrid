import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceIndexComponent } from './attendance-index.component';

describe('AttendanceIndexComponent', () => {
  let component: AttendanceIndexComponent;
  let fixture: ComponentFixture<AttendanceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
