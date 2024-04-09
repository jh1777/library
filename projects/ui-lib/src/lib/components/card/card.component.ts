import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../base/ui-base.component';
import { ButtonV2Component } from '../button-v2/button-v2.component';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent extends UIBaseComponent implements AfterContentInit {
  public readonly placeholder = '⏹⏹ ';

  @ContentChildren(ButtonV2Component) buttons: QueryList<ButtonV2Component>;

  ngAfterContentInit(): void {
    if (this.buttons.length > 3) {
      console.error("Maximum number of buttons in a card is 3");
    }
    for (let index = 0; index < this.buttons.length; index++) {
      const element = this.buttons.get(index);
      if (index > 3) {
        element.hidden.set(true);
      }
    }
  }

  /** Main title of the card - shown at the top */
  title = input<string>();

  /** Simple unformattted string showed as text content */
  text = input<string>();

  isLoading = input<boolean>(false);
}
