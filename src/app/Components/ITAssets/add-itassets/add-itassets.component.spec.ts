import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItassetsComponent } from './add-itassets.component';

describe('AddItassetsComponent', () => {
  let component: AddItassetsComponent;
  let fixture: ComponentFixture<AddItassetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItassetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItassetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
