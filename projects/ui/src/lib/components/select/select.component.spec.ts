import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { SelectStyle } from './select.models';

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-select');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('expect initial id', () => {
        expect(component.id()).toBe('test-select');
    });

    it('should set label', () => {
        fixture.componentRef.setInput('label', 'Select Label');
        expect(component.label()).toBe('Select Label');
    });

    it('should set placeholder', () => {
        fixture.componentRef.setInput('placeholderText', 'Choose option');
        expect(component.placeholderText()).toBe('Choose option');
    });

    it('should set options', () => {
        const options = [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' }
        ];
        fixture.componentRef.setInput('options', options);
        expect(component.options()).toEqual(options);
    });

    it('should set value', () => {
        fixture.componentRef.setInput('value', '1');
        expect(component.value()).toBe('1');
    });

    it('should set disabled state', () => {
        fixture.componentRef.setInput('isDisabled', true);
        expect(component.isDisabled()).toBe(true);
    });

    it('should set style', () => {
        fixture.componentRef.setInput('style', SelectStyle.Error);
        expect(component.style()).toBe(SelectStyle.Error);
    });
});
