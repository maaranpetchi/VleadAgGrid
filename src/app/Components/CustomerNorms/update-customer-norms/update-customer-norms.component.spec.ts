import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerNormsComponent } from './update-customer-norms.component';

describe('UpdateCustomerNormsComponent', () => {
  let component: UpdateCustomerNormsComponent;
  let fixture: ComponentFixture<UpdateCustomerNormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCustomerNormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCustomerNormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
