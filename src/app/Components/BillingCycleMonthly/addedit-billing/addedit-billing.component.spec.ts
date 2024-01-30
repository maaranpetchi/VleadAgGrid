import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditBillingComponent } from './addedit-billing.component';

describe('AddeditBillingComponent', () => {
  let component: AddeditBillingComponent;
  let fixture: ComponentFixture<AddeditBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
