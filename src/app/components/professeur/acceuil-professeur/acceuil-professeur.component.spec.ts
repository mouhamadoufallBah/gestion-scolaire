import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilProfesseurComponent } from './acceuil-professeur.component';

describe('AcceuilProfesseurComponent', () => {
  let component: AcceuilProfesseurComponent;
  let fixture: ComponentFixture<AcceuilProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilProfesseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
