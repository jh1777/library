import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
    let component: SideMenuComponent;
    let fixture: ComponentFixture<SideMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SideMenuComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-side-menu');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default showSectionDivider as true', () => {
        expect(component.showSectionDivider()).toBe(true);
    });

    it('should set showSectionDivider input', () => {
        fixture.componentRef.setInput('showSectionDivider', false);
        fixture.detectChanges();
        expect(component.showSectionDivider()).toBe(false);
    });

    it('should have default showBorder as false', () => {
        expect(component.showBorder()).toBe(false);
    });

    it('should set showBorder input', () => {
        fixture.componentRef.setInput('showBorder', true);
        fixture.detectChanges();
        expect(component.showBorder()).toBe(true);
    });

    it('should update selectedValue when selectItem is called', () => {
        component.selectItem('test-value');
        expect(component.selectedValue()).toBe('test-value');
    });

    it('should handle numeric values', () => {
        component.selectItem(42);
        expect(component.selectedValue()).toBe(42);
    });

    it('should handle boolean values', () => {
        component.selectItem(true);
        expect(component.selectedValue()).toBe(true);
    });
});
