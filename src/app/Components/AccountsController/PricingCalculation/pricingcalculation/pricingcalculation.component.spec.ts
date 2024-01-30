import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingcalculationComponent } from './pricingcalculation.component';

describe('PricingcalculationComponent', () => {
  let component: PricingcalculationComponent;
  let fixture: ComponentFixture<PricingcalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingcalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingcalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
