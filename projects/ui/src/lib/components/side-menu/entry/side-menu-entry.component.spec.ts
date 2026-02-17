import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuEntryComponent } from './side-menu-entry.component';
import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';

describe('SideMenuEntryComponent', () => {
    let component: SideMenuEntryComponent;
    let fixture: ComponentFixture<SideMenuEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SideMenuEntryComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuEntryComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-entry');
        fixture.componentRef.setInput('label', 'Test Label');
        fixture.componentRef.setInput('value', 'test-value');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set label input', () => {
        expect(component.label()).toBe('Test Label');
    });

    it('should set value input', () => {
        expect(component.value()).toBe('test-value');
    });

    it('should have default isDisabled as false', () => {
        expect(component.isDisabled()).toBe(false);
    });

    it('should set isDisabled input', () => {
        fixture.componentRef.setInput('isDisabled', true);
        fixture.detectChanges();
        expect(component.isDisabled()).toBe(true);
    });

    it('should use isSelectedInput when no parent menu', () => {
        fixture.componentRef.setInput('isSelected', true);
        fixture.detectChanges();
        expect(component.isSelected()).toBe(true);
    });

    it('should set icon input', () => {
        const testIcon = faCheck as IconDefinition;
        fixture.componentRef.setInput('icon', testIcon);
        fixture.detectChanges();
        expect(component.icon()).toBeTruthy();
        expect(component.icon()?.iconName).toBe('check');
    });
});
