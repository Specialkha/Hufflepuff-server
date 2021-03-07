import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogSuccessComponent } from './edit-blog-success.component';

describe('EditBlogSuccessComponent', () => {
  let component: EditBlogSuccessComponent;
  let fixture: ComponentFixture<EditBlogSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBlogSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlogSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
