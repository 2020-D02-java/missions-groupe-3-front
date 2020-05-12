import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureMissionModificationComponent } from './nature-mission-modification.component';

describe('NatureMissionModificationComponent', () => {
  let component: NatureMissionModificationComponent;
  let fixture: ComponentFixture<NatureMissionModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatureMissionModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureMissionModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
