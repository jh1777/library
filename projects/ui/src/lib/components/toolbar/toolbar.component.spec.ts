import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';

// RUN WITH `nx test --test-file src/lib/components/toolbar/toolbar.component.spec.ts` (from csgp-library folder)
describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [ToolbarComponent]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('shoud set maxButtons', () => {
        fixture.componentRef.setInput('maxButtons', 4);
        expect(component.maxButtons()).toBe(4);
    });

    it('shoud set maxBadges', () => {
        fixture.componentRef.setInput('maxBadges', 3);
        expect(component.maxBadges()).toBe(3);
    });

    it('shoud set maxSwitches', () => {
        fixture.componentRef.setInput('maxSwitches', 3);
        expect(component.maxSwitches()).toBe(3);
    });

    it('shoud set maxValueTiles', () => {
        fixture.componentRef.setInput('maxValueTiles', 2);
        expect(component.maxValueTiles()).toBe(2);
    });

    it('shoud set text', () => {
        fixture.componentRef.setInput('text', '#Test');
        expect(component.text()).toBe('#Test');
    });
});