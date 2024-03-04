import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistpopComponent } from './checklistpop.component';

describe('ChecklistpopComponent', () => {
  let component: ChecklistpopComponent;
  let fixture: ComponentFixture<ChecklistpopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistpopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklistpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
