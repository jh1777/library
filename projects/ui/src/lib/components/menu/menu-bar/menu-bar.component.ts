import { ChangeDetectionStrategy, Component, ContentChildren, input, QueryList, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { MenuItemComponent } from '../menu-item/menu-item.component';

import { RouterModule } from '@angular/router';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'ui-menu-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent extends UIBaseComponent {
  @ContentChildren(MenuItemComponent) menuItems!: QueryList<MenuItemComponent>;

  menuIcon = signal<IconDefinition>(faBars);
  
  /**
   * If true, a burger menu will be shown on the right side of the menu bar, which can be used to toggle something
   * If this is set to true or not can be queried using property `menuState`, which can be used by parent components to decide whether to show a side menu or not.
   * Ther is no built-in functionality for the burger menu, so it can be used as a simple toggle button for example to show/hide a side menu in the parent component.
  */
  showBurgerMenu = input<boolean>(false);
  menuState = signal<boolean>(false);

  setActive(item: MenuItemComponent) {
    this.menuItems.toArray().forEach(i => {
      if(i === item) {
        i.isActive.set(true);
      } else {
        i.isActive.set(false);
      }
    });
  }

  toggleMenu() {
    this.menuState.set(!this.menuState());
  }
}
