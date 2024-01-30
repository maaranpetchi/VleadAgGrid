import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopechangeComponent } from './scopechange.component';

describe('ScopechangeComponent', () => {
  let component: ScopechangeComponent;
  let fixture: ComponentFixture<ScopechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopechangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
