import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerNormsComponent } from './add-customer-norms.component';

describe('AddCustomerNormsComponent', () => {
  let component: AddCustomerNormsComponent;
  let fixture: ComponentFixture<AddCustomerNormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerNormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerNormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
