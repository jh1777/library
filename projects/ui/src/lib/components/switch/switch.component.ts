import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  infoStandardIcon
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
ClarityIcons.addIcons(infoStandardIcon);

@Component({
  selector: 'ui-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  animations: [
    trigger('switchPosition', [
      state('false', style({ visibility: AUTO_STYLE })),
      state('true', style({ transform: 'translateX(85%)', visibility: AUTO_STYLE })),
      transition('false => true',  animate('100ms')),
      transition('true => false', animate('100ms'))
    ])
  ]
})
export class SwitchComponent extends UIBaseComponent {

  /**
   * Label for the switch (optional)
   */
  label = input<string>();

  /**
   * Switch state (boolean)  
   * Input / Output  
   * Default: `false`
   */
  state = model<boolean>(false);

   /**
   * If set to `true` this Switch is disabled and can't be clicked / toggled (optional)  
   * Default: `false`  
   */
  disabled = model<boolean>(false);

  /**
   * On click event to toggle the Switch
   * @param $event MouseEvent
   */
  public handleClickEvent($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.state.set(!this.state());
  }
}
