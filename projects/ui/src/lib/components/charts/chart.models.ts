export interface ChartDataPoint {
    label: string;
    value: number;
    formattedValue?: string;
    color?: string;
    opacity?: number;
    fontColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    stacks?: ChartStackSegment[];
}

export interface ChartStackSegment {
    label?: string;
    value: number;
    formattedValue?: string;
    color?: string;
    opacity?: number;
    fontColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
}

export interface ChartDataSet {
    label: string;
    data: ChartDataPoint[];
}

export interface ChartLegendItem {
    label: string;
    color: string;
    opacity?: number;
}

export interface ChartItemClickEvent {
    label: string;
    value: number;
    color: string;
    originalDataPoint: ChartDataPoint;
    originalSegment: ChartStackSegment | null;
}

export interface ChartValueFormatterContext {
    dataPoint: ChartDataPoint;
    segment: ChartStackSegment | null;
    segmentIndex?: number;
}

export type ChartValueFormatter = (value: number, context: ChartValueFormatterContext) => string;

export type ChartLegendPosition = 'top' | 'bottom';

export type ChartType = 'bar' | 'stacked-bar' // | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';


export const euroValueFormatter = (value: number): string => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);