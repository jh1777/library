import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';

@Component({
  selector: 'ui-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
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
   * Switch state (true/false)  
   * Default: false
   */
  state = model<boolean>(false);
}
