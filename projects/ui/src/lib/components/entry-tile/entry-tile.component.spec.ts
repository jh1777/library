import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryTileComponent } from './entry-tile.component';
import { EntryTileCollapseMode, EntryTileStyle } from './entry-tile.models';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// RUN WITH `nx test --test-file src/lib/components/entry-tile/entry-tile.component.spec.ts` 
describe('EntryTileComponent', () => {
    let component: EntryTileComponent;
    let fixture: ComponentFixture<EntryTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EntryTileComponent, NoopAnimationsModule]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryTileComponent);
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

    it('should set style', () => {
        fixture.componentRef.setInput('style', EntryTileStyle.Attention);
        expect(component.style()).toBe(EntryTileStyle.Attention);
    });

    it('should set and get collapsed', () => {
        component.isCollapsed.set(true);
        expect(component.isCollapsed()).toBe(true);
    });

    it('should set and get collapseMode', () => {
        fixture.componentRef.setInput('collapseMode', EntryTileCollapseMode.Manual);
        expect(component.collapseMode()).toBe(EntryTileCollapseMode.Manual);
    });

    it('should set pageSize and noOfPages', () => {
        fixture.componentRef.setInput('pageSize', 5);
        expect(component.pageSize()).toBe(5);
        expect(component.noOfPages()).toBe(1);
    });

    it('should set description', () => {
        fixture.componentRef.setInput('description', "#Test Description");
        expect(component.description()).toBe("#Test Description");
    });

    it('should set header', () => {
        fixture.componentRef.setInput('header', "#Test Header");
        expect(component.header()).toBe("#Test Header");
    });

    it('should set headerIcon', () => {
        let icon = faCheckCircle
        fixture.componentRef.setInput('headerIcon', icon);
        expect(component.headerIcon()).toBe(icon);
    });

    it('should set moreButtonLabel', () => {
        fixture.componentRef.setInput('moreButtonLabel', "#MORE");
        expect(component.moreButtonLabel()).toBe("#MORE");
    });

    it('onShowMoreClick should emit with id', () => {
        const event = new MouseEvent('click');
        spyOn(component.onShowMoreClick, 'emit');
        component.handleShowMoreClickEvent(event);
        expect(component.onShowMoreClick.emit).toHaveBeenCalledWith(component.id());
    });
});