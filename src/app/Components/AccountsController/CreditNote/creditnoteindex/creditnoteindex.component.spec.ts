import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditnoteindexComponent } from './creditnoteindex.component';

describe('CreditnoteindexComponent', () => {
  let component: CreditnoteindexComponent;
  let fixture: ComponentFixture<CreditnoteindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditnoteindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditnoteindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
