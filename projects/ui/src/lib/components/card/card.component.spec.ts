import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { CardStyle } from './card.models';

// RUN WITH `nx test --test-file src/lib/components/card/card.component.spec.ts` (from csgp-library folder)
describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', '101010');
        fixture.componentRef.setInput('header', '#Header');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set text', () => {
        fixture.componentRef.setInput('header', "#Text");
        expect(component.header()).toBe('#Text');
    });

    it('should set style', () => {
        fixture.componentRef.setInput('style', CardStyle.None);
        expect(component.style()).toBe(CardStyle.None);
    });
});