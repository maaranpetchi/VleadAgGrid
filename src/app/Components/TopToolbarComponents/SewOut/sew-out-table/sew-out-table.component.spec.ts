import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewOutTableComponent } from './sew-out-table.component';

describe('SewOutTableComponent', () => {
  let component: SewOutTableComponent;
  let fixture: ComponentFixture<SewOutTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SewOutTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SewOutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
