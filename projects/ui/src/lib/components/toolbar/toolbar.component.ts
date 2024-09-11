import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input, signal } from '@angular/core';
import { ButtonComponent } from '../button';
import { UIBaseComponent } from '../../shared';
import { BadgeComponent } from '../badge/badge.component';
import { SwitchComponent } from '../switch';
import { ValueTileComponent } from '../value-tile';

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
  @ContentChildren(SwitchComponent) switches: QueryList<SwitchComponent>;
  @ContentChildren(ValueTileComponent) valueTiles: QueryList<ValueTileComponent>;

  /**
   * Text to show at the left side before any sub-components are shown  
   * (optional)  
   */
  text = input<string>();

  maxButtons = input<number>(10);
  maxBadges = input<number>(3);
  maxSwitches = input<number>(3);
  maxValueTiles = input<number>(2);

  //** INTERNAL USE */
  showToolbarText = signal<boolean>(true);

  ngAfterContentInit(): void {
    super.limitContentChildren(this.badges, this.maxBadges());
    super.limitContentChildren(this.buttons, this.maxButtons());
    super.limitContentChildren(this.switches, this.maxSwitches());
    super.limitContentChildren(this.valueTiles, this.maxValueTiles());
  }
}
