import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExchangeRateComponent } from './update-exchange-rate.component';

describe('UpdateExchangeRateComponent', () => {
  let component: UpdateExchangeRateComponent;
  let fixture: ComponentFixture<UpdateExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExchangeRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
