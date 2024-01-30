import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSkillsetComponent } from './index-skillset.component';

describe('IndexSkillsetComponent', () => {
  let component: IndexSkillsetComponent;
  let fixture: ComponentFixture<IndexSkillsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSkillsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexSkillsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
