import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicecancelleddetailsComponent } from './invoicecancelleddetails.component';

describe('InvoicecancelleddetailsComponent', () => {
  let component: InvoicecancelleddetailsComponent;
  let fixture: ComponentFixture<InvoicecancelleddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicecancelleddetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicecancelleddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
