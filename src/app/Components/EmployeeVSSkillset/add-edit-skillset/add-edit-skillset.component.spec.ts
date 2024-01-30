import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSkillsetComponent } from './add-edit-skillset.component';

describe('AddEditSkillsetComponent', () => {
  let component: AddEditSkillsetComponent;
  let fixture: ComponentFixture<AddEditSkillsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSkillsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSkillsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
