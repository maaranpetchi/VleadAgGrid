import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVSEmployeeComponent } from './customer-vsemployee.component';

describe('CustomerVSEmployeeComponent', () => {
  let component: CustomerVSEmployeeComponent;
  let fixture: ComponentFixture<CustomerVSEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerVSEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerVSEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
