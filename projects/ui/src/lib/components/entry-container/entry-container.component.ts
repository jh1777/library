import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, input, model, output, signal } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { EntryKeyValueComponent } from '../entry-key-value';
import { EntryMetricComponent } from '../entry-metric';

@Component({
  selector: 'ui-entry-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './entry-container.component.html',
  styleUrl: './entry-container.component.scss'
})
export class EntryContainerComponent extends UIBaseComponent {
  @ContentChildren(EntryKeyValueComponent) keyvalues!: QueryList<EntryKeyValueComponent>;
  @ContentChildren(EntryMetricComponent) metrics!: QueryList<EntryMetricComponent>;

  maxKeyValues = signal(2);
  maxMetrics = signal(1);

  /** Is the entry container clickable? If yes, it has a hover and action style and emits the `onItemClick` output */
  isClickable = input<boolean>(false);
  
  /**
   * If true and if `isClickable` is true -> the selection of the component is retained until the next click (toggles)
   */
  toggleSelect = input<boolean>(false);

  /**
   * Selection state of the component.
   * If `isClickable` is true and `toggleSelect` is true, the selection is retained until the next click.
   */
  isSelected = model<boolean>(false);

  /**
   * Output Event onClick
   * Emmits id() of the component
   */
  onClick = output<string | null>();



  ngAfterContentInit(): void {
    super.limitContentChildren(this.keyvalues, this.maxKeyValues());
    super.limitContentChildren(this.metrics, this.maxMetrics());
  }
  
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