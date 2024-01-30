import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditprocessComponent } from './add-editprocess.component';

describe('AddEditprocessComponent', () => {
  let component: AddEditprocessComponent;
  let fixture: ComponentFixture<AddEditprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
