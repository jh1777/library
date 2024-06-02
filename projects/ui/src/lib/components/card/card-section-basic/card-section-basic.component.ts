import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../../shared/ui-base.component';
import { ButtonComponent } from '../../button';
import { SwitchComponent } from '../../switch';
import { ClarityModule } from '@clr/angular';
import { CardStyle } from '../card.models';
import {
  ClarityIcons,
  angleIcon, errorStandardIcon, infoStandardIcon, 
  successStandardIcon, warningStandardIcon, ellipsisVerticalIcon, 
  ellipsisHorizontalIcon, popOutIcon, infoCircleIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { CommonModule } from '@angular/common';
import { UiErrorComponent } from '../../../shared';
import { AccordionComponent } from '../../accordion';
ClarityIcons.addIcons(
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, infoCircleIcon,
  warningStandardIcon, ellipsisHorizontalIcon, ellipsisVerticalIcon, popOutIcon
);

@Component({
  selector: 'ui-card-section-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClarityModule, CommonModule, UiErrorComponent],
  templateUrl: './card-section-basic.component.html',
  styleUrl: './card-section-basic.component.scss'
})
export class CardSectionBasicComponent extends UIBaseComponent {
  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;
  @ContentChildren(SwitchComponent) switches: QueryList<SwitchComponent>;
  @ContentChildren(AccordionComponent) accordions: QueryList<AccordionComponent>;

  ngAfterContentInit(): void {
    super.limitContentChildren<SwitchComponent>(this.switches, 1);
    super.limitContentChildren<ButtonComponent>(this.buttons, 2);
    super.limitContentChildren<AccordionComponent>(this.accordions, 1);
  }
  
  /** INTERNAL - do not modify */
  isLast = signal<boolean>(false);

  /** 
   * Text shown as section content  
   * Uses `innerHTML` so html formatting can be applied  
   * (optional)  
   */
  text = input<string>();

  /** 
   * Header / Title for this section  
   * It will be shown on top - before `text`  
   * (optional) 
   */
  header = input<string>();

  /**
   * Simple unformatted list that will be shown below the `text`  
   * (optional)
   */
  list = input<Array<string>>();

  /** 
   * Style of the card section (optional)   
   * The section gets a colorized icon at the right edge. 
   *   
   * - `None` = no icon (default) 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green 
   * - `Information` = grey  
   * 
   * See {@link CardStyle}
   */
  style = input<CardStyle>(CardStyle.None);

  /**
   * Together with setting a `style` you can also set a message in that style.  
   * The text color will be set accordingly.  
   * If there is no `style` set (== None, default) this input property will be ignored.  
   * (optional)
   */
  styledMessage = input<string>();


  showStyledBackground = input<boolean>(false);
}
