import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryKeyValueComponent } from './entry-key-value.component';
import { EntryKeyValueStyle } from './entry-key-value.models';

// RUN WITH `nx test --test-file src/lib/components/entry-key-value/entry-key-value.component.spec.ts` (from csgp-library folder)
describe('EntryKeyValueComponent', () => {
    let component: EntryKeyValueComponent;
    let fixture: ComponentFixture<EntryKeyValueComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EntryKeyValueComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryKeyValueComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', '101010');
        fixture.componentRef.setInput('label', '#Key');
        fixture.componentRef.setInput('value', '#Value');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('expect initial id', () => {
        expect(component.id()).toBe('101010');
    });

    it('should set value', () => {
        expect(component.value()).toBe('#Value');
    });

    it('should set label', () => {
        expect(component.label()).toBe("#Key");
    });

    it('should set style', () => {
        fixture.componentRef.setInput('style', EntryKeyValueStyle.Attention);
        expect(component.style()).toBe(EntryKeyValueStyle.Attention);
    });

    it('should set big = true', () => {
        fixture.componentRef.setInput('isBig', true);
        expect(component.isBig()).toBe(true);
    });
});