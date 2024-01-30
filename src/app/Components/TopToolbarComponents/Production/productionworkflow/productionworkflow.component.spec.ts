import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionworkflowComponent } from './productionworkflow.component';

describe('ProductionworkflowComponent', () => {
  let component: ProductionworkflowComponent;
  let fixture: ComponentFixture<ProductionworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionworkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
