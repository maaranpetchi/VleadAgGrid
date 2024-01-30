import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryToClientComponent } from './query-to-client.component';

describe('QueryToClientComponent', () => {
  let component: QueryToClientComponent;
  let fixture: ComponentFixture<QueryToClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryToClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryToClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
