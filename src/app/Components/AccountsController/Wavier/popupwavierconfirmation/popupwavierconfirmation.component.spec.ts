import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupwavierconfirmationComponent } from './popupwavierconfirmation.component';

describe('PopupwavierconfirmationComponent', () => {
  let component: PopupwavierconfirmationComponent;
  let fixture: ComponentFixture<PopupwavierconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupwavierconfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupwavierconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
