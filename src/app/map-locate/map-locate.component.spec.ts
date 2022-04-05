import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLocateComponent } from './map-locate.component';

describe('MapLocateComponent', () => {
  let component: MapLocateComponent;
  let fixture: ComponentFixture<MapLocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapLocateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
