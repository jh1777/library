import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, input, signal } from '@angular/core';
import { ChartDataSet } from '../chart.models';
import { UIBaseComponent } from '../../../shared';

@Component({
  selector: 'ui-bar-chart',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent extends UIBaseComponent implements AfterViewInit {

  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  dataSet = input.required<ChartDataSet>();
  barColor = input<string>('steelblue');
  textColor = input<string>('#ffff');
  height = input<number>(200);
  width = input<number>(400);
  svgWidth = input<string | number | null>(null);
  animations = input<boolean>(true);
  showXAxis = input<boolean>(true);
  showPercentage = input<boolean>(true);
  showValue = input<boolean>(true);
  showXAxisLabels = input<boolean>(true);
  roudedCorners = input<number>(5);
  autoScaleText = input<boolean>(true);

  private containerWidth = signal(0);

  resolvedSvgWidth = computed(() => this.svgWidth() ?? this.width());

  chartWidth = computed(() => {
    const svgWidth = this.svgWidth();
    if (typeof svgWidth === 'number') {
      return svgWidth;
    }

    if (typeof svgWidth === 'string') {
      if (svgWidth.includes('%')) {
        return this.containerWidth() > 0 ? this.containerWidth() : this.width();
      }

      const parsedWidth = Number.parseFloat(svgWidth);
      if (Number.isFinite(parsedWidth)) {
        return parsedWidth;
      }
    }

    return this.width();
  });

  barSlotWidth = computed(() => this.dataSet().data.length > 0 ? this.chartWidth() / this.dataSet().data.length : 0);
  barSlotCenterOffset = computed(() => this.barSlotWidth() / 2);

  constructor() {
    super();
    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.updateContainerWidth();
    this.resizeObserver = new ResizeObserver(() => this.updateContainerWidth());
    this.resizeObserver.observe(this.hostElement.nativeElement);
  }

  private updateContainerWidth(): void {
    this.containerWidth.set(this.hostElement.nativeElement.clientWidth);
  }

  getBarSlotAnchorX(i: number): number {
    return i * this.barSlotWidth();
  }
  barWidthPercent = input<number>(90);
  barWidth = computed<number>(() => this.barSlotWidth() * (this.barWidthPercent() / 100));

  // Maximalwert berechnen (für Skalierung)
  maxValue = computed(() => Math.max(...this.dataSet().data.map(d => d.value), 0));

  getPercentage(value: number): string {
    const total = this.dataSet().data.reduce((sum, d) => sum + d.value, 0);
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return `${percentage.toFixed(1)}%`;
  }

  textScale = computed(() => {
    if (!this.autoScaleText()) {
      return 1;
    }

    const widthScale = this.chartWidth() / 400;
    const heightScale = this.height() / 200;
    const scale = Math.min(widthScale, heightScale);
    return Math.max(0.55, Math.min(1, scale));
  });

  valueFontSize = computed(() => Math.max(8, Math.round(12 * this.textScale())));
  percentageFontSize = computed(() => Math.max(8, Math.round(12 * this.textScale())));
  xLabelFontSize = computed(() => Math.max(7, Math.round(10 * this.textScale())));

  valueTopGap = computed(() => this.showPercentage() ? Math.max(10, 22 * this.textScale()) : Math.max(8, 10 * this.textScale()));
  percentageTopGap = computed(() => this.showValue() ? Math.max(6, 7 * this.textScale()) : Math.max(8, 10 * this.textScale()));
  xLabelOffset = computed(() => this.showXAxis() ? Math.max(12, 20 * this.textScale()) : Math.max(10, 15 * this.textScale()));
  xAxisTickSize = computed(() => Math.max(4, 7 * this.textScale()));

  bottomPadding = computed(() => {
    if (this.showXAxisLabels()) {
      const labelSpace = this.xLabelOffset() + this.xLabelFontSize();
      return this.showXAxis() ? labelSpace + 2 : labelSpace;
    }

    if (this.showXAxis()) {
      return this.xAxisTickSize() + 3;
    }

    return 0;
  });

  svgHeight = computed(() => this.height() + this.bottomPadding());

  heightOffset = computed(() => this.showValue() && this.showPercentage() ? this.height() * 0.2 : this.height() * 0.1);
}
