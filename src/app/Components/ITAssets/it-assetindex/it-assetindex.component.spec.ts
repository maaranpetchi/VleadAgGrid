import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItAssetindexComponent } from './it-assetindex.component';

describe('ItAssetindexComponent', () => {
  let component: ItAssetindexComponent;
  let fixture: ComponentFixture<ItAssetindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItAssetindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItAssetindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
