import { Component, input } from '@angular/core';
import { UIBaseComponent } from '../../base/ui-base.component';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent extends UIBaseComponent {

  title = input<string>();
  text = input<string>();
}
