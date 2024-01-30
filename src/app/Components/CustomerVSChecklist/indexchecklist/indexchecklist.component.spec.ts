import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexchecklistComponent } from './indexchecklist.component';

describe('IndexchecklistComponent', () => {
  let component: IndexchecklistComponent;
  let fixture: ComponentFixture<IndexchecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexchecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
