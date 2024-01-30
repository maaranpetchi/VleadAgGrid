import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserMasterComponent } from './adduser-master.component';

describe('AdduserMasterComponent', () => {
  let component: AdduserMasterComponent;
  let fixture: ComponentFixture<AdduserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdduserMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdduserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
