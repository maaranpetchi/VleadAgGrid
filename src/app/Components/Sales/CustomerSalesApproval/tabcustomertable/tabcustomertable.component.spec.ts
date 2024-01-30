import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabcustomertableComponent } from './tabcustomertable.component';

describe('TabcustomertableComponent', () => {
  let component: TabcustomertableComponent;
  let fixture: ComponentFixture<TabcustomertableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabcustomertableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabcustomertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
