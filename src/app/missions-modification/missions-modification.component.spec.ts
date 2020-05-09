import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsModificationComponent } from './missions-modification.component';

describe('MissionsModificationComponent', () => {
  let component: MissionsModificationComponent;
  let fixture: ComponentFixture<MissionsModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
