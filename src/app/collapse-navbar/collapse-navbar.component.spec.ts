import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseNavbarComponent } from './collapse-navbar.component';

describe('CollapseNavbarComponent', () => {
  let component: CollapseNavbarComponent;
  let fixture: ComponentFixture<CollapseNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapseNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
