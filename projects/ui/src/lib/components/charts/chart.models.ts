export interface ChartDataPoint {
    label: string;
    value: number;
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

export type ChartLegendPosition = 'top' | 'bottom';

export type ChartType = 'bar' | 'stacked-bar' // | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';