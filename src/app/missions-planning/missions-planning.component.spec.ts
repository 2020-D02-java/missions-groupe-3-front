import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsPlanningComponent } from './missions-planning.component';

describe('MissionsPlanningComponent', () => {
  let component: MissionsPlanningComponent;
  let fixture: ComponentFixture<MissionsPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
