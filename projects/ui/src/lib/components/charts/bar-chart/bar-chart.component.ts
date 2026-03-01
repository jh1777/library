import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, DestroyRef, ElementRef, QueryList, computed, effect, inject, input, signal } from '@angular/core';
import { ChartDataPoint, ChartDataSet, ChartLegendItem, ChartType } from '../chart.models';
import { UIBaseComponent } from '../../../shared';
import { ChartLegendComponent } from '../chart-legend';
import { ChartAxisComponent } from '../chart-axis';

@Component({
  selector: 'ui-bar-chart',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent extends UIBaseComponent implements AfterViewInit, AfterContentInit {

  // --------------------------------------------------------------------------
  // Dependencies & projected sub-components
  // --------------------------------------------------------------------------

  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  @ContentChildren(ChartLegendComponent) private legends?: QueryList<ChartLegendComponent>;
  @ContentChildren(ChartAxisComponent) private axes?: QueryList<ChartAxisComponent>;

  // --------------------------------------------------------------------------
  // Inputs
  // --------------------------------------------------------------------------

  dataSet = input.required<ChartDataSet>();
  barColor = input<string>('steelblue');
  textColor = input<string>('#ffff');
  height = input<number>(200);
  width = input<number>(400);
  svgWidth = input<string | number | null>(null);
  animations = input<boolean>(true);
  showPercentage = input<boolean>(true);
  showValue = input<boolean>(true);
  roundedCorners = input<number>(5);
  autoScaleText = input<boolean>(true);
  chartType = input<ChartType>('bar');
  showStackValues = input<boolean>(false);
  showBarStroke = input<boolean>(false);

  // --------------------------------------------------------------------------
  // Internal state
  // --------------------------------------------------------------------------

  private containerWidth = signal(0);
  private axisConfigVersion = signal(0);

  // --------------------------------------------------------------------------
  // Layout & scaling computeds
  // --------------------------------------------------------------------------

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

    effect(() => {
      this.syncProjectedLegendItems();
    });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  private resizeObserver?: ResizeObserver;

  // --------------------------------------------------------------------------
  // Lifecycle
  // --------------------------------------------------------------------------

  ngAfterViewInit(): void {
    this.updateContainerWidth();
    this.resizeObserver = new ResizeObserver(() => this.updateContainerWidth());
    this.resizeObserver.observe(this.hostElement.nativeElement);
  }

  ngAfterContentInit(): void {
    this.syncProjectedLegendItems();
    const legendsChangesSubscription = this.legends?.changes.subscribe(() => this.syncProjectedLegendItems());
    this.axisConfigVersion.update((value) => value + 1);
    const axesChangesSubscription = this.axes?.changes.subscribe(() => this.axisConfigVersion.update((value) => value + 1));
    this.destroyRef.onDestroy(() => legendsChangesSubscription?.unsubscribe());
    this.destroyRef.onDestroy(() => axesChangesSubscription?.unsubscribe());
  }

  private updateContainerWidth(): void {
    this.containerWidth.set(this.hostElement.nativeElement.clientWidth);
  }

  // --------------------------------------------------------------------------
  // Geometry helpers
  // --------------------------------------------------------------------------

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

  getStackSegmentStrokeColor(dataPoint: ChartDataPoint, segmentIndex: number): string | null {
    if (!this.showBarStroke()) {
      return null;
    }

    return dataPoint.stacks?.[segmentIndex]?.strokeColor ?? dataPoint.strokeColor ?? null;
  }

  getStackSegmentStrokeWidth(dataPoint: ChartDataPoint, segmentIndex: number): number | null {
    if (!this.showBarStroke()) {
      return null;
    }

    return dataPoint.stacks?.[segmentIndex]?.strokeWidth ?? dataPoint.strokeWidth ?? 1;
  }

  getDataPointStrokeColor(dataPoint: ChartDataPoint): string | null {
    if (!this.showBarStroke()) {
      return null;
    }

    return dataPoint.strokeColor ?? null;
  }

  getDataPointStrokeWidth(dataPoint: ChartDataPoint): number | null {
    if (!this.showBarStroke()) {
      return null;
    }

    return dataPoint.strokeWidth ?? 1;
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
  xAxisTickSize = computed(() => Math.max(4, 7 * this.textScale()));

  private readonly xAxisConfig = computed(() => {
    this.axisConfigVersion();
    return this.axes?.find((axis) => axis.location() === 'x') ?? null;
  });

  xAxisShowAxis = computed(() => this.xAxisConfig()?.showAxis() ?? false);
  xAxisShowLabels = computed(() => this.xAxisConfig()?.showLabels() ?? false);
  xAxisLabelOverflow = computed(() => this.xAxisConfig()?.labelOverflow() ?? 'none');

  xLabelOffset = computed(() => this.xAxisShowAxis() ? Math.max(12, 20 * this.textScale()) : Math.max(10, 15 * this.textScale()));

  getDisplayedLabel(label: string): string {
    if (this.xAxisLabelOverflow() !== 'truncate') {
      return label;
    }

    const maxChars = this.getMaxLabelCharacters();
    if (label.length <= maxChars || maxChars < 4) {
      return label;
    }

    return `${label.slice(0, Math.max(1, maxChars - 1))}…`;
  }

  shouldHideLabel(label: string): boolean {
    if (this.xAxisLabelOverflow() !== 'hide') {
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

  // --------------------------------------------------------------------------
  // Legend integration
  // --------------------------------------------------------------------------

  private readonly legendItems = computed<ChartLegendItem[]>(() => {
    if (this.isStacked()) {
      const stackedLegendItems: ChartLegendItem[] = [];
      const stackedLegendKeys = new Set<string>();

      this.dataSet().data.forEach((dataPoint) => {
        dataPoint.stacks?.forEach((segment, index) => {
          const label = segment.label || `Segment ${index + 1}`;
          const color = segment.color || dataPoint.color || this.barColor();
          const key = `${label}|${color}|${segment.opacity ?? dataPoint.opacity ?? 1}`;

          if (!stackedLegendKeys.has(key)) {
            stackedLegendKeys.add(key);
            stackedLegendItems.push({
              label,
              color,
              opacity: segment.opacity ?? dataPoint.opacity ?? 1
            });
          }
        });
      });

      return stackedLegendItems;
    }

    return this.dataSet().data.map((dataPoint) => ({
      label: dataPoint.label,
      color: dataPoint.color || this.barColor(),
      opacity: dataPoint.opacity ?? 1
    }));
  });

  private syncProjectedLegendItems(): void {
    const legends = this.legends;
    if (!legends || legends.length === 0) {
      return;
    }

    const items = this.legendItems();
    legends.forEach((legend) => legend.items.set(items));
  }

  // --------------------------------------------------------------------------
  // Vertical layout
  // --------------------------------------------------------------------------

  bottomPadding = computed(() => {
    if (this.xAxisShowLabels()) {
      const labelSpace = this.xLabelOffset() + this.xLabelFontSize();
      return this.xAxisShowAxis() ? labelSpace + 2 : labelSpace;
    }

    if (this.xAxisShowAxis()) {
      return this.xAxisTickSize() + 3;
    }

    return 0;
  });

  svgHeight = computed(() => this.height() + this.bottomPadding());

  heightOffset = computed(() => this.showValue() && this.showPercentage() ? this.height() * 0.2 : this.height() * 0.1);
}
