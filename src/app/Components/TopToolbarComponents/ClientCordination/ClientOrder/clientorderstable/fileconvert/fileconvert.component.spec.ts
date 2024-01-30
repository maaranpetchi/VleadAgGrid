import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileconvertComponent } from './fileconvert.component';

describe('FileconvertComponent', () => {
  let component: FileconvertComponent;
  let fixture: ComponentFixture<FileconvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileconvertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileconvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
