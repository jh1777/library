import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryContainerComponent } from './entry-container.component';

describe('EntryContainerComponent', () => {
    let component: EntryContainerComponent;
    let fixture: ComponentFixture<EntryContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EntryContainerComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryContainerComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-container');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default isClickable as false', () => {
        expect(component.isClickable()).toBe(false);
    });

    it('should set isClickable input', () => {
        fixture.componentRef.setInput('isClickable', true);
        fixture.detectChanges();
        expect(component.isClickable()).toBe(true);
    });

    it('should have default toggleSelect as false', () => {
        expect(component.toggleSelect()).toBe(false);
    });

    it('should set toggleSelect input', () => {
        fixture.componentRef.setInput('toggleSelect', true);
        fixture.detectChanges();
        expect(component.toggleSelect()).toBe(true);
    });

    it('should have default isSelected as false', () => {
        expect(component.isSelected()).toBe(false);
    });

    it('should set isSelected model', () => {
        component.isSelected.set(true);
        expect(component.isSelected()).toBe(true);
    });
});
