import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';

describe('GridComponent', () => {
    let component: GridComponent;
    let fixture: ComponentFixture<GridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GridComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GridComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('columns', 3);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set columns input', () => {
        expect(component.columns()).toBe(3);
    });

    it('should calculate columns correctly when within max', () => {
        fixture.componentRef.setInput('columns', 4);
        fixture.detectChanges();
        expect(component.calcColumns()).toBeLessThanOrEqual(4);
    });

    it('should not exceed max columns', () => {
        fixture.componentRef.setInput('columns', 10);
        fixture.detectChanges();
        expect(component.calcColumns()).toBeLessThanOrEqual(6);
    });

    it('should log error when columns exceed max', () => {
        spyOn(console, 'error');
        fixture.componentRef.setInput('columns', 10);
        component.ngAfterContentInit();
        expect(console.error).toHaveBeenCalled();
    });
});
