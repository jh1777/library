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
    super.limitContentChildren<ButtonComponent>(this.buttons, 3);
  }

  /** Main header title of the card - shown at the top */
  header = input<string>();

  /** Simple unformattted string showed as text content */
  text = input<string>();

  /** Set isLoading property which hides content and shows pulsing placeholders */
  isLoading = input<boolean>(false);
}
