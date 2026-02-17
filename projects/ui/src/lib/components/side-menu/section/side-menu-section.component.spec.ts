import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuSectionComponent } from './side-menu-section.component';

describe('SideMenuSectionComponent', () => {
    let component: SideMenuSectionComponent;
    let fixture: ComponentFixture<SideMenuSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SideMenuSectionComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuSectionComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-section');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set label input', () => {
        fixture.componentRef.setInput('label', 'Section Label');
        fixture.detectChanges();
        expect(component.label()).toBe('Section Label');
    });

    it('should handle optional label', () => {
        // label is optional, so should work without it
        expect(component.label()).toBeUndefined();
    });
});
