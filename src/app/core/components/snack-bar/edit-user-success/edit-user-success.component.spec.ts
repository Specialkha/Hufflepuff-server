import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSuccessComponent } from './edit-user-success.component';

describe('EditUserSuccessComponent', () => {
  let component: EditUserSuccessComponent;
  let fixture: ComponentFixture<EditUserSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
