import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    QueryList,
    input,
    signal,
    model,
    output
} from '@angular/core';
import { UIBaseComponent } from '../../../shared/ui-base.component';
import { ButtonComponent } from '../../button';
import { SwitchComponent } from '../../switch';
import { CardStyle } from '../card.models';
import { CommonModule } from '@angular/common';
import { UiErrorComponent } from '../../../shared';
import { AccordionComponent } from '../../accordion';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleExclamation, faInfoCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-card-section-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiErrorComponent, FontAwesomeModule],
  templateUrl: './card-section-basic.component.html',
  styleUrl: './card-section-basic.component.scss'
})
export class CardSectionBasicComponent extends UIBaseComponent {
  @ContentChildren(ButtonComponent) buttons!: QueryList<ButtonComponent>;
  @ContentChildren(SwitchComponent) switches!: QueryList<SwitchComponent>;
  @ContentChildren(AccordionComponent) accordions!: QueryList<AccordionComponent>;

  infoIcon = signal(faInfoCircle);
  successIcon = signal(faCircleCheck);
  warningIcon = signal(faTriangleExclamation);
  errorIcon = signal(faCircleExclamation);

  ngAfterContentInit(): void {
    super.limitContentChildren<SwitchComponent>(this.switches, 1);
    super.limitContentChildren<ButtonComponent>(this.buttons, 2);
    super.limitContentChildren<AccordionComponent>(this.accordions, 1);
  }

  /** INTERNAL - do not modify */
  isLast = signal<boolean>(false);

  /**
   * Text shown as section content
   * Uses `innerHTML` so html formatting can be applied
   * (optional)
   */
  text = input<string>();

  /**
   * Header / Title for this section
   * It will be shown on top - before `text`
   * (optional)
   */
  header = input<string>();

  /**
   * Simple unformatted list that will be shown below the `text`
   * (optional)
   */
  list = input<Array<string>>();

  /**
   * Style of the card section (optional)
   * The section gets a colorized icon at the right edge.
   *
   * - `None` = no icon (default)
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green
   * - `Information` = grey
   *
   * See {@link CardStyle}
   */
  style = input<CardStyle>(CardStyle.None);

  /**
   * Together with setting a `style` you can also set a message in that style.
   * The text color will be set accordingly.
   * If there is no `style` set (== None, default) this input property will be ignored.
   * (optional)
   */
  styledMessage = input<string>();

  /**
   * Shows a colored background if the style is != `None`
   * Default: `false`
   * (optional)
   */
  showStyledBackground = input<boolean>(false);

    /**
     * Selection state of the component.
     * If `isClickable` is true and `toggleSelect` is true, the selection is retained until the next click.
     */
    isSelected = model<boolean>(false);

    /**
     * If true and if `isClickable` is true -> the selection of the component is retained until the next click (toggles)
     */
    toggleSelect = input<boolean>(false);

    /**
     * Output Event onClick
     * Emmits id() of the component
     */
    onClick = output<string | null>();

    /** Is the entry container clickable? If yes, it has a hover and action style and emits the `onItemClick` output */
    isClickable = input<boolean>(false);

    /**
     * On Click event for the Metric
     * @param $event MouseEvent
     */
    public handleClickEvent($event: MouseEvent) {
        if (!this.isClickable())
            return;

        $event.preventDefault();
        $event.stopPropagation();
        if (this.toggleSelect()) {
            this.isSelected.set(!this.isSelected());
        }
        this.onClick.emit(this.id() ?? null);
    }
}
