import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserErrorComponent } from './edit-user-error.component';

describe('EditUserErrorComponent', () => {
  let component: EditUserErrorComponent;
  let fixture: ComponentFixture<EditUserErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
