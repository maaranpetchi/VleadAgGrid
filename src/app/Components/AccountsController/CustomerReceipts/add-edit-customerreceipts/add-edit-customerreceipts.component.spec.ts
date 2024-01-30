import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomerreceiptsComponent } from './add-edit-customerreceipts.component';

describe('AddEditCustomerreceiptsComponent', () => {
  let component: AddEditCustomerreceiptsComponent;
  let fixture: ComponentFixture<AddEditCustomerreceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomerreceiptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomerreceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
