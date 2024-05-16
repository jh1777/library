import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input } from '@angular/core';
import { UIBaseComponent } from '../../../../shared';
import { BadgeComponent } from '../../../badge/badge.component';
import { SwitchComponent } from '../../../switch/switch.component';

@Component({
  selector: 'ui-accordion-panel-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './accordion-panel-header.component.html',
  styleUrl: './accordion-panel-header.component.scss'
})
export class AccordionPanelHeaderComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;
  @ContentChildren(SwitchComponent) switches: QueryList<SwitchComponent>;

  ngAfterContentInit(): void {
    super.limitContentChildren(this.badges, 1);
    super.limitContentChildren(this.switches, 1);
  }

   /**
   * Title (Header) text to be shown on this Accordion Panel  
   */
   label = input.required<string>();

}
