import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomerVSEmployeeComponent } from './add-edit-customer-vsemployee.component';

describe('AddEditCustomerVSEmployeeComponent', () => {
  let component: AddEditCustomerVSEmployeeComponent;
  let fixture: ComponentFixture<AddEditCustomerVSEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomerVSEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomerVSEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
