import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';
import { BadgeStyle } from './badge.models';

// RUN WITH `nx test --test-file src/lib/components/badge/badge.component.spec.ts` (from csgp-library folder)
describe('BadgeComponent', () => {
    let component: BadgeComponent;
    let fixture: ComponentFixture<BadgeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BadgeComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeComponent);
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

    it('should set value', () => {
        fixture.componentRef.setInput('value', 10);
        expect(component.value()).toBe(10);
    });

    it('should set label', () => {
        fixture.componentRef.setInput('label', "Test");
        expect(component.label()).toBe("Test");
    });

    it('should set style', () => {
        fixture.componentRef.setInput('style', BadgeStyle.Attention);
        expect(component.style()).toBe(BadgeStyle.Attention);
    });

    it('should set size', () => {
        fixture.componentRef.setInput('size', 3);
        expect(component.size()).toBe(3);
    });

});