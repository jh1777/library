import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, effect, input, model, output } from '@angular/core';
import { UIBaseComponent, UiErrorComponent } from '../../shared';
import { ButtonComponent } from '../button';
import { SwitchComponent } from '../switch';
import { CardSectionBasicComponent } from './card-section-basic/card-section-basic.component';
import { CardStyle } from './card.models';
import { BadgeComponent } from '../badge';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [UiErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent extends UIBaseComponent implements AfterContentInit {
  @ContentChildren(CardSectionBasicComponent) sections!: QueryList<CardSectionBasicComponent>;
  @ContentChildren(ButtonComponent) buttons!: QueryList<ButtonComponent>;
  @ContentChildren(SwitchComponent) switches!: QueryList<SwitchComponent>;
  @ContentChildren(BadgeComponent) badges!: QueryList<BadgeComponent>;

  constructor() {
    super();
    effect(
      () => {
        if (this.buttons) {
          for (let index = 0; index < this.buttons.length; index++) {
            const button = this.buttons.get(index);
            button?.whiteMode.set(this.style() != CardStyle.None && this.style() != 0);    
          }
        }
      }
    );
  }
  
  ngAfterContentInit(): void {
    super.limitContentChildren<SwitchComponent>(this.switches, 1);
    super.limitContentChildren<ButtonComponent>(this.buttons, 1);
    super.limitContentChildren<BadgeComponent>(this.badges, 1);

    if (this.style() != CardStyle.None) {
      for (let index = 0; index < this.buttons.length; index++) {
        const button = this.buttons.get(index);
        button?.whiteMode.set(true);    
      }
    }

    for (let index = 0; index < this.sections.length; index++) {
      const section = this.sections.get(index);
      if (index == this.sections.length - 1) {
        section?.isLast.set(true);
      } else {
        section?.isLast.set(false);
      }
    }
  }
  
  /** Main header title of the card - shown at the top */
  header = input.required<string>();

  /** Header of the card - shown in right slot of the header */
  headerRight = input<string>();

  /** 
   * Style of the card (optional)  
   *  The header background and border will get colorized in:  
   * - `None` = grey (default), 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green 
   * - `Highlight` = petrol
   * 
   * See {@link CardStyle}
   */
  style = input<CardStyle>(CardStyle.None);

  // SELECTION ----------------------------------------------

  /**
   * If true and if `isClickable` is true -> the selection of the component is retained until the next click (toggles)
   */
  toggleSelect = input<boolean>(false);

  /**
   * Selection state of the component.
   * If `isClickable` is true and `toggleSelect` is true, the selection is retained until the next click.
   */
  isSelected = model<boolean>(false);

  /** Is the entry container clickable? If yes, it has a hover and action style and emits the `onItemClick` output */
  isClickable = input<boolean>(false);

  /**
   * Output Event onClick
   * Emmits id() of the component
   */
  onClick = output<string | null>();

  // --------------------------------------------------------
  
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
