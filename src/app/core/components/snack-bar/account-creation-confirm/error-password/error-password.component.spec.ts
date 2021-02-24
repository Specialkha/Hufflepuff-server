import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPasswordComponent } from './error-password.component';

describe('ErrorPasswordComponent', () => {
  let component: ErrorPasswordComponent;
  let fixture: ComponentFixture<ErrorPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
