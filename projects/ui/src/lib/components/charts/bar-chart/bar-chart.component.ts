import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, DestroyRef, ElementRef, QueryList, computed, effect, inject, input, output, signal } from '@angular/core';
import { ChartDataPoint, ChartDataSet, ChartItemClickEvent, ChartLegendItem, ChartStackSegment, ChartType, ChartValueFormatter } from '../chart.models';
import { UIBaseComponent } from '../../../shared';
import { ChartLegendComponent } from '../chart-legend/chart-legend.component';
import { ChartAxisComponent } from '../chart-axis/chart-axis.component';

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
  defaultBarColor = input<string>('steelblue');
  defaultTextColor = input<string>('#444');
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
  valueFormatter = input<ChartValueFormatter | null>(null);
  trendLine = input<'max' | 'avg' | 'median' | null>(null);
  showTrendLineLabel = input<boolean>(false);

  /// --------------------------------------------------------------------------
  /// Outputs
  /// --------------------------------------------------------------------------

  onItemClick = output<ChartItemClickEvent>();

  // --------------------------------------------------------------------------
  // Internal state
  // --------------------------------------------------------------------------

  private containerWidth = signal(0);
  private axisConfigVersion = signal(0);
  private readonly loadingHeightPattern = [72, 48, 84, 60, 68, 52];

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
  loadingPlaceholderIndices = computed(() => Array.from({ length: Math.max(this.dataSet().data.length, 4) }, (_, index) => index));

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

  private readonly dataPointTotals = computed<number[]>(() => this.dataSet().data.map((dataPoint) => this.getDataPointTotal(dataPoint)));

  // Maximalwert berechnen (für Skalierung)
  maxValue = computed(() => Math.max(...this.dataPointTotals(), 0));

  scaleDenominator = computed(() => this.maxValue() > 0 ? this.maxValue() : 1);

  trendLineValue = computed<number | null>(() => {
    const trendLineType = this.trendLine();
    if (trendLineType === null) {
      return null;
    }

    const totals = this.dataPointTotals();
    if (totals.length === 0) {
      return null;
    }

    if (trendLineType === 'max') {
      return Math.max(...totals);
    }

    if (trendLineType === 'avg') {
      return totals.reduce((sum, value) => sum + value, 0) / totals.length;
    }

    const sortedValues = [...totals].sort((first, second) => first - second);
    const middleIndex = Math.floor(sortedValues.length / 2);
    if (sortedValues.length % 2 === 0) {
      return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
    }

    return sortedValues[middleIndex];
  });

  trendLineY = computed<number | null>(() => {
    const value = this.trendLineValue();
    if (value === null) {
      return null;
    }

    return this.getBarTopY(value);
  });

  trendLineLabelText = computed<string | null>(() => {
    if (!this.showTrendLineLabel()) {
      return null;
    }

    const trendLineType = this.trendLine();
    const trendY = this.trendLineValue();
    if (trendLineType === null || trendY === null) {
      return null;
    }

    return `${trendLineType}: ${trendY.toFixed(1)}`;
  });

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
    return segmentColor || dataPoint.color || this.defaultBarColor();
  }

  getStackSegmentFillColor(dataPoint: ChartDataPoint, segmentIndex: number, segment: ChartStackSegment): string {
    const baseColor = this.getStackSegmentColor(dataPoint, segmentIndex);
    if (this.mouseOverItem() !== segment) {
      return baseColor;
    }

    return this.lightenHexColor(baseColor, 0.2);
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

  getDataPointValueLabel(dataPoint: ChartDataPoint): string {
    const displayedValue = this.getDisplayedValue(dataPoint);

    if (typeof dataPoint.formattedValue === 'string' && dataPoint.formattedValue.length > 0) {
      return dataPoint.formattedValue;
    }

    const formatter = this.valueFormatter();
    if (!formatter) {
      return `${displayedValue}`;
    }

    return formatter(displayedValue, {
      dataPoint,
      segment: null
    });
  }

  getStackSegmentValueLabel(dataPoint: ChartDataPoint, segmentIndex: number): string {
    const segment = dataPoint.stacks?.[segmentIndex];
    const segmentValue = this.getStackSegmentValue(dataPoint, segmentIndex);

    if (segment && typeof segment.formattedValue === 'string' && segment.formattedValue.length > 0) {
      return segment.formattedValue;
    }

    const formatter = this.valueFormatter();
    if (!formatter) {
      return `${segmentValue}`;
    }

    return formatter(segmentValue, {
      dataPoint,
      segment: segment ?? null,
      segmentIndex
    });
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
  trendLineLabelFontSize = computed(() => Math.max(7, Math.round(9 * this.textScale())));

  trendLineLabelY = computed<number | null>(() => {
    const trendY = this.trendLineY();
    if (trendY === null) {
      return null;
    }

    return Math.max(this.trendLineLabelFontSize(), trendY - 4);
  });

  valueTopGap = computed(() => this.showPercentage() ? Math.max(10, 22 * this.textScale()) : Math.max(8, 10 * this.textScale()));
  percentageTopGap = computed(() => this.showValue() ? Math.max(6, 7 * this.textScale()) : Math.max(8, 10 * this.textScale()));
  xAxisTickSize = computed(() => Math.max(4, 7 * this.textScale()));

  private readonly xAxisConfig = computed(() => {
    this.axisConfigVersion();
    return this.axes?.find((axis) => axis.location() === 'x') ?? null;
  });

  xAxisShowAxis = computed(() => {
    const axisConfig = this.xAxisConfig();
    if (!axisConfig) {
      return false;
    }

    return axisConfig.showAxis() || axisConfig.showLabels();
  });
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
    return segmentFontColor || dataPoint.fontColor || this.defaultTextColor();
  }

  getDataPointValueColor(dataPoint: ChartDataPoint): string {
    return dataPoint.fontColor || this.defaultTextColor();
  }

  getLoadingBarHeightPercent(index: number): number {
    return this.loadingHeightPattern[index % this.loadingHeightPattern.length];
  }

  getBarFillColor(dataPoint: ChartDataPoint): string {
    const baseColor = dataPoint.color || this.defaultBarColor();
    if (this.mouseOverItem() !== dataPoint) {
      return baseColor;
    }

    return this.lightenHexColor(baseColor, 0.2);
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
          const color = segment.color || dataPoint.color || this.defaultBarColor();
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
      color: dataPoint.color || this.defaultBarColor(),
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

    return 0;
  });

  svgHeight = computed(() => this.height() + this.bottomPadding());

  heightOffset = computed(() => this.showValue() && this.showPercentage() ? this.height() * 0.2 : this.height() * 0.1);

  // --------------------------------------------------------------------------
  // Interactions
  // --------------------------------------------------------------------------

  mouseOverItem = signal<ChartStackSegment | ChartDataPoint | null>(null);
  handleMouseOver(segment: ChartStackSegment | ChartDataPoint | null): void {
    this.mouseOverItem.set(segment);
  }

  private lightenHexColor(colorHex: string, amount: number): string {
    const normalizedHex = colorHex.trim();
    const match = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(normalizedHex);
    if (!match) {
      return colorHex;
    }

    let hex = match[1];
    if (hex.length === 3) {
      hex = hex.split('').map((part) => part + part).join('');
    }

    const red = Number.parseInt(hex.slice(0, 2), 16);
    const green = Number.parseInt(hex.slice(2, 4), 16);
    const blue = Number.parseInt(hex.slice(4, 6), 16);

    const blendChannel = (channel: number): number => {
      const blended = channel + ((255 - channel) * amount);
      return Math.max(0, Math.min(255, Math.round(blended)));
    };

    const toHex = (channel: number): string => channel.toString(16).padStart(2, '0');
    return `#${toHex(blendChannel(red))}${toHex(blendChannel(green))}${toHex(blendChannel(blue))}`;
  }

  handleClick(dataPoint: ChartDataPoint, segment: ChartStackSegment | null): void {
    const label = segment?.label || dataPoint.label;
    const value = segment ? segment.value : this.getDataPointTotal(dataPoint);
    const color = segment?.color || dataPoint.color || this.defaultBarColor();

    const result: ChartItemClickEvent = {
      label,
      value,
      color,
      originalDataPoint: dataPoint,
      originalSegment: segment
    };
    this.onItemClick.emit(result);
  }
}
