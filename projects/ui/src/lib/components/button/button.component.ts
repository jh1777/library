import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Output, QueryList, input, signal } from '@angular/core';
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
import { UIBaseComponent } from '../../shared';
import { ButtonStyle } from './button.models';
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


@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [ClarityModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent extends UIBaseComponent implements AfterContentInit {
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
