import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActionRenderingComponent } from './delete-action-rendering.component';

describe('DeleteActionRenderingComponent', () => {
  let component: DeleteActionRenderingComponent;
  let fixture: ComponentFixture<DeleteActionRenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteActionRenderingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteActionRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
