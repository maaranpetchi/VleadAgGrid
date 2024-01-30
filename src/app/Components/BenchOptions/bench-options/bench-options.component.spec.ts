import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchOptionsComponent } from './bench-options.component';

describe('BenchOptionsComponent', () => {
  let component: BenchOptionsComponent;
  let fixture: ComponentFixture<BenchOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenchOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
