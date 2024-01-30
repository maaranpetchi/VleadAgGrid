import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofreadingComponent } from './proofreading.component';

describe('ProofreadingComponent', () => {
  let component: ProofreadingComponent;
  let fixture: ComponentFixture<ProofreadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofreadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
