import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisVerticalIcon, ellipsisHorizontalIcon, popOutIcon
} from "@cds/core/icon";
import '@cds/core/icon/register.js';
import { UIBaseComponent, UiErrorComponent } from '../../shared';
import { EntryKeyValueStyle } from './entry-key-value.models';
ClarityIcons.addIcons(
  angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisHorizontalIcon, ellipsisVerticalIcon, popOutIcon
);

@Component({
  selector: 'ui-entry-key-value',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ClarityModule, UiErrorComponent],
  templateUrl: './entry-key-value.component.html',
  styleUrl: './entry-key-value.component.scss'
})
export class EntryKeyValueComponent extends UIBaseComponent {

  /** Label for the header item - shown left */
  label = input.required<string>();

  /** Value for the header item - shown right */
  value = input.required<string>();

  /** 
   * Style `EntryKeyValueState` of the Key Value Item 
   * Optional; By default or if unset = `None`
   * The item will get colorized in:
   * - `None` = black (default), 
   * - `Attention` = orange
   * - `Error` = red
   * - `Success` = green
   * - `Dimmed` = grey
  */
  style = input<EntryKeyValueStyle>(EntryKeyValueStyle.None);

  /**
   * Makes the Key and Value of bigger font size, the icon as well if present
   */
  big = input<boolean>(false);
}
