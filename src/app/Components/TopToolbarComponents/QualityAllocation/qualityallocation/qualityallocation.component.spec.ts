import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityallocationComponent } from './qualityallocation.component';

describe('QualityallocationComponent', () => {
  let component: QualityallocationComponent;
  let fixture: ComponentFixture<QualityallocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityallocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
