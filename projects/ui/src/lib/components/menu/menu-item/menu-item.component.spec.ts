import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItemComponent } from './menu-item.component';

describe('MenuItemComponent', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MenuItemComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-menu-item');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set label input', () => {
        fixture.componentRef.setInput('label', 'Test Label');
        fixture.detectChanges();
        expect(component.label()).toBe('Test Label');
    });

    it('should set route input', () => {
        fixture.componentRef.setInput('route', '/test-route');
        fixture.detectChanges();
        expect(component.route()).toBe('/test-route');
    });

    it('should have default exactMatchNeeded as true', () => {
        expect(component.exactMatchNeeded()).toBe(true);
    });

    it('should set exactMatchNeeded input', () => {
        fixture.componentRef.setInput('exactMatchNeeded', false);
        fixture.detectChanges();
        expect(component.exactMatchNeeded()).toBe(false);
    });

    it('should have default isActive as false', () => {
        expect(component.isActive()).toBe(false);
    });

    it('should set isActive signal', () => {
        component.isActive.set(true);
        expect(component.isActive()).toBe(true);
    });
});
