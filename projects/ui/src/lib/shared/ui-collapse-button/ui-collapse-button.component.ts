import { Component, input, model, output } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons, angleIcon } from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { CollapsedDirection } from './ui-collapse-button.models';
ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'ui-collapse-button',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './ui-collapse-button.component.html',
  styleUrl: './ui-collapse-button.component.scss'
})
export class UiCollapseButtonComponent {
  
  /**
   * Indicates the collapsed state (Input / Ouput)  
   * Default: `false`  
   */
  isCollapsed = model<boolean>(false);

  /**
   * Optionally change default direction for the isCollapsed == true state    
   * Default: CollapsedDirection.Down  
   * Available States:  
   * - `Down` = 0  
   * - `Up` = 1  
   * - `Left` = 2  
   * - `Right` = 3  
   * 
   * See {@link CollapsedDirection}
   */
  collapsedDirection = input<CollapsedDirection>(CollapsedDirection.Down);

  /**
   * Optional `onClick` handler to trigger any additional actions on consumer  
   */
  onClick = output<boolean>();

  /**
   * If set to `true` there will be no rotation of the collapse button  
   * Default: `false` 
   */
  noRotation = input<boolean>(false);
}
