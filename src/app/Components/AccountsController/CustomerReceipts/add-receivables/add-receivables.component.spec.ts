import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceivablesComponent } from './add-receivables.component';

describe('AddReceivablesComponent', () => {
  let component: AddReceivablesComponent;
  let fixture: ComponentFixture<AddReceivablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReceivablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
