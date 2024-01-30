import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMultiStepFormComponent } from './sales-multi-step-form.component';

describe('SalesMultiStepFormComponent', () => {
  let component: SalesMultiStepFormComponent;
  let fixture: ComponentFixture<SalesMultiStepFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesMultiStepFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesMultiStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
