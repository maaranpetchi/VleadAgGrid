import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientordersComponent } from './clientorders.component';

describe('ClientordersComponent', () => {
  let component: ClientordersComponent;
  let fixture: ComponentFixture<ClientordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
