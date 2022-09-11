import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpUsuariosComponent } from './cmp-usuarios.component';

describe('CmpUsuariosComponent', () => {
  let component: CmpUsuariosComponent;
  let fixture: ComponentFixture<CmpUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmpUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
