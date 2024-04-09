import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input } from '@angular/core';
import { ButtonComponent } from '../button';
import { UIBaseComponent } from '../../shared';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'ui-toolbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;
  @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;

  maxButtons = input<number>(10);
  maxBadges = input<number>(3);

  ngAfterContentInit(): void {
    super.limitContentChildren(this.badges, this.maxBadges());
    super.limitContentChildren(this.buttons, this.maxButtons());
  }
}
