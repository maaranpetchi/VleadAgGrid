import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofjobhistorypopupComponent } from './proofjobhistorypopup.component';

describe('ProofjobhistorypopupComponent', () => {
  let component: ProofjobhistorypopupComponent;
  let fixture: ComponentFixture<ProofjobhistorypopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofjobhistorypopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofjobhistorypopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
