import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpLoginComponent } from './cmp-login.component';

describe('CmpLoginComponent', () => {
  let component: CmpLoginComponent;
  let fixture: ComponentFixture<CmpLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
