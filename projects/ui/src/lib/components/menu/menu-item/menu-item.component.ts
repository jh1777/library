import { Component, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared';

@Component({
  selector: 'uic-menu-item',
  standalone: true,
  imports: [],
  template: '',
})
export class MenuItemComponent extends UIBaseComponent {

  /**
   * Label as it will be shown on the page
   */
  label = input<string>();

  /**
   * Angular route to navigate to via `routerLink`.
   */
  route = input<string>();

  /**
   * Is an exact match of route needed?   
   * Default = `true`
   */
  exactMatch = input<boolean>(true);

  /**
   * INTERNAL
   */
  active = signal<boolean>(false);
}
