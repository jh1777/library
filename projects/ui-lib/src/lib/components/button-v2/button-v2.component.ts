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
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { BadgeComponent } from '../badge/badge.component';
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
);

export enum ButtonStyle {
  noborder = 0,
  primary = 1,
  secondary = 2,
  outline = 3
}


@Component({
  selector: 'ui-button-v2',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-v2.component.html',
  styleUrl: './button-v2.component.scss'
})
export class ButtonV2Component implements AfterContentInit {
  @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;
  ngAfterContentInit(): void {
    if(this.badges.length > 1) {
      for (let i = 1; i < this.badges.length; i++) {
        this.badges.get(i).hidden.set(true);
      }
    }
  }

  hidden = signal<boolean>(false);
  
  data = input<any>();
  id = input<string>();

  label = input.required<string>();

  style = input<ButtonStyle>(ButtonStyle.primary);

  icon = input<string>(null);

  disabled = input<boolean>(false);

  tooltip = input<string>();

  @Output()
  onClick = new EventEmitter<string>();
  
}
