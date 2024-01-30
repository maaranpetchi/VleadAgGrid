import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationPopupComponent } from './quotation-popup.component';

describe('QuotationPopupComponent', () => {
  let component: QuotationPopupComponent;
  let fixture: ComponentFixture<QuotationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
