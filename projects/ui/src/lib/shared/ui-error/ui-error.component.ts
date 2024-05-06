import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-error',
  standalone: true,
  imports: [],
  template: '<div class="ui-error" [class.no-scrolling]="noScroll() == true">{{ errorMessage() }}</div>',
  styleUrl: './ui-error.component.scss'
})
export class UiErrorComponent {

  errorMessage = input<string>();

  noScroll = input<boolean>(false);
}
