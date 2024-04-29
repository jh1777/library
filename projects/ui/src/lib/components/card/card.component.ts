import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { ButtonComponent } from '../button';
import { SwitchComponent } from '../switch';

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
  @ContentChildren(SwitchComponent) switches: QueryList<SwitchComponent>;

  ngAfterContentInit(): void {
    super.limitContentChildren<SwitchComponent>(this.switches, 1);
    super.limitContentChildren<ButtonComponent>(this.buttons, 2);
  }

  /** Main header title of the card - shown at the top */
  header = input<string>();

  /** Simple unformattted string showed as text content */
  text = input<string>();

  /** Set isLoading property which hides content and shows pulsing placeholders */
  isLoading = input<boolean>(false);
}
