import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionallocationtableComponent } from './productionallocationtable.component';

describe('ProductionallocationtableComponent', () => {
  let component: ProductionallocationtableComponent;
  let fixture: ComponentFixture<ProductionallocationtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionallocationtableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionallocationtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
