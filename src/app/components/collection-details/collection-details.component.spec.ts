import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDetailsComponent } from './collection-details.component';

describe('CategoriesComponent', () => {
  let component: CollectionDetailsComponent;
  let fixture: ComponentFixture<CollectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
