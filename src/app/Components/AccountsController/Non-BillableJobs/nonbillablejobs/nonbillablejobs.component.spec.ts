import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonbillablejobsComponent } from './nonbillablejobs.component';

describe('NonbillablejobsComponent', () => {
  let component: NonbillablejobsComponent;
  let fixture: ComponentFixture<NonbillablejobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonbillablejobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonbillablejobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
