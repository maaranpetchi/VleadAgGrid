import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionallocationComponent } from './productionallocation.component';

describe('ProductionallocationComponent', () => {
  let component: ProductionallocationComponent;
  let fixture: ComponentFixture<ProductionallocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionallocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
