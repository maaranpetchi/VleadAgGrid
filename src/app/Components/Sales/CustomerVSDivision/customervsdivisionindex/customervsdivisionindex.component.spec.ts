import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomervsdivisionindexComponent } from './customervsdivisionindex.component';

describe('CustomervsdivisionindexComponent', () => {
  let component: CustomervsdivisionindexComponent;
  let fixture: ComponentFixture<CustomervsdivisionindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomervsdivisionindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomervsdivisionindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
