import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBillingCycleComponent } from './index-billing-cycle.component';

describe('IndexBillingCycleComponent', () => {
  let component: IndexBillingCycleComponent;
  let fixture: ComponentFixture<IndexBillingCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBillingCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexBillingCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
