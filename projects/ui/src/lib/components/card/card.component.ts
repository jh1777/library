import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, effect, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { ButtonComponent } from '../button';
import { SwitchComponent } from '../switch';
import { CardSectionBasicComponent } from './card-section-basic/card-section-basic.component';
import { CardStyle } from './card.models';

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
  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;
  @ContentChildren(SwitchComponent) switches: QueryList<SwitchComponent>;

  constructor() {
    super();
    effect(
      () => {
        for (let index = 0; index < this.buttons.length; index++) {
          const button = this.buttons.get(index);
          button?.whiteMode.set(this.style() != CardStyle.None && this.style() != 0);    
        }
      },
      { allowSignalWrites: true },
    );
  }
  
  ngAfterContentInit(): void {
    super.limitContentChildren<SwitchComponent>(this.switches, 1);
    super.limitContentChildren<ButtonComponent>(this.buttons, 1);
    super.limitContentChildren<CardSectionBasicComponent>(this.sections, 10);

    if (this.style() != CardStyle.None) {
      for (let index = 0; index < this.buttons.length; index++) {
        const button = this.buttons.get(index);
        button?.whiteMode.set(true);    
      }
    }

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
  header = input.required<string>();

  /** Simple unformattted string showed as text content */
  text = input<string>();

  /** 
   * Style of the card (optional)  
   *  The header background and border will get colorized in:  
   * - `None` = grey (default), 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green 
   * 
   * See {@link CardStyle}
   */
  style = input<CardStyle>(CardStyle.None);
}
