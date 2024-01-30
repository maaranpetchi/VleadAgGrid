import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnApprovaljobsComponent } from './un-approvaljobs.component';

describe('UnApprovaljobsComponent', () => {
  let component: UnApprovaljobsComponent;
  let fixture: ComponentFixture<UnApprovaljobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnApprovaljobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnApprovaljobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
