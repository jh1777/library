import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSectionBasicComponent } from './card-section-basic.component';
import { CardStyle } from '../card.models';


// RUN WITH `nx test --test-file src/lib/components/card/card-section-basic/card-section-basic.component.spec.ts` (from csgp-library folder)
describe('CardSectionBasicComponent', () => {
    let component: CardSectionBasicComponent;
    let fixture: ComponentFixture<CardSectionBasicComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardSectionBasicComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CardSectionBasicComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', '101010');
        fixture.componentRef.setInput('text', '#Text');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set text', () => {
        expect(component.text()).toBe('#Text');
    });

    it('should set list', () => {
        fixture.componentRef.setInput('list', ['#List']);
        expect(component.list()).toEqual(['#List']);
    });

    it('should set styledMessage', () => {
        fixture.componentRef.setInput('styledMessage', '#StyledMessage');
        expect(component.styledMessage()).toBe('#StyledMessage');
    });

    it('should set header', () => {
        fixture.componentRef.setInput('header', '#Header');
        expect(component.header()).toBe('#Header');
    });

    it('should set showStyledBackground', () => {
        fixture.componentRef.setInput('showStyledBackground', true);
        expect(component.showStyledBackground()).toBe(true);
    });

    it('should set style', () => {
        fixture.componentRef.setInput('style', CardStyle.None);
        expect(component.style()).toBe(CardStyle.None);
    });
});