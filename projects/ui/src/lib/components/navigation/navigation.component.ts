import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-navigation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent extends UIBaseComponent {
  
  angleIcon = signal(faAngleDown);

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
