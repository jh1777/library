import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { UIBaseComponent } from '../../../../shared';
import { ListComponent } from '../../list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faArrowDown, faMinus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'ui-list-item-kpi',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule, DecimalPipe, CurrencyPipe],
  templateUrl: './list-item-kpi.component.html',
  styleUrls: ['./list-item-kpi.component.scss']
})
export class ListItemKpiComponent extends UIBaseComponent {
    protected parentComponent = inject(ListComponent, { optional: true });

    value = input.required<number>();
    label = input<string>('');
    refValue = input<number | null>(null);
    showDelta = input<boolean>(false);
    showPercentage = input<boolean>(false);
    style = input<'positive' | 'negative' | 'neutral'>('neutral');
    currency = input<'EUR' | 'USD' | 'none'>('none');

    readonly icons = { faArrowUp, faArrowDown, faMinus };

    delta = computed(() => {
        const ref = this.refValue();
        return ref !== null ? this.value() - ref : null;
    });

    percentage = computed(() => {
        const ref = this.refValue();
        return ref !== null && ref !== 0 ? ((this.value() - ref) / Math.abs(ref)) * 100 : null;
    });

    deltaIcon = computed(() => {
        const d = this.delta();
        if (d !== null && d > 0) return faArrowUp;
        if (d !== null && d < 0) return faArrowDown;
        return faMinus;
    });
}