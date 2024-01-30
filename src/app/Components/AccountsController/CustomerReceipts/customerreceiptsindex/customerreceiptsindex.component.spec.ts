import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerreceiptsindexComponent } from './customerreceiptsindex.component';

describe('CustomerreceiptsindexComponent', () => {
  let component: CustomerreceiptsindexComponent;
  let fixture: ComponentFixture<CustomerreceiptsindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerreceiptsindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerreceiptsindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
