import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Output, QueryList, input, output, signal } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  angleIcon,
  errorStandardIcon,
  infoStandardIcon,
  successStandardIcon,
  warningStandardIcon,
  ellipsisVerticalIcon,
  ellipsisHorizontalIcon,
  checkIcon,
  timesIcon,
  trashIcon,
  popOutIcon,
  undoIcon,
  copyIcon
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { BadgeComponent } from '../badge/badge.component';
import { UIBaseComponent } from '../../base/ui-base.component';
ClarityIcons.addIcons(
  angleIcon,
  errorStandardIcon,
  infoStandardIcon,
  successStandardIcon,
  warningStandardIcon,
  ellipsisHorizontalIcon,
  ellipsisVerticalIcon,
  checkIcon,
  timesIcon,
  trashIcon,
  undoIcon,
  popOutIcon,
  copyIcon
);

export enum ButtonStyle {
  /** Small standard petrol button without any borders and backgrounds */
  simple_primary = 0,
  /** Small standard red button without any borders and backgrounds */
  simple_destructive = 6,
  /** Primary style button with petrol bg color and white fonts */
  primary = 1,
  /** Secondary style button with grey bg color and white fonts */
  secondary = 2,
  /** Blank outline style button with white fill color and petrol borders */
  outline = 3,
  /** Destructive  style button with red fill color and white fonts */
  destructive = 4,
  /** Confirmation  style button with green fill color and white fonts */
  confirm = 5
}


@Component({
  selector: 'ui-button-v2',
  standalone: true,
  imports: [CommonModule, ClarityModule, UIBaseComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-v2.component.html',
  styleUrl: './button-v2.component.scss'
})
export class ButtonV2Component extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;
  ngAfterContentInit(): void {
    if(this.badges.length > 1) {
      for (let i = 1; i < this.badges.length; i++) {
        this.badges.get(i).hidden.set(true);
      }
    }
  }

  whiteMode = signal<boolean>(false);
 
  label = input<string>();

  style = input<ButtonStyle>(ButtonStyle.primary);

  icon = input<string>(null);

  disabled = input<boolean>(false);

  tooltip = input<string>();

  @Output()
  onClick = new EventEmitter<string>();
  
}
