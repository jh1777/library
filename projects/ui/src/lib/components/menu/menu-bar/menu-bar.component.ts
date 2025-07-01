import { ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { MenuItemComponent } from '../menu-item/menu-item.component';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-menu-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent extends UIBaseComponent {
  @ContentChildren(MenuItemComponent) menuItems!: QueryList<MenuItemComponent>;

  setActive(item: MenuItemComponent) {
    this.menuItems.toArray().forEach(i => {
      if(i === item) {
        i.isActive.set(true);
      } else {
        i.isActive.set(false);
      }
    });
  }

}
