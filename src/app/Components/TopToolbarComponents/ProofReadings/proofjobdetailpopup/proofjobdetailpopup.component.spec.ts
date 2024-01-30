import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofjobdetailpopupComponent } from './proofjobdetailpopup.component';

describe('ProofjobdetailpopupComponent', () => {
  let component: ProofjobdetailpopupComponent;
  let fixture: ComponentFixture<ProofjobdetailpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofjobdetailpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofjobdetailpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
