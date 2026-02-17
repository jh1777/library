import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowComponent } from './window.component';

describe('WindowComponent', () => {
    let component: WindowComponent;
    let fixture: ComponentFixture<WindowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WindowComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WindowComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-window');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default loadingText as "Loading"', () => {
        expect(component.loadingText()).toBe('Loading');
    });

    it('should set loadingText input', () => {
        fixture.componentRef.setInput('loadingText', 'Please wait...');
        fixture.detectChanges();
        expect(component.loadingText()).toBe('Please wait...');
    });
});
