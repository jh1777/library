import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, computed, input, model, output, signal } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { UIBaseComponent, UiSpinnerComponent } from '../../shared';
import { ButtonStyle } from './button.models';
import { IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [ UiSpinnerComponent, FontAwesomeModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent extends UIBaseComponent implements AfterContentInit {


  @ContentChildren(BadgeComponent) badges!: QueryList<BadgeComponent>;
  ngAfterContentInit(): void {
    super.limitContentChildren(this.badges, 1);
  }

  /**
   * Used to set the button used in another component to simple only styles (overrides others)  
   * @internal
   */
  simpleOnly = signal<boolean>(false);
  /**
   * If the button is used in another component this can be set to true if needed to enable the
   * styles needed for an icon only simple button (overrides others).   
   * @internal
   */
  iconOnlySimpleStyle = signal<boolean>(false);

  /**
   * If the button is in "Simple_XXX" `style` but on a dark background, set this to `true` (optional)  
   * Default: `false`  
   */
  whiteMode = signal<boolean>(false);
 
  /** Button label */
  label = input<string>();

  /** 
   * Button main style attribute (optional)   
   * Default: `Primary`
   *
   * `Simple_primary = 0`: Small standard petrol button without any borders and backgrounds  
   * `Simple_destructive = 6`: Small standard red button without any borders and backgrounds  
   * `Primary = 1`: Primary style button with petrol bg color and white fonts (**default**)  
   * `Secondary = 2`: Secondary style button with grey bg color and white fonts  
   * `Outline = 3`: Blank outline style button with white fill color and petrol borders  
   * `Destructive = 4`: Destructive style button with red fill color and white fonts  
   * `Confirm = 5`: Confirmation style button with green fill color and white fonts  
   * See {@link ButtonStyle}
   */
  style = input<ButtonStyle>(ButtonStyle.Primary);

  /**
   * Icon Name (from Font Awesome - optional)  
   */
  icon = input<IconDefinition>();

  /**
   * Use this to disable the button (optional)   
   * Input / Output  
   * Default: `false`
   */
  isDisabled = model<boolean>(false);

  /**
   * OnClick Event  
   * (event emits the `MouseEvent` property)
   */
  onClick = output<MouseEvent>();

  /**
   * On Click event for the Button
   * @param $event MouseEvent
   */
  public handleClickEvent($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.onClick.emit($event);
  }
}
