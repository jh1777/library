import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';

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
   * 0 - Grey
   * 1 - Warning
   * 2 - Red
   * 3 - Green
   */
  style = input<number>(2);

  /**
   * Size of badge
   * 1 - small
   * 2 - medium
   * 3 - large
   */
  size = input<number>(2);

}
