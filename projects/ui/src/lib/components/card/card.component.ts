import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { ButtonComponent } from '../button';
import { SwitchComponent } from '../switch';
import { CardSectionBasicComponent } from './card-section-basic/card-section-basic.component';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CardSectionBasicComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(CardSectionBasicComponent) sections: QueryList<CardSectionBasicComponent>;

  ngAfterContentInit(): void {
    for (let index = 0; index < this.sections.length; index++) {
      const section = this.sections.get(index);
      if (index == this.sections.length - 1) {
        section?.isLast.set(true);
      } else {
        section?.isLast.set(false);
      }
    }
  }
  
  /** Main header title of the card - shown at the top */
  header = input<string>();

  /** Simple unformattted string showed as text content */
  text = input<string>();

  /** Set isLoading property which hides content and shows pulsing placeholders */
  isLoading = input<boolean>(false);
}
