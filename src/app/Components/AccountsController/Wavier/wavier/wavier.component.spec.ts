import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WavierComponent } from './wavier.component';

describe('WavierComponent', () => {
  let component: WavierComponent;
  let fixture: ComponentFixture<WavierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WavierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WavierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
