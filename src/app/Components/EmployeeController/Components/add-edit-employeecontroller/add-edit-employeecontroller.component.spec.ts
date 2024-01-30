import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmployeecontrollerComponent } from './add-edit-employeecontroller.component';

describe('AddEditEmployeecontrollerComponent', () => {
  let component: AddEditEmployeecontrollerComponent;
  let fixture: ComponentFixture<AddEditEmployeecontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEmployeecontrollerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEmployeecontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
