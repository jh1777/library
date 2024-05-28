import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryTileItemComponent } from './entry-tile-item.component';
import { EntryItemStyle } from './entry-tile-item.models';

// RUN WITH `nx test --test-file src/lib/components/entry-tile/entry-tile-item/entry-tile-item.component.spec.ts` (from csgp-library folder)
describe('EntryTileItemComponent', () => {
    let component: EntryTileItemComponent;
    let fixture: ComponentFixture<EntryTileItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EntryTileItemComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryTileItemComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', '101010');
        fixture.componentRef.setInput('primaryValue', '#Primary');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('expect initial id', () => {
        expect(component.id()).toBe('101010');
    });

    it('should set showTitle', () => {
        component.showTitle.set(true);
        expect(component.showTitle()).toBe(true);
    });

    it('should set header', () => {
        fixture.componentRef.setInput('header', '#HeaderText');
        expect(component.header()).toBe('#HeaderText');
    });

    it('should set style', () => {
        fixture.componentRef.setInput('style', EntryItemStyle.Attention);
        expect(component.style()).toBe(EntryItemStyle.Attention);
    });

    it('should set clickable', () => {
        fixture.componentRef.setInput('clickable', true);
        expect(component.clickable()).toBe(true);
    });

    it('should set primaryValue', () => {
        expect(component.primaryValue()).toBe('#Primary');
    });

    it('should set secondaryValue', () => {
        fixture.componentRef.setInput('secondaryValue', '#Secondary');
        expect(component.secondaryValue()).toBe('#Secondary');
    });

    it('should set showStateIcon', () => {
        fixture.componentRef.setInput('showStateIcon', true);
        expect(component.showStateIcon()).toBe(true);
    });

    it('should set icon', () => {
        fixture.componentRef.setInput('icon', 'check');
        expect(component.icon()).toBe('check');
    });

    it('onItemClick should emit event with id', () => {
        const event = new MouseEvent('click');
        spyOn(component.onItemClick, 'emit');
        component.handleClickEvent(event);
        expect(component.onItemClick.emit).toHaveBeenCalledWith(component.id());
    });
});