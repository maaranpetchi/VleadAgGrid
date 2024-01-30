import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewOutComponent } from './sew-out.component';

describe('SewOutComponent', () => {
  let component: SewOutComponent;
  let fixture: ComponentFixture<SewOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SewOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SewOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
