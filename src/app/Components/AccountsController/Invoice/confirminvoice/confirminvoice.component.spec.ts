import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirminvoiceComponent } from './confirminvoice.component';

describe('ConfirminvoiceComponent', () => {
  let component: ConfirminvoiceComponent;
  let fixture: ComponentFixture<ConfirminvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirminvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirminvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
