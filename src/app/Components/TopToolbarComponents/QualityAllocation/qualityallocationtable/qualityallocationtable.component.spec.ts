import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityallocationtableComponent } from './qualityallocationtable.component';

describe('QualityallocationtableComponent', () => {
  let component: QualityallocationtableComponent;
  let fixture: ComponentFixture<QualityallocationtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityallocationtableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityallocationtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
