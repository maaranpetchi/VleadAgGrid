import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditScopeComponent } from './view-edit-scope.component';

describe('ViewEditScopeComponent', () => {
  let component: ViewEditScopeComponent;
  let fixture: ComponentFixture<ViewEditScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEditScopeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEditScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
