import { Component, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared';

@Component({
  selector: 'uic-menu-item',
  standalone: true,
  imports: [],
  template: '',
})
export class MenuItemComponent extends UIBaseComponent {

  label = input<string>();

  route = input<string>();

  exactMatch = input<boolean>();

  active = signal<boolean>(false);
}
