import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdjobpopupComponent } from './prodjobpopup.component';

describe('ProdjobpopupComponent', () => {
  let component: ProdjobpopupComponent;
  let fixture: ComponentFixture<ProdjobpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdjobpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdjobpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
