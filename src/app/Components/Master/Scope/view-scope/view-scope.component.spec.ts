import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScopeComponent } from './view-scope.component';

describe('ViewScopeComponent', () => {
  let component: ViewScopeComponent;
  let fixture: ComponentFixture<ViewScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewScopeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
