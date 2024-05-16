import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input, model, signal } from '@angular/core';
import { UIBaseComponent, UiCollapseButtonComponent } from '../../../shared';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BadgeComponent } from '../../badge/badge.component';
import { AccordionPanelHeaderComponent } from './accordion-panel-header/accordion-panel-header.component';

@Component({
  selector: 'ui-accordion-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UiCollapseButtonComponent, AccordionPanelHeaderComponent, BadgeComponent],
  templateUrl: './accordion-panel.component.html',
  styleUrl: './accordion-panel.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('false', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      state('true', style({ height: '0px', opacity: 0,overflow: 'hidden' })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ])
  ]
})
export class AccordionPanelComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(AccordionPanelHeaderComponent) headers: QueryList<AccordionPanelHeaderComponent>;

  ngAfterContentInit(): void {
    super.limitContentChildren(this.headers, 1);
  }

  /**
   * Indicates / Emits if this Accordion Panel is collapsed    
   * Input / Output  
   * Default: `true`
   */
  isCollapsed = model<boolean>(true);

  /**
   * INTERNAL USE
   */
  isFirst = signal<boolean>(false);
  /**
   * INTERNAL USE
   */
  isLast = signal<boolean>(false);
}
