import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchStatusComponent } from './bench-status.component';

describe('BenchStatusComponent', () => {
  let component: BenchStatusComponent;
  let fixture: ComponentFixture<BenchStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenchStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
