import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'uic-menu-item',
  standalone: true,
  imports: [],
  template: '',
})
export class MenuItemComponent {

  label = input<string>();

  route = input<string>();

  exactMatch = input<boolean>();

  active = signal<boolean>(false);
}
