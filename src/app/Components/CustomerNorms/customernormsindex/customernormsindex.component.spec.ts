import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomernormsindexComponent } from './customernormsindex.component';

describe('CustomernormsindexComponent', () => {
  let component: CustomernormsindexComponent;
  let fixture: ComponentFixture<CustomernormsindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomernormsindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomernormsindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
