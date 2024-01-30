import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddErrorcategoryComponent } from './add-errorcategory.component';

describe('AddErrorcategoryComponent', () => {
  let component: AddErrorcategoryComponent;
  let fixture: ComponentFixture<AddErrorcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddErrorcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddErrorcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
