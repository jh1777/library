import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
    let component: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContentComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-content');
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
