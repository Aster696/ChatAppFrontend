import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFriendComponent } from './display-friend.component';

describe('DisplayFriendComponent', () => {
  let component: DisplayFriendComponent;
  let fixture: ComponentFixture<DisplayFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
