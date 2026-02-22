import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { UIBaseComponent } from '../../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faArrowDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ListItemKpiEntry } from '../../list.models';

@Component({
  selector: 'ui-list-item-kpi',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule, DecimalPipe, CurrencyPipe],
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
    style = input<'positive' | 'negative' | 'neutral' | 'auto'>('auto');
    currency = input<'EUR' | 'USD' | 'none'>('none');
    invert = input<boolean>(false);

    readonly icons = { faArrowUp, faArrowDown, faMinus };

    calculatedStyle = computed(() => {
        if (this.style() === 'auto') {
            if (this.delta() === null || this.delta() === 0) return 'neutral';
            if (this.invert()) {
                return this.delta()! > 0 ? 'negative' : 'positive';
            } else {
                return this.delta()! > 0 ? 'positive' : 'negative';
            }
        } else {
            return this.style();
        }
    });
    
    delta = computed(() => {
        const ref = this.refValue();
        const result = ref !== null ? this.value() - ref : null;
        return result;
    });

    percentage = computed(() => {
        const ref = this.refValue();
        if (ref === null || ref === 0) {
            return null;
        }

        const result = ((this.value() - ref) / ref) * 100;
        return Object.is(result, -0) ? 0 : result;
    });

    deltaIcon = computed(() => {
        const d = this.delta();
        if (d !== null && d > 0) return faArrowUp;
        if (d !== null && d < 0) return faArrowDown;
        return faMinus;
    });
}