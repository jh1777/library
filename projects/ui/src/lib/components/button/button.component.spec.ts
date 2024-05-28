import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

// RUN WITH `nx test --test-file src/lib/components/button/button.component.spec.ts` (from csgp-library folder)
describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', '101010');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('expect initial id', () => {
        expect(component.id()).toBe('101010');
    });

    it('handleClickEvent should prevent default and stop propagation', () => {
        const event = new MouseEvent('click');
        spyOn(event, 'preventDefault');
        spyOn(event, 'stopPropagation');
        component.handleClickEvent(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('handleClickEvent should emit onClick event with id', () => {
        const event = new MouseEvent('click');
        spyOn(component.onClick, 'emit');
        component.handleClickEvent(event);
        expect(component.onClick.emit).toHaveBeenCalledWith(component.id());
    });

    it('should set and get simpleOnly', () => {
        component.simpleOnly.set(true);
        expect(component.simpleOnly()).toBe(true);
    });

    it('should set and get iconOnlySimpleStyle', () => {
        component.iconOnlySimpleStyle.set(true);
        expect(component.iconOnlySimpleStyle()).toBe(true);
    });

    it('should set and get whiteMode', () => {
        component.whiteMode.set(true);
        expect(component.whiteMode()).toBe(true);
    });


    it('should set and get disabled', () => {
        component.disabled.set(true);
        expect(component.disabled()).toBe(true);
    });
});