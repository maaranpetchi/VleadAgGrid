import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaddemployeecontrollerComponent } from './editaddemployeecontroller.component';

describe('EditaddemployeecontrollerComponent', () => {
  let component: EditaddemployeecontrollerComponent;
  let fixture: ComponentFixture<EditaddemployeecontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaddemployeecontrollerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaddemployeecontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
