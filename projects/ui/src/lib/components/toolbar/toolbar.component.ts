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
    if(this.badges.length >= this.maxBadges()) {
      for (let i = this.maxBadges() - 1; i < this.badges.length; i++) {
        this.badges.get(i).hidden.set(true);
      }
    }
    if(this.buttons.length >= this.maxButtons()) {
      for (let i = this.maxButtons() - 1; i < this.buttons.length; i++) {
        this.buttons.get(i).hidden.set(true);
      }
    }
  }
}
