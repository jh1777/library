import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { EntryState } from '../models/entryState.model';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisVerticalIcon, ellipsisHorizontalIcon, popOutIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
ClarityIcons.addIcons(
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisHorizontalIcon, ellipsisVerticalIcon, popOutIcon
);

@Component({
  selector: 'ui-entry-key-value',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ClarityModule],
  templateUrl: './entry-key-value.component.html',
  styleUrl: './entry-key-value.component.scss'
})
export class EntryKeyValueComponent {
  public readonly placeholder = "⏹⏹ ";

  hidden = signal<boolean>(false);

  /** Indicates whether the content is still loading */
  isLoading = input<boolean>(false);

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
