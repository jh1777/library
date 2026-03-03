import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChartDataSet, ChartItemClickEvent, ChartValueFormatter } from '../chart.models';
import { ChartAxisComponent } from '../chart-axis/chart-axis.component';
import { BarChartComponent } from './bar-chart.component';

const BAR_DATA_SET: ChartDataSet = {
  label: 'Demo',
  data: [
    { label: 'A', value: 10, color: '#3366ff' },
    { label: 'B', value: 20, color: '#22aa66' }
  ]
};

const STACKED_DATA_SET: ChartDataSet = {
  label: 'Stacked Demo',
  data: [
    {
      label: 'Q1',
      value: 0,
      color: '#334155',
      stacks: [
        { label: 'Hardware', value: 8, color: '#3b82f6' },
        { label: 'Software', value: 12, color: '#10b981' }
      ]
    }
  ]
};

@Component({
  standalone: true,
  imports: [BarChartComponent],
  template: `<ui-bar-chart [dataSet]="dataSet" [chartType]="chartType" [valueFormatter]="valueFormatter"></ui-bar-chart>`
})
class BarChartNoAxisHostComponent {
  dataSet = BAR_DATA_SET;
  chartType: 'bar' | 'stacked-bar' = 'bar';
  valueFormatter: ChartValueFormatter | null = null;

  @ViewChild(BarChartComponent)
  chartComponent?: BarChartComponent;
}

@Component({
  standalone: true,
  imports: [BarChartComponent, ChartAxisComponent],
  template: `
    <ui-bar-chart [dataSet]="dataSet">
      <uic-chart-axis location="x"></uic-chart-axis>
    </ui-bar-chart>
  `
})
class BarChartAxisDefaultHostComponent {
  dataSet = BAR_DATA_SET;

  @ViewChild(BarChartComponent)
  chartComponent?: BarChartComponent;
}

@Component({
  standalone: true,
  imports: [BarChartComponent, ChartAxisComponent],
  template: `
    <ui-bar-chart [dataSet]="dataSet">
      <uic-chart-axis location="x" [showLabels]="true"></uic-chart-axis>
    </ui-bar-chart>
  `
})
class BarChartAxisLabelsHostComponent {
  dataSet = BAR_DATA_SET;

  @ViewChild(BarChartComponent)
  chartComponent?: BarChartComponent;
}

describe('BarChartComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartNoAxisHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartNoAxisHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.debugElement.query(By.directive(BarChartComponent)).componentInstance as BarChartComponent;
    expect(chartComponent).toBeTruthy();
  });

  it('has no axis if no axis sub-component is projected', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartNoAxisHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartNoAxisHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.componentInstance.chartComponent!;
    expect(chartComponent.xAxisShowAxis()).toBeFalse();
    expect(chartComponent.xAxisShowLabels()).toBeFalse();
  });

  it('shows axis line but no labels/ticks by default when axis config is projected', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartAxisDefaultHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartAxisDefaultHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.componentInstance.chartComponent!;
    expect(chartComponent.xAxisShowAxis()).toBeTrue();
    expect(chartComponent.xAxisShowLabels()).toBeFalse();
  });

  it('shows labels and ticks when showLabels is true on axis config', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartAxisLabelsHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartAxisLabelsHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.componentInstance.chartComponent!;
    expect(chartComponent.xAxisShowAxis()).toBeTrue();
    expect(chartComponent.xAxisShowLabels()).toBeTrue();
  });

  it('emits typed onItemClick payload for non-stacked bars', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartNoAxisHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartNoAxisHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.componentInstance.chartComponent!;
    const dataPoint = BAR_DATA_SET.data[0];

    let emitted: ChartItemClickEvent | null = null;
    chartComponent.onItemClick.subscribe((event) => {
      emitted = event;
    });

    chartComponent.handleClick(dataPoint, null);

    expect(emitted).not.toBeNull();
    expect(emitted!.label).toBe('A');
    expect(emitted!.value).toBe(10);
    expect(emitted!.color).toBe('#3366ff');
    expect(emitted!.originalDataPoint).toBe(dataPoint);
    expect(emitted!.originalSegment).toBeNull();
  });

  it('emits typed onItemClick payload for stacked segments', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartNoAxisHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartNoAxisHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.componentInstance.chartComponent!;
    const dataPoint = STACKED_DATA_SET.data[0];
    const segment = dataPoint.stacks![1];

    let emitted: ChartItemClickEvent | null = null;
    chartComponent.onItemClick.subscribe((event) => {
      emitted = event;
    });

    chartComponent.handleClick(dataPoint, segment);

    expect(emitted).not.toBeNull();
    expect(emitted!.label).toBe('Software');
    expect(emitted!.value).toBe(12);
    expect(emitted!.color).toBe('#10b981');
    expect(emitted!.originalDataPoint).toBe(dataPoint);
    expect(emitted!.originalSegment).toBe(segment);
  });

  it('lightens bar fill color on hover', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartNoAxisHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartNoAxisHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.componentInstance.chartComponent!;
    const dataPoint = BAR_DATA_SET.data[0];

    const baseColor = chartComponent.getBarFillColor(dataPoint);
    chartComponent.handleMouseOver(dataPoint);
    const hoverColor = chartComponent.getBarFillColor(dataPoint);

    expect(baseColor).toBe('#3366ff');
    expect(hoverColor).not.toBe(baseColor);
  });

  it('formats top value label using valueFormatter input', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartNoAxisHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartNoAxisHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.componentInstance.chartComponent!;
    fixture.componentInstance.valueFormatter = (value: number) => `€${value.toFixed(2).replace('.', ',')}`;
    fixture.detectChanges();

    expect(chartComponent.getDataPointValueLabel(BAR_DATA_SET.data[0])).toBe('€10,00');
  });

  it('prefers formattedValue from data point over formatter', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartNoAxisHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartNoAxisHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.componentInstance.chartComponent!;
    const dataPoint = BAR_DATA_SET.data[0];
    dataPoint.formattedValue = '€2.345,55';
    fixture.componentInstance.valueFormatter = (value: number) => `€${value}`;
    fixture.detectChanges();

    expect(chartComponent.getDataPointValueLabel(dataPoint)).toBe('€2.345,55');

    delete dataPoint.formattedValue;
  });

  it('formats stacked segment labels with formatter', async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartNoAxisHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BarChartNoAxisHostComponent);
    fixture.detectChanges();

    const chartComponent = fixture.componentInstance.chartComponent!;
    fixture.componentInstance.chartType = 'stacked-bar';
    fixture.componentInstance.dataSet = STACKED_DATA_SET;
    fixture.componentInstance.valueFormatter = (value: number) => `${value}%`;
    fixture.detectChanges();

    expect(chartComponent.getStackSegmentValueLabel(STACKED_DATA_SET.data[0], 1)).toBe('12%');
  });
});
