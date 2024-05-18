import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-error',
  standalone: true,
  imports: [],
  template: '{{ errorMessage() }}',
  styleUrl: './ui-error.component.scss'
})
export class UiErrorComponent {
  errorMessage = input<string>();
}
