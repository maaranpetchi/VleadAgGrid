import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductiontableComponent } from './productiontable.component';

describe('ProductiontableComponent', () => {
  let component: ProductiontableComponent;
  let fixture: ComponentFixture<ProductiontableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductiontableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
