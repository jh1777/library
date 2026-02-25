import { ChangeDetectionStrategy, Component, computed, ContentChildren, inject, input, model, output, QueryList, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { UiToggleSyncService } from '../../../shared/ui-toggle-sync.service';

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
  private readonly toggleSyncService = inject(UiToggleSyncService);

  @ContentChildren(MenuItemComponent) menuItems!: QueryList<MenuItemComponent>;

  menuIcon = signal<IconDefinition>(faBars);
  
  /**
   * If true, a burger menu will be shown on the right side of the menu bar, which can be used to toggle something
   * Use `onBurgerMenuClick` output to react to clicks on the burger menu.
   * There is no built-in functionality for the burger menu, so it can be used as a simple toggle button for example to show/hide a side menu in the parent component.
  */
  showBurgerMenu = input<boolean>(false);
  menuState = model<boolean>(false);
  syncKey = input<string | null>(null);

  resolvedMenuState = computed<boolean>(() => {
    const key = this.getNormalizedSyncKey();

    if (key == null) {
      return this.menuState();
    }

    return this.toggleSyncService.isOpen(key);
  });

  onBurgerMenuClick = output<boolean>();

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
    const key = this.getNormalizedSyncKey();

    if (key == null) {
      this.menuState.set(!this.menuState());
      this.onBurgerMenuClick.emit(this.menuState());
      return;
    }

    const nextState = this.toggleSyncService.toggle(key);
    this.menuState.set(nextState);
    this.onBurgerMenuClick.emit(nextState);
  }

  private getNormalizedSyncKey(): string | null {
    const key = this.syncKey()?.trim();

    if (key == null || key.length === 0) {
      return null;
    }

    return key;
  }
}
