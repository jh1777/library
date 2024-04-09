import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input, output, signal } from '@angular/core';
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
    super.limitContentChildren(this.badges, 1);
  }

  /**
   * If the button is in "Simple_XXX" `style` but on a dark background, set this to `true`
   */
  whiteMode = signal<boolean>(false);
 
  /** Button label */
  label = input<string>();

  /** Button main style attribute   
   * 
   * `Simple_primary = 0`: Small standard petrol button without any borders and backgrounds  
   * `Simple_destructive = 6`: Small standard red button without any borders and backgrounds  
   * `Primary = 1`: Primary style button with petrol bg color and white fonts (**default**)  
   * `Secondary = 2`: Secondary style button with grey bg color and white fonts  
   * `Outline = 3`: Blank outline style button with white fill color and petrol borders  
   * `Destructive = 4`: Destructive style button with red fill color and white fonts  
   * `Confirm = 5`: Confirmation style button with green fill color and white fonts  
   */
  style = input<ButtonStyle>(ButtonStyle.Primary);

  /**
   * Clarity Icon Name (optional)  
   * Internally embedded icons:  <i>
   *  _angleIcon_,
      _errorStandardIcon_,
      _infoStandardIcon_,
      _successStandardIcon_,
      _warningStandardIcon_,
      _ellipsisHorizontalIcon_,
      _ellipsisVerticalIcon_,
      _checkIcon_,
      _timesIcon_,
      _trashIcon_,
      _undoIcon_,
      _popOutIcon_,
      _copyIcon_
   */
  icon = input<string>(null);

  /**
   * Use this to disable the button
   */
  disabled = input<boolean>(false);

  /**
   * Set a basic tooltip for the button (HTML title) (optional)
   */
  tooltip = input<string>();

  /**
   * OnClick Event  
   * (event emits the `id()` property. if this is null it emits the button `label()`)
   */
  onClick = output<string>();
}
