import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientordinationindexComponent } from './clientordinationindex.component';

describe('ClientordinationindexComponent', () => {
  let component: ClientordinationindexComponent;
  let fixture: ComponentFixture<ClientordinationindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientordinationindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientordinationindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
