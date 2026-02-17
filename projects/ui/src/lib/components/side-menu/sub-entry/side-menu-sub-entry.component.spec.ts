import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuSubEntryComponent } from './side-menu-sub-entry.component';
import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';

describe('SideMenuSubEntryComponent', () => {
    let component: SideMenuSubEntryComponent;
    let fixture: ComponentFixture<SideMenuSubEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SideMenuSubEntryComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuSubEntryComponent);
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
});
