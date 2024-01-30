import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUsermasterComponent } from './add-edit-usermaster.component';

describe('AddEditUsermasterComponent', () => {
  let component: AddEditUsermasterComponent;
  let fixture: ComponentFixture<AddEditUsermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUsermasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUsermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
