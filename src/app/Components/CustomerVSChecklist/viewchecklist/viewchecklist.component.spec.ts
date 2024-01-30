import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewchecklistComponent } from './viewchecklist.component';

describe('ViewchecklistComponent', () => {
  let component: ViewchecklistComponent;
  let fixture: ComponentFixture<ViewchecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewchecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
