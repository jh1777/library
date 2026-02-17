import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabComponent } from './tab.component';
import { BadgeStyle } from '../../badge';

describe('TabComponent', () => {
    let component: TabComponent;
    let fixture: ComponentFixture<TabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-tab');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set label input', () => {
        fixture.componentRef.setInput('label', 'Test Tab');
        fixture.detectChanges();
        expect(component.label()).toBe('Test Tab');
    });

    it('should set isActive model', () => {
        component.isActive.set(true);
        expect(component.isActive()).toBe(true);
    });

    it('should have default isDisabled as false', () => {
        expect(component.isDisabled()).toBe(false);
    });

    it('should set isDisabled model', () => {
        component.isDisabled.set(true);
        expect(component.isDisabled()).toBe(true);
    });

    it('should set badgeValue input', () => {
        fixture.componentRef.setInput('badgeValue', 5);
        fixture.detectChanges();
        expect(component.badgeValue()).toBe(5);
    });

    it('should have default badgeStyle as None', () => {
        expect(component.badgeStyle()).toBe(BadgeStyle.None);
    });

    it('should set badgeStyle input', () => {
        fixture.componentRef.setInput('badgeStyle', BadgeStyle.Success);
        fixture.detectChanges();
        expect(component.badgeStyle()).toBe(BadgeStyle.Success);
    });
});
