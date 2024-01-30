import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientorderstableComponent } from './clientorderstable.component';

describe('ClientorderstableComponent', () => {
  let component: ClientorderstableComponent;
  let fixture: ComponentFixture<ClientorderstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientorderstableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientorderstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
