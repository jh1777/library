import { ChangeDetectionStrategy, Component, input, model, output, signal } from '@angular/core';
import { CollapsedDirection } from './ui-collapse-button.models';
import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';

//ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'ui-collapse-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './ui-collapse-button.component.html',
  styleUrl: './ui-collapse-button.component.scss'
})
export class UiCollapseButtonComponent {
  
  angleUpIcon = signal(faAngleUp);
  angleDownIcon = signal(faAngleDown);

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
   * Emits the `isCollapsed` state  
   */
  onClick = output<boolean>();

  /**
   * If set to `true` there will be no rotation of the collapse button  
   * Default: `false` 
   */
  noRotation = input<boolean>(false);

  disabled = input<boolean>(false);

}
