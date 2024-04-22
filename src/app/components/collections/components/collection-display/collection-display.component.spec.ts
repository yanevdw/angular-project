import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDisplayComponent } from './collection-display.component';

describe('CategoryInfoComponent', () => {
  let component: CollectionDisplayComponent;
  let fixture: ComponentFixture<CollectionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
