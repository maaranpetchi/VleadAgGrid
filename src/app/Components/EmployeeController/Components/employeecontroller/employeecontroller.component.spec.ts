import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeecontrollerComponent } from './employeecontroller.component';

describe('EmployeecontrollerComponent', () => {
  let component: EmployeecontrollerComponent;
  let fixture: ComponentFixture<EmployeecontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeecontrollerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeecontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
