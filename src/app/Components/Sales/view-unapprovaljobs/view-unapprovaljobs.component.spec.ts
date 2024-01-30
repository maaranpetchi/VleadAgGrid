import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnapprovaljobsComponent } from './view-unapprovaljobs.component';

describe('ViewUnapprovaljobsComponent', () => {
  let component: ViewUnapprovaljobsComponent;
  let fixture: ComponentFixture<ViewUnapprovaljobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUnapprovaljobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUnapprovaljobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
