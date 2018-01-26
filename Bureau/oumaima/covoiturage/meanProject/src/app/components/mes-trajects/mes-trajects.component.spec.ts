import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesTrajectsComponent } from './mes-trajects.component';

describe('MesTrajectsComponent', () => {
  let component: MesTrajectsComponent;
  let fixture: ComponentFixture<MesTrajectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesTrajectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesTrajectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
