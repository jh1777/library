import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryMetricComponent } from './entry-metric.component';
import { EntryMetricStyle } from './entry-metric.models';

describe('EntryMetricComponent', () => {
    let component: EntryMetricComponent;
    let fixture: ComponentFixture<EntryMetricComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EntryMetricComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryMetricComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-metric');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default percent as 0', () => {
        expect(component.percent()).toBe(0);
    });

    it('should set percent value', () => {
        component.percent.set(50);
        expect(component.percent()).toBe(50);
    });

    it('should cap percent at 100', () => {
        component.percent.set(150);
        fixture.detectChanges();
        expect(component.percent()).toBe(100);
    });

    it('should have default style as None', () => {
        expect(component.style()).toBe(EntryMetricStyle.None);
    });

    it('should set style input', () => {
        fixture.componentRef.setInput('style', EntryMetricStyle.Success);
        fixture.detectChanges();
        expect(component.style()).toBe(EntryMetricStyle.Success);
    });
});
