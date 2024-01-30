import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitytableComponent } from './qualitytable.component';

describe('QualitytableComponent', () => {
  let component: QualitytableComponent;
  let fixture: ComponentFixture<QualitytableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitytableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
