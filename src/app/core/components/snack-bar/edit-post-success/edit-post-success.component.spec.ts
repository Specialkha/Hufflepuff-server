import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostSuccessComponent } from './edit-post-success.component';

describe('EditPostSuccessComponent', () => {
  let component: EditPostSuccessComponent;
  let fixture: ComponentFixture<EditPostSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
