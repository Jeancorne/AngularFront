import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpCrearUsuarioComponent } from './cmp-crear-usuario.component';

describe('CmpCrearUsuarioComponent', () => {
  let component: CmpCrearUsuarioComponent;
  let fixture: ComponentFixture<CmpCrearUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpCrearUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmpCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
