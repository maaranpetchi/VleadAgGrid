import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditnoteComponent } from './add-creditnote.component';

describe('AddCreditnoteComponent', () => {
  let component: AddCreditnoteComponent;
  let fixture: ComponentFixture<AddCreditnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCreditnoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
