import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSalesmappingComponent } from './customer-salesmapping.component';

describe('CustomerSalesmappingComponent', () => {
  let component: CustomerSalesmappingComponent;
  let fixture: ComponentFixture<CustomerSalesmappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSalesmappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSalesmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
