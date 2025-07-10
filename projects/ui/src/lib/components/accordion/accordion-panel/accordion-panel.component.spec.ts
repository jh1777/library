import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionPanelComponent } from './accordion-panel.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// RUN WITH `nx test --test-file src/lib/components/accordion/accordion-panel/accordion-panel.component.spec.ts` 
describe('AccordionPanelComponent', () => {
    let component: AccordionPanelComponent;
    let fixture: ComponentFixture<AccordionPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccordionPanelComponent, NoopAnimationsModule]
        })
        .compileComponents();

        fixture = TestBed.createComponent(AccordionPanelComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', '101010');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set isCollapsed', () => {
        component.isCollapsed.set(true);
        expect(component.isCollapsed()).toBe(true);
    });

    it('should set isDisabled', () => {
        component.isDisabled.set(true);
        expect(component.isDisabled()).toBe(true);
    });
});