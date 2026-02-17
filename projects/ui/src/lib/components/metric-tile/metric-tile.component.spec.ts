import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetricTileComponent } from './metric-tile.component';

describe('MetricTileComponent', () => {
    let component: MetricTileComponent;
    let fixture: ComponentFixture<MetricTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MetricTileComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MetricTileComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-tile');
        fixture.componentRef.setInput('header', 'Test Header');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set header input', () => {
        expect(component.header()).toBe('Test Header');
    });

    it('should set description input', () => {
        fixture.componentRef.setInput('description', 'Test description');
        fixture.detectChanges();
        expect(component.description()).toBe('Test description');
    });

    it('should have maxMetrics set to 5', () => {
        expect(component.maxMetrics()).toBe(5);
    });
});
