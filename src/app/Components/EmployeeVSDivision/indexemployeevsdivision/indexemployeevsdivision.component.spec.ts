import { ComponentFixture, TestBed } from '@angular/core/testing';

import { indexemployeevsdivisionComponent } from './indexemployeevsdivision.component'

describe('indexemployeevsdivisionComponent', () => {
  let component: indexemployeevsdivisionComponent;
  let fixture: ComponentFixture<indexemployeevsdivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ indexemployeevsdivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(indexemployeevsdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
