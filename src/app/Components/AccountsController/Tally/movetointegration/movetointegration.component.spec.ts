import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovetointegrationComponent } from './movetointegration.component';

describe('MovetointegrationComponent', () => {
  let component: MovetointegrationComponent;
  let fixture: ComponentFixture<MovetointegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovetointegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovetointegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
