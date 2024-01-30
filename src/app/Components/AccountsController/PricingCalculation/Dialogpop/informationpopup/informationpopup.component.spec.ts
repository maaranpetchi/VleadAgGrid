import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationpopupComponent } from './informationpopup.component';

describe('InformationpopupComponent', () => {
  let component: InformationpopupComponent;
  let fixture: ComponentFixture<InformationpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
