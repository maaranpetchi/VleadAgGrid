import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceadjustmentComponent } from './advanceadjustment.component';

describe('AdvanceadjustmentComponent', () => {
  let component: AdvanceadjustmentComponent;
  let fixture: ComponentFixture<AdvanceadjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceadjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceadjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
