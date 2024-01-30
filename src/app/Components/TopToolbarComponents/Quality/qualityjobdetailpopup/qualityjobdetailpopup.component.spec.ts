import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityjobdetailpopupComponent } from './qualityjobdetailpopup.component';

describe('QualityjobdetailpopupComponent', () => {
  let component: QualityjobdetailpopupComponent;
  let fixture: ComponentFixture<QualityjobdetailpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityjobdetailpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityjobdetailpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
