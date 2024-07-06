import { Component, input, output } from '@angular/core';

@Component({
  selector: 'uic-navigation-section-item',
  standalone: true,
  imports: [],
  template: ''
})
export class NavigationSectionItemComponent {

  label = input.required<string>();

  isActive = input<boolean>(false);

  onItemClick = output<MouseEvent>();

  onDeleteItemClick = output<MouseEvent>();

}
