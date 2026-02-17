import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIBaseComponent } from '../../../shared';

@Component({
  selector: 'ui-side-menu-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './side-menu-section.component.html',
  styleUrl: './side-menu-section.component.scss'
})
export class SideMenuSectionComponent extends UIBaseComponent {

  /** Optional section label displayed above the entries */
  label = input<string>();

}