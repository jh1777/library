import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';

// RUN WITH `nx test --test-file src/lib/components/accordion/accordion.component.spec.ts` (from csgp-library folder)
describe('AccordionComponent', () => {
    let component: AccordionComponent;
    let fixture: ComponentFixture<AccordionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccordionComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(AccordionComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', '101010');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set header', () => {
        fixture.componentRef.setInput('header', "#Header");
        expect(component.header()).toBe("#Header");
    });

    it('should set description', () => {
        fixture.componentRef.setInput('description', "#Description");
        expect(component.description()).toBe("#Description");
    });
});