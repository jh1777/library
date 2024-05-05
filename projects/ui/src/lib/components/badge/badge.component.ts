import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { BadgeStyle } from './badge.models';

@Component({
  selector: 'ui-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent extends UIBaseComponent {

  /**
   * Text label to show in the badge (optional)
   */
  label = input<string>();

  /**
   * Number (value) to show in the badge color circle (optional)
   */
  value = input<number>();
  
  /**
   * None = 0 (Grey)
   * Attention = 1
   * Error = 2 (default)
   * Success = 3
   */
  style = input<BadgeStyle>(BadgeStyle.Error);

  /**
   * Size of badge
   * 1 - small
   * 2 - medium
   * 3 - large
   */
  size = input<number>(2);

}
