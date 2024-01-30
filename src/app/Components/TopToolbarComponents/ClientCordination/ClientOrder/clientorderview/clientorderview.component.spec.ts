import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientorderviewComponent } from './clientorderview.component';

describe('ClientorderviewComponent', () => {
  let component: ClientorderviewComponent;
  let fixture: ComponentFixture<ClientorderviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientorderviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientorderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
