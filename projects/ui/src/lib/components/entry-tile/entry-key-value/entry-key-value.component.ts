import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisVerticalIcon, ellipsisHorizontalIcon, popOutIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { UIBaseComponent } from '../../../shared';
import { EntryKeyValueState } from './entry-key-value.models';
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
export class EntryKeyValueComponent extends UIBaseComponent {

  /** Indicates whether the content is still loading */
  isLoading = input<boolean>(false);

  /** Label for the header item - shown left */
  label = input.required<string>();

  /** Value for the header item - shown right */
  value = input.required<string>();

  /** Optional: State `EntryKeyValueState` of the Key Value Item 
   * By default or if unset, it is none.
   * The item will get colorized in:
   * - `None` = black (default), 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green
   * - `Dimmed` = grey
  */
  state = input<EntryKeyValueState>(EntryKeyValueState.None);
}
