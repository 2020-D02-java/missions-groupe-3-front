import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFraisComponent } from './ajouter-frais.component';

describe('AjouterFraisComponent', () => {
  let component: AjouterFraisComponent;
  let fixture: ComponentFixture<AjouterFraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterFraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
