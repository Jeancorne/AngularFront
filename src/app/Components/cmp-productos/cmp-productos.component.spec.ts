import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpProductosComponent } from './cmp-productos.component';

describe('CmpProductosComponent', () => {
  let component: CmpProductosComponent;
  let fixture: ComponentFixture<CmpProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmpProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
