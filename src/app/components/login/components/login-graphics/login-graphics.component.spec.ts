import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstackComponent } from './login-graphics.component';

describe('BookstackComponent', () => {
  let component: BookstackComponent;
  let fixture: ComponentFixture<BookstackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookstackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookstackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
