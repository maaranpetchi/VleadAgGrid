import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePopupTableComponent } from './employee-popup-table.component';

describe('EmployeePopupTableComponent', () => {
  let component: EmployeePopupTableComponent;
  let fixture: ComponentFixture<EmployeePopupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePopupTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePopupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
