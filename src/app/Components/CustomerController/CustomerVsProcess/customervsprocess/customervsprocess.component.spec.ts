import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomervsprocessComponent } from './customervsprocess.component';

describe('CustomervsprocessComponent', () => {
  let component: CustomervsprocessComponent;
  let fixture: ComponentFixture<CustomervsprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomervsprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomervsprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
