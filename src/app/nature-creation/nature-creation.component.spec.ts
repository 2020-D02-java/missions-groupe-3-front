import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureCreationComponent } from './nature-creation.component';

describe('NatureCreationComponent', () => {
  let component: NatureCreationComponent;
  let fixture: ComponentFixture<NatureCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatureCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
