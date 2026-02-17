import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabsComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-tabs');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default activeIndex as -1', () => {
        expect(component.activeIndex()).toBe(-1);
    });

    it('should set activeIndex model', () => {
        component.activeIndex.set(2);
        expect(component.activeIndex()).toBe(2);
    });

    it('should have default showPrevNextButtons as true', () => {
        expect(component.showPrevNextButtons()).toBe(true);
    });

    it('should set showPrevNextButtons input', () => {
        fixture.componentRef.setInput('showPrevNextButtons', false);
        fixture.detectChanges();
        expect(component.showPrevNextButtons()).toBe(false);
    });

    it('should have tabs QueryList', () => {
        expect(component.tabs).toBeDefined();
    });
});
