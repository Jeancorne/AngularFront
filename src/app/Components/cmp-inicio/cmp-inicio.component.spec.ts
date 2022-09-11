import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpInicioComponent } from './cmp-inicio.component';

describe('CmpInicioComponent', () => {
  let component: CmpInicioComponent;
  let fixture: ComponentFixture<CmpInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmpInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
