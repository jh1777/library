import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, input, signal } from '@angular/core';
import { ChartDataPoint, ChartDataSet, ChartType } from '../chart.models';
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
  roundedCorners = input<number>(5);
  autoScaleText = input<boolean>(true);
  chartType = input<ChartType>('bar');
  xLabelOverflow = input<'none' | 'truncate' | 'hide'>('none');
  showStackValues = input<boolean>(false);

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

  chartAreaHeight = computed(() => this.height() - this.heightOffset());

  isStacked = computed(() => this.chartType() === 'stacked-bar');

  hasStackSegments(dataPoint: ChartDataPoint): boolean {
    return Array.isArray(dataPoint.stacks) && dataPoint.stacks.length > 0;
  }

  getDataPointTotal(dataPoint: ChartDataPoint): number {
    if (this.isStacked() && this.hasStackSegments(dataPoint)) {
      return dataPoint.stacks!.reduce((sum, segment) => sum + Math.max(0, segment.value), 0);
    }

    return Math.max(0, dataPoint.value);
  }

  // Maximalwert berechnen (für Skalierung)
  maxValue = computed(() => Math.max(...this.dataSet().data.map((dataPoint) => this.getDataPointTotal(dataPoint)), 0));

  scaleDenominator = computed(() => this.maxValue() > 0 ? this.maxValue() : 1);

  getBarHeight(value: number): number {
    return (Math.max(0, value) / this.scaleDenominator()) * this.chartAreaHeight();
  }

  getBarTopY(value: number): number {
    return this.height() - this.getBarHeight(value);
  }

  getStackSegmentValue(dataPoint: ChartDataPoint, segmentIndex: number): number {
    if (!dataPoint.stacks || !dataPoint.stacks[segmentIndex]) {
      return 0;
    }

    return Math.max(0, dataPoint.stacks[segmentIndex].value);
  }

  getStackAccumulatedBefore(dataPoint: ChartDataPoint, segmentIndex: number): number {
    if (!dataPoint.stacks || segmentIndex <= 0) {
      return 0;
    }

    return dataPoint.stacks
      .slice(0, segmentIndex)
      .reduce((sum, segment) => sum + Math.max(0, segment.value), 0);
  }

  getStackSegmentHeight(dataPoint: ChartDataPoint, segmentIndex: number): number {
    return this.getBarHeight(this.getStackSegmentValue(dataPoint, segmentIndex));
  }

  getStackSegmentTopY(dataPoint: ChartDataPoint, segmentIndex: number): number {
    const stackedToCurrent = this.getStackAccumulatedBefore(dataPoint, segmentIndex) + this.getStackSegmentValue(dataPoint, segmentIndex);
    return this.getBarTopY(stackedToCurrent);
  }

  getStackSegmentColor(dataPoint: ChartDataPoint, segmentIndex: number): string {
    const segmentColor = dataPoint.stacks?.[segmentIndex]?.color;
    return segmentColor || dataPoint.color || this.barColor();
  }

  getStackSegmentOpacity(dataPoint: ChartDataPoint, segmentIndex: number): number {
    const segmentOpacity = dataPoint.stacks?.[segmentIndex]?.opacity;
    return segmentOpacity ?? dataPoint.opacity ?? 1;
  }

  getDisplayedValue(dataPoint: ChartDataPoint): number {
    return this.getDataPointTotal(dataPoint);
  }

  getPercentage(value: number): string {
    const total = this.dataSet().data.reduce((sum, dataPoint) => sum + this.getDataPointTotal(dataPoint), 0);
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
  stackValueFontSize = computed(() => Math.max(7, Math.round(10 * this.textScale())));

  valueTopGap = computed(() => this.showPercentage() ? Math.max(10, 22 * this.textScale()) : Math.max(8, 10 * this.textScale()));
  percentageTopGap = computed(() => this.showValue() ? Math.max(6, 7 * this.textScale()) : Math.max(8, 10 * this.textScale()));
  xLabelOffset = computed(() => this.showXAxis() ? Math.max(12, 20 * this.textScale()) : Math.max(10, 15 * this.textScale()));
  xAxisTickSize = computed(() => Math.max(4, 7 * this.textScale()));

  getDisplayedLabel(label: string): string {
    if (this.xLabelOverflow() !== 'truncate') {
      return label;
    }

    const maxChars = this.getMaxLabelCharacters();
    if (label.length <= maxChars || maxChars < 4) {
      return label;
    }

    return `${label.slice(0, Math.max(1, maxChars - 1))}…`;
  }

  shouldHideLabel(label: string): boolean {
    if (this.xLabelOverflow() !== 'hide') {
      return false;
    }

    return label.length > this.getMaxLabelCharacters();
  }

  private getMaxLabelCharacters(): number {
    const averageCharWidth = this.xLabelFontSize() * 0.6;
    const usableWidth = this.barSlotWidth() * 0.9;
    return Math.max(1, Math.floor(usableWidth / Math.max(1, averageCharWidth)));
  }

  canShowStackSegmentValue(dataPoint: ChartDataPoint, segmentIndex: number): boolean {
    if (!this.showStackValues()) {
      return false;
    }

    if (!this.isStacked() || !this.hasStackSegments(dataPoint)) {
      return false;
    }

    const segmentValue = this.getStackSegmentValue(dataPoint, segmentIndex);
    if (segmentValue <= 0) {
      return false;
    }

    const segmentHeight = this.getStackSegmentHeight(dataPoint, segmentIndex);
    return segmentHeight >= this.stackValueFontSize() + 4 && this.barWidth() >= this.stackValueFontSize() * 1.6;
  }

  getStackSegmentCenterY(dataPoint: ChartDataPoint, segmentIndex: number): number {
    return this.getStackSegmentTopY(dataPoint, segmentIndex) + (this.getStackSegmentHeight(dataPoint, segmentIndex) / 2);
  }

  getStackSegmentValueColor(dataPoint: ChartDataPoint, segmentIndex: number): string {
    const segmentFontColor = dataPoint.stacks?.[segmentIndex]?.fontColor;
    return segmentFontColor || dataPoint.fontColor || this.textColor();
  }

  getDataPointValueColor(dataPoint: ChartDataPoint): string {
    return dataPoint.fontColor || this.textColor();
  }

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
