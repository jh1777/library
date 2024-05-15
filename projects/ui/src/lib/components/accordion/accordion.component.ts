import { ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { UIBaseComponent, UiCollapseButtonComponent } from '../../shared';
import { AccordionPanelComponent } from './accordion-panel/accordion-panel.component';
import {
  ClarityIcons,
  angleIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { ClarityModule } from '@clr/angular';
ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'ui-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ClarityModule, UiCollapseButtonComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent extends UIBaseComponent {

  @ContentChildren(AccordionPanelComponent) panels: QueryList<AccordionPanelComponent>;


  toggleCollapsedPanel(panel: AccordionPanelComponent) {
    if (!panel.isCollapsed()) {
      this.panels.toArray().forEach(p => {
        if (p !== panel) {
          p.isCollapsed.set(true);
        }
      });
    }
  }
}
