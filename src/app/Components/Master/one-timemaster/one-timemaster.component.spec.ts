import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimemasterComponent } from './one-timemaster.component';

describe('OneTimemasterComponent', () => {
  let component: OneTimemasterComponent;
  let fixture: ComponentFixture<OneTimemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneTimemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
