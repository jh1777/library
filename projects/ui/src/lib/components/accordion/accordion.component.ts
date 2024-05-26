import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';
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
  imports: [ClarityModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent extends UIBaseComponent implements AfterViewInit {
  @ContentChildren(AccordionPanelComponent) panels: QueryList<AccordionPanelComponent>;

  header = input<string>();
  description = input<string>();
  
  ngAfterViewInit(): void {
    // Set isLast & isFirst for styling purposes
    for (let index = 0; index < this.panels.length; index++) {
      const element = this.panels.get(index);
      if (element && index == 0) {
        element.isFirst.set(true);
      }
      if (element && index == this.panels.length - 1) {
        element.isLast.set(true);
      }
    }
  }

}
