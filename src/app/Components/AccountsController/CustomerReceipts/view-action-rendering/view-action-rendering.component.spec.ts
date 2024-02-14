import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActionRenderingComponent } from './view-action-rendering.component';

describe('ViewActionRenderingComponent', () => {
  let component: ViewActionRenderingComponent;
  let fixture: ComponentFixture<ViewActionRenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActionRenderingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActionRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
