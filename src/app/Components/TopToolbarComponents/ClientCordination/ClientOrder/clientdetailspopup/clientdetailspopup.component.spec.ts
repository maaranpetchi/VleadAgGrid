import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdetailspopupComponent } from './clientdetailspopup.component';

describe('ClientdetailspopupComponent', () => {
  let component: ClientdetailspopupComponent;
  let fixture: ComponentFixture<ClientdetailspopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientdetailspopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientdetailspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
