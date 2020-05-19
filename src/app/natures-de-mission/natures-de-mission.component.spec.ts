import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturesDeMissionComponent } from './natures-de-mission.component';

describe('NaturesDeMissionComponent', () => {
  let component: NaturesDeMissionComponent;
  let fixture: ComponentFixture<NaturesDeMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaturesDeMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturesDeMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
