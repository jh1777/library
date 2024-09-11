import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import {
  ClarityIcons,
  angleIcon,
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'ui-navigation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClarityModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent extends UIBaseComponent {
  
  constructor() {
    super();
    ClarityIcons.addIcons(angleIcon);
  }

  // LOGO
  logoPath = input<string>();
  logoHeader = input.required<string>();

  // USER
  userImagePath = input<string>();
  userName = input<string>();
  userSubtitle = input<string>();
  onUserClick = output<MouseEvent>();

  userClicked($event: MouseEvent): void {
    this.onUserClick.emit($event);
  }
}
