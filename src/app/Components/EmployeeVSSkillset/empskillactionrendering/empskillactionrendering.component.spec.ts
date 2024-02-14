import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpskillactionrenderingComponent } from './empskillactionrendering.component';

describe('EmpskillactionrenderingComponent', () => {
  let component: EmpskillactionrenderingComponent;
  let fixture: ComponentFixture<EmpskillactionrenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpskillactionrenderingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpskillactionrenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
