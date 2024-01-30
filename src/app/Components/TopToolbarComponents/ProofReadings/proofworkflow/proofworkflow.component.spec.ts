import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofworkflowComponent } from './proofworkflow.component';

describe('ProofworkflowComponent', () => {
  let component: ProofworkflowComponent;
  let fixture: ComponentFixture<ProofworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofworkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
