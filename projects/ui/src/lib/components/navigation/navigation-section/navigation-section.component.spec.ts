import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSectionComponent } from './navigation-section.component';

describe('NavigationSectionComponent', () => {
  let component: NavigationSectionComponent;
  let fixture: ComponentFixture<NavigationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
