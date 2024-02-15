import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersalesRenderingComponent } from './customersales-rendering.component';

describe('CustomersalesRenderingComponent', () => {
  let component: CustomersalesRenderingComponent;
  let fixture: ComponentFixture<CustomersalesRenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersalesRenderingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersalesRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
