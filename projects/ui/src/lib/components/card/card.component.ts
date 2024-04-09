import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { ButtonComponent } from '../button';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent extends UIBaseComponent implements AfterContentInit {

  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;

  ngAfterContentInit(): void {
    /*
    if (this.buttons.length > 2) {
      console.error("Maximum number of buttons in a card is 3");
    }
    for (let index = 0; index < this.buttons.length; index++) {
      const element = this.buttons.get(index);
      if (index > 2) {
        element.hidden.set(true);
      }
    }
    */

    super.limitContentChildren<ButtonComponent>(this.buttons, 3);
  }

  /** Main title of the card - shown at the top */
  title = input<string>();

  /** Simple unformattted string showed as text content */
  text = input<string>();

  /** Set isLoading property which hides content and shows pulsing placeholders */
  isLoading = input<boolean>(false);
}
