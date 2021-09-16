import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesUiComponent } from './messages-ui.component';

describe('MessagesUiComponent', () => {
  let component: MessagesUiComponent;
  let fixture: ComponentFixture<MessagesUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
