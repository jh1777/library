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

  ngAfterContentInit(): void {
    super.limitContentChildren<SwitchComponent>(this.switches, 1);
    super.limitContentChildren<ButtonComponent>(this.buttons, 2);
  }
  
  /** INTERNAL - do not modify */
  isLast = signal<boolean>(false);

  /** Simple unformattted string showed as text content */
  text = input.required<string>();

  /** Header / Title for this section (optional) */
  header = input<string>();

  /** 
   * Style of the card (optional)  
   *  The section gets a colorized icon  
   * - `None` = no icon (default), 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green 
   * - `Information` = grey
   * 
   * See {@link CardStyle}
   */
  style = input<CardStyle>(CardStyle.None);
}
