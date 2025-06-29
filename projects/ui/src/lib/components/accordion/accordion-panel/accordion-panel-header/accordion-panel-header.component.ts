import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, effect, input, signal } from '@angular/core';
import { UIBaseComponent } from '../../../../shared';
import { BadgeComponent } from '../../../badge/badge.component';
import { ButtonComponent } from '../../../button/button.component';
import { SwitchComponent } from '../../../switch/switch.component';
import { AccordionPanelHeaderStyle } from '../../accordion.models';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleExclamation, faInfoCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-accordion-panel-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ FontAwesomeModule ],
  templateUrl: './accordion-panel-header.component.html',
  styleUrl: './accordion-panel-header.component.scss'
})
export class AccordionPanelHeaderComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(BadgeComponent) badges!: QueryList<BadgeComponent>;
  @ContentChildren(SwitchComponent) switches!: QueryList<SwitchComponent>;
  @ContentChildren(ButtonComponent) buttons!: QueryList<ButtonComponent>;

  infoIcon = signal(faInfoCircle);
  successIcon = signal(faCircleCheck);
  warningIcon = signal(faTriangleExclamation);
  errorIcon = signal(faCircleExclamation);

  constructor() {
    super();
    effect(
      () => {
        this.buttons?.toArray().forEach(button => {
          button.isDisabled.set(this.disabledPanel());
        });

        this.switches?.toArray().forEach(switchItem => {
          switchItem.isDisabled.set(this.disabledPanel());
        });
      }
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
   * Style of the Accordion Panel (optional)  
   *  The section gets a colorized icon  
   * - `None` = no icon (default), 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green
   * 
   * See {@link AccordionPanelHeaderStyle}
   */
  style = input<AccordionPanelHeaderStyle>(AccordionPanelHeaderStyle.None);
 
   /**
    * INTERNAL USE   
    * Used to tell this Accordion Panel Header component that its parent is disabled  
    */
   disabledPanel = signal<boolean>(false);
}
