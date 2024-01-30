import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionQuotationComponent } from './production-quotation.component';

describe('ProductionQuotationComponent', () => {
  let component: ProductionQuotationComponent;
  let fixture: ComponentFixture<ProductionQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionQuotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
