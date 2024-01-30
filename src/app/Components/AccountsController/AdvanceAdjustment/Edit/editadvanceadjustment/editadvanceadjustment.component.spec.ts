import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadvanceadjustmentComponent } from './editadvanceadjustment.component';

describe('EditadvanceadjustmentComponent', () => {
  let component: EditadvanceadjustmentComponent;
  let fixture: ComponentFixture<EditadvanceadjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditadvanceadjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditadvanceadjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
