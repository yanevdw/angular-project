import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopGraphicsComponent } from './desktop-graphics.component';

describe('DesktopGraphicsComponent', () => {
  let component: DesktopGraphicsComponent;
  let fixture: ComponentFixture<DesktopGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopGraphicsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
