import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchComponent } from './switch.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// RUN WITH `nx test --test-file src/lib/components/switch/switch.component.spec.ts` (from csgp-library folder)
describe('SwitchComponent', () => {
    let component: SwitchComponent;
    let fixture: ComponentFixture<SwitchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SwitchComponent, NoopAnimationsModule]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchComponent);
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

    it('should set disabled', () => {
        fixture.componentRef.setInput('disabled', true);
        expect(component.isDisabled()).toBe(true);
    });

    it('should set state', () => {
        fixture.componentRef.setInput('state', true);
        expect(component.state()).toBe(true);
    });

    it('should set label', () => {
        fixture.componentRef.setInput('label', "#Switch Label");
        expect(component.label()).toBe("#Switch Label");
    });

    // TODO: add test to switch the state
});