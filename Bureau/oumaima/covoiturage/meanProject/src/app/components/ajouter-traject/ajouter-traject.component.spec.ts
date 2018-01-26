import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTrajectComponent } from './ajouter-traject.component';

describe('AjouterTrajectComponent', () => {
  let component: AjouterTrajectComponent;
  let fixture: ComponentFixture<AjouterTrajectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterTrajectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterTrajectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
