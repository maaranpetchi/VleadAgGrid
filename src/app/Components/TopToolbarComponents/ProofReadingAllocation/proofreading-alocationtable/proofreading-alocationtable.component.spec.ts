import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofreadingAlocationtableComponent } from './proofreading-alocationtable.component';

describe('ProofreadingAlocationtableComponent', () => {
  let component: ProofreadingAlocationtableComponent;
  let fixture: ComponentFixture<ProofreadingAlocationtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofreadingAlocationtableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofreadingAlocationtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
