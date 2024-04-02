import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../base/ui-base.component';

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
   * Number (value) to show in the badge; Optional
   */
  value = input<number>();
  
  /**
   * 0 - grey
   * 1 - warning
   * 2 - red
   * 3 - green
   */
  state = input<number>(2);

  /**
   * Size of badge
   * 1 - small
   * 2 - medium
   * 3 - large
   */
  size = input<number>(2);

}
