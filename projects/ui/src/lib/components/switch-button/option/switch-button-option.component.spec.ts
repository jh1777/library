import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchButtonOptionComponent } from './switch-button-option.component';
import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';

describe('SwitchButtonOptionComponent', () => {
    let component: SwitchButtonOptionComponent;
    let fixture: ComponentFixture<SwitchButtonOptionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SwitchButtonOptionComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchButtonOptionComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('label', 'Test Option');
        fixture.componentRef.setInput('value', 'test-value');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set label input', () => {
        expect(component.label()).toBe('Test Option');
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

    it('should set icon input', () => {
        const testIcon = faCheck as IconDefinition;
        fixture.componentRef.setInput('icon', testIcon);
        fixture.detectChanges();
        expect(component.icon()).toBeTruthy();
        expect(component.icon()?.iconName).toBe('check');
    });

    it('should return false isSelected when no parent', () => {
        expect(component.isSelected()).toBe(false);
    });

    it('should emit onSelectionChange when clicked and not disabled', () => {
        const event = new MouseEvent('click');
        spyOn(event, 'preventDefault');
        spyOn(event, 'stopPropagation');
        spyOn(component.onSelectionChange, 'emit');
        
        component.handleClick(event);
        
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(component.onSelectionChange.emit).toHaveBeenCalledWith('test-value');
    });

    it('should not emit when disabled', () => {
        fixture.componentRef.setInput('isDisabled', true);
        fixture.detectChanges();
        
        const event = new MouseEvent('click');
        spyOn(component.onSelectionChange, 'emit');
        
        component.handleClick(event);
        
        expect(component.onSelectionChange.emit).not.toHaveBeenCalled();
    });
});
