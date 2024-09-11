import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionPanelHeaderComponent } from './accordion-panel-header.component';
import { AccordionPanelHeaderStyle } from '../../accordion.models';

// RUN WITH `nx test --test-file src/lib/components/accordion/accordion-panel/accordion-panel-header/accordion-panel-header.component.spec.ts` (from csgp-library folder)
describe('AccordionPanelHeaderComponent', () => {
    let component: AccordionPanelHeaderComponent;
    let fixture: ComponentFixture<AccordionPanelHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccordionPanelHeaderComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(AccordionPanelHeaderComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', '101010');
        fixture.componentRef.setInput('label', '#Label');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set label', () => {
        expect(component.label()).toBe('#Label');
    });

    it('should set style', () => {
        fixture.componentRef.setInput('style', AccordionPanelHeaderStyle.Attention);
        expect(component.style()).toBe(AccordionPanelHeaderStyle.Attention);
    });
});