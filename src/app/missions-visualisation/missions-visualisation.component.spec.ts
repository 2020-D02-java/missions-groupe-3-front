import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsVisualisationComponent } from './missions-visualisation.component';

describe('MissionsVisualisationComponent', () => {
  let component: MissionsVisualisationComponent;
  let fixture: ComponentFixture<MissionsVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
