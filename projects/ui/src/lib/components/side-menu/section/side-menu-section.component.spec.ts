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

    it('should set title input', () => {
        fixture.componentRef.setInput('title', 'Section Title');
        fixture.detectChanges();
        expect(component.title()).toBe('Section Title');
    });

    it('should handle optional title', () => {
        // title is optional, so should work without it
        expect(component.title()).toBeUndefined();
    });
});
