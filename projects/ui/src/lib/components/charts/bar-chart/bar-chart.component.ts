import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, input, signal } from '@angular/core';

@Component({
  selector: 'ui-bar-chart',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements AfterViewInit {

  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  data = input.required<{label: string, value: number}[]>();
  barColor = input<string>('steelblue');
  textColor = input<string>('#ffff');
  height = input<number>(200);
  width = input<number>(400);
  svgWidth = input<string | number | null>(null);
  animations = input<boolean>(true);
  showXAxis = input<boolean>(true);

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

  barSlotWidth = computed(() => this.data().length > 0 ? this.chartWidth() / this.data().length : 0);
  barSlotCenterOffset = computed(() => this.barSlotWidth() / 2);

  constructor() {
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
  maxValue = computed(() => Math.max(...this.data().map(d => d.value), 0));

  showPercentage = input<boolean>(true);
  showValue = input<boolean>(true);

  getPercentage(value: number): string {
    const total = this.data().reduce((sum, d) => sum + d.value, 0);
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return `${percentage.toFixed(1)}%`;
  }

  heightOffset = computed(() => this.showValue() && this.showPercentage() ? 40 : 30);
}
