import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicecancellationComponent } from './invoicecancellation.component';

describe('InvoicecancellationComponent', () => {
  let component: InvoicecancellationComponent;
  let fixture: ComponentFixture<InvoicecancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicecancellationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicecancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
