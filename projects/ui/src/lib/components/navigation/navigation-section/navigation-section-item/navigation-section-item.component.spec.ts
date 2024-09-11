import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSectionItemComponent } from './navigation-section-item.component';

describe('NavigationSectionItemComponent', () => {
  let component: NavigationSectionItemComponent;
  let fixture: ComponentFixture<NavigationSectionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationSectionItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationSectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
