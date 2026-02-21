import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { UIBaseComponent } from '../../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faArrowDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ListItemKpiEntry } from '../../list.models';
import { BadgeComponent } from "ui";


@Component({
  selector: 'ui-list-item-kpi',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule, DecimalPipe, CurrencyPipe, BadgeComponent],
  templateUrl: './list-item-kpi.component.html',
  styleUrls: ['./list-item-kpi.component.scss']
})
export class ListItemKpiComponent extends UIBaseComponent {

    kpiData = computed<ListItemKpiEntry>(() => ({
        label: this.label(),
        value: this.value(),
        refValue: this.refValue(),
        delta: this.delta(),
        percentage: this.percentage(),
        style: this.style()
    }));

    value = input.required<number>();
    label = input<string | null>(null);
    refValue = input<number | null>(null);
    showDelta = input<boolean>(false);
    showPercentage = input<boolean>(false);
    style = input<'positive' | 'negative' | 'neutral'>('neutral');
    currency = input<'EUR' | 'USD' | 'none'>('none');

    readonly icons = { faArrowUp, faArrowDown, faMinus };

    delta = computed(() => {
        const ref = this.refValue();
        const result = ref !== null ? this.value() - ref : null;
        return result;
    });

    percentage = computed(() => {
        const ref = this.refValue();
        const result =  ref !== null && ref !== 0 ? ((this.value() - ref) / Math.abs(ref)) * 100 : null;
        return result;
    });

    deltaIcon = computed(() => {
        const d = this.delta();
        if (d !== null && d > 0) return faArrowUp;
        if (d !== null && d < 0) return faArrowDown;
        return faMinus;
    });
}