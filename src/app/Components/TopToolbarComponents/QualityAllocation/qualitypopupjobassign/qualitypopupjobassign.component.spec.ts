import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitypopupjobassignComponent } from './qualitypopupjobassign.component';

describe('QualitypopupjobassignComponent', () => {
  let component: QualitypopupjobassignComponent;
  let fixture: ComponentFixture<QualitypopupjobassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitypopupjobassignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitypopupjobassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
