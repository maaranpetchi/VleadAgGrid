import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyProofTableComponent } from './buddy-proof-table.component';

describe('BuddyProofTableComponent', () => {
  let component: BuddyProofTableComponent;
  let fixture: ComponentFixture<BuddyProofTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuddyProofTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddyProofTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
