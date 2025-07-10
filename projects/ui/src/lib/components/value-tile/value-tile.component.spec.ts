import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValueTileComponent } from './value-tile.component';
import { ValueTileStyle } from './value-tile.models';

// RUN WITH `nx test --test-file src/lib/components/value-tile/value-tile.component.spec.ts` 
describe('ValueTileComponent', () => {
    let component: ValueTileComponent;
    let fixture: ComponentFixture<ValueTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ValueTileComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ValueTileComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', '101010');
        fixture.componentRef.setInput('key', '#Key');
        fixture.componentRef.setInput('value', '#Value');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('expect initial id', () => {
        expect(component.id()).toBe('101010');
    });

    it('expect initial key', () => {
        expect(component.key()).toBe('#Key');
    });
    
    it('expect initial value', () => {
        expect(component.value()).toBe('#Value');
    });

    it('should set style', () => {
        fixture.componentRef.setInput('style', ValueTileStyle.Attention);
        expect(component.style()).toBe(ValueTileStyle.Attention);
    });
});