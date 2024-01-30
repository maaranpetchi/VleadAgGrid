import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAllocatedPopupComponent } from './production-allocated-popup.component';

describe('ProductionAllocatedPopupComponent', () => {
  let component: ProductionAllocatedPopupComponent;
  let fixture: ComponentFixture<ProductionAllocatedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionAllocatedPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAllocatedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
