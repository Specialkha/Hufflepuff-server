import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreationEmailComponent } from './account-creation-email.component';

describe('AccountCreationEmailComponent', () => {
  let component: AccountCreationEmailComponent;
  let fixture: ComponentFixture<AccountCreationEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountCreationEmailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
