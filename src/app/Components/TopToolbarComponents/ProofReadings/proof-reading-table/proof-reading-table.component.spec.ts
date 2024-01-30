import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofReadingTableComponent } from './proof-reading-table.component';

describe('ProofReadingTableComponent', () => {
  let component: ProofReadingTableComponent;
  let fixture: ComponentFixture<ProofReadingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofReadingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofReadingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
