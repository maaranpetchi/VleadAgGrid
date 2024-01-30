import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofreadingAllocationComponent } from './proofreading-allocation.component';

describe('ProofreadingAllocationComponent', () => {
  let component: ProofreadingAllocationComponent;
  let fixture: ComponentFixture<ProofreadingAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofreadingAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofreadingAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
