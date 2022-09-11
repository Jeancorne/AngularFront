import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpInventarioComponent } from './cmp-inventario.component';

describe('CmpInventarioComponent', () => {
  let component: CmpInventarioComponent;
  let fixture: ComponentFixture<CmpInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmpInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
