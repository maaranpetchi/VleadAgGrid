import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditErrorcategoryComponent } from './edit-errorcategory.component';

describe('EditErrorcategoryComponent', () => {
  let component: EditErrorcategoryComponent;
  let fixture: ComponentFixture<EditErrorcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditErrorcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditErrorcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
