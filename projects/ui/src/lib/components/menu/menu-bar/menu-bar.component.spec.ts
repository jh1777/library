import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBarComponent } from './menu-bar.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';

describe('MenuBarComponent', () => {
    let component: MenuBarComponent;
    let fixture: ComponentFixture<MenuBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MenuBarComponent, MenuItemComponent]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuBarComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'test-menu-bar');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have menuItems QueryList', () => {
        expect(component.menuItems).toBeDefined();
    });

    it('should have setActive method', () => {
        expect(component.setActive).toBeDefined();
        expect(typeof component.setActive).toBe('function');
    });
});
