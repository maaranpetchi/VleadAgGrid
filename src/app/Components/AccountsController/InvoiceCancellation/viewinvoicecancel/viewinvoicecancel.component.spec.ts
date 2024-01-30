import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinvoicecancelComponent } from './viewinvoicecancel.component';

describe('ViewinvoicecancelComponent', () => {
  let component: ViewinvoicecancelComponent;
  let fixture: ComponentFixture<ViewinvoicecancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewinvoicecancelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewinvoicecancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
