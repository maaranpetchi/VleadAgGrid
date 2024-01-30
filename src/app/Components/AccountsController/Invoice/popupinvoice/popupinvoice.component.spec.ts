import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupinvoiceComponent } from './popupinvoice.component';

describe('PopupinvoiceComponent', () => {
  let component: PopupinvoiceComponent;
  let fixture: ComponentFixture<PopupinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupinvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
