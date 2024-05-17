import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, effect, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../../../shared';
import { BadgeComponent } from '../../../badge/badge.component';
import { ButtonComponent } from '../../../button/button.component';
import { SwitchComponent } from '../../../switch/switch.component';
import {
  ClarityIcons,
  infoStandardIcon
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { ClarityModule } from '@clr/angular';
ClarityIcons.addIcons(infoStandardIcon);

@Component({
  selector: 'ui-accordion-panel-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './accordion-panel-header.component.html',
  styleUrl: './accordion-panel-header.component.scss'
})
export class AccordionPanelHeaderComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(BadgeComponent) badges: QueryList<BadgeComponent>;
  @ContentChildren(SwitchComponent) switches: QueryList<SwitchComponent>;
  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;

  
  constructor() {
    super();
    effect(
      () => {
        this.buttons.toArray().forEach(button => {
          button.disabled.set(this.disabledPanel());
        });

        this.switches.toArray().forEach(switchItem => {
          switchItem.disabled.set(this.disabledPanel());
        });
      },
      { allowSignalWrites: true },
    );
  }
  

  ngAfterContentInit(): void {
    super.limitContentChildren(this.badges, 1);
    super.limitContentChildren(this.switches, 1);
    super.limitContentChildren(this.buttons, 3);

    if (this.buttons.length > 0) {
      this.buttons.toArray().forEach(button => {
        button.simpleOnly.set(true);
      });
    }
  }

   /**
   * Title (Header) text to be shown on this Accordion Panel  
   */
   label = input.required<string>();

 
   /**
    * INTERNAL USE   
    * Used to tell this Accordion Panel Header component that its parent is disabled  
    */
   disabledPanel = signal<boolean>(false);
}
