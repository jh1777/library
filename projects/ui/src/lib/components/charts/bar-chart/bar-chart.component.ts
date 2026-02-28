import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ui-bar-chart',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {

  data = input.required<{label: string, value: number}[]>();
  barColor = input<string>('steelblue');
  textColor = input<string>('#ffff');
  height = input<number>(200);
  width = input<number>(400);
  animations = input<boolean>(true);
  showXAxis = input<boolean>(true);
  

  barSlotWidth = computed(() => this.width() / this.data().length);
  barSlotCenterOffset = computed(() => this.barSlotWidth() / 2);

  getBarSlotAnchorX(i: number): number {
    return i * this.barSlotWidth();
  }
  barWidthPercent = input<number>(90);
  barWidth = computed<number>(() => this.barSlotWidth() * (this.barWidthPercent() / 100));

  // Maximalwert berechnen (für Skalierung)
  maxValue = computed(() => Math.max(...this.data().map(d => d.value), 0));

  showPercentage = input<boolean>(true);
  showValue = input<boolean>(true);

  getPercentage(value: number): string {
    const percentage = this.data().reduce((sum, d) => sum + d.value, 0) > 0 ? (value / this.data().reduce((sum, d) => sum + d.value, 0)) * 100 : 0;
    return `${percentage.toFixed(1)}%`;
  }

  heightOffset = computed(() => this.showValue() && this.showPercentage() ? 40 : 30);
}
