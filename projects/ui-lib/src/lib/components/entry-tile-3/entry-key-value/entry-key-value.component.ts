import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EntryState } from '../models/entryState.model';

@Component({
  selector: 'ui-entry-key-value',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './entry-key-value.component.html',
  styleUrl: './entry-key-value.component.scss'
})
export class EntryKeyValueComponent {
  /** Label for the header item - shown left */
  label = input.required<string>();

  /** Value for the header item - shown right */
  value = input.required<string>();

  /** Optional: State `EntryState` of the Item (`none`, `attention`, `error` or `success`) 
   * By default or if unset, it is none.
   * The item will get colorized in:
   * - `none` = grey (default), 
   * - `attention` = orange
   * - `error` = red
   * - `success` = green
  */
  state = input<EntryState>(EntryState.none);
}
