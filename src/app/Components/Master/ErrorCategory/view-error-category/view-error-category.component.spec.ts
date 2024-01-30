import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewErrorCategoryComponent } from './view-error-category.component';

describe('ViewErrorCategoryComponent', () => {
  let component: ViewErrorCategoryComponent;
  let fixture: ComponentFixture<ViewErrorCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewErrorCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewErrorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
