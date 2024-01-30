import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditemployeevsdivisionComponent } from './addeditemployeevsdivision.component';

describe('AddeditemployeevsdivisionComponent', () => {
  let component: AddeditemployeevsdivisionComponent;
  let fixture: ComponentFixture<AddeditemployeevsdivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditemployeevsdivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditemployeevsdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
