import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyProofComponent } from './buddy-proof.component';

describe('BuddyProofComponent', () => {
  let component: BuddyProofComponent;
  let fixture: ComponentFixture<BuddyProofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuddyProofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddyProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
