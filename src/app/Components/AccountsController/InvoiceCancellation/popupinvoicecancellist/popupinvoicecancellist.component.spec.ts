import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupinvoicecancellistComponent } from './popupinvoicecancellist.component';

describe('PopupinvoicecancellistComponent', () => {
  let component: PopupinvoicecancellistComponent;
  let fixture: ComponentFixture<PopupinvoicecancellistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupinvoicecancellistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupinvoicecancellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
