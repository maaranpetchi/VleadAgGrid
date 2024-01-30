import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCategoryComponent } from './error-category.component';

describe('ErrorCategoryComponent', () => {
  let component: ErrorCategoryComponent;
  let fixture: ComponentFixture<ErrorCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
