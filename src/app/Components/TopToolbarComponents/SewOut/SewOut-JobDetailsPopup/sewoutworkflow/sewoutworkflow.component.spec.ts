import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewoutworkflowComponent } from './sewoutworkflow.component';

describe('SewoutworkflowComponent', () => {
  let component: SewoutworkflowComponent;
  let fixture: ComponentFixture<SewoutworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SewoutworkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SewoutworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
