import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSkillSetComponent } from './update-skill-set.component';

describe('UpdateSkillSetComponent', () => {
  let component: UpdateSkillSetComponent;
  let fixture: ComponentFixture<UpdateSkillSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSkillSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSkillSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
