import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCustomerSalesApprovalComponent } from './index-customer-sales-approval.component';

describe('IndexCustomerSalesApprovalComponent', () => {
  let component: IndexCustomerSalesApprovalComponent;
  let fixture: ComponentFixture<IndexCustomerSalesApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCustomerSalesApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCustomerSalesApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
