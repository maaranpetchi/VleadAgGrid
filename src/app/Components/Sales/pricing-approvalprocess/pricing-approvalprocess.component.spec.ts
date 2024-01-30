import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingApprovalprocessComponent } from './pricing-approvalprocess.component';

describe('PricingApprovalprocessComponent', () => {
  let component: PricingApprovalprocessComponent;
  let fixture: ComponentFixture<PricingApprovalprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingApprovalprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingApprovalprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
