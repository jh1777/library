export interface ChartDataPoint {
    label: string;
    value: number;
    color?: string;
    opacity?: number;
    fontColor?: string;
    stacks?: ChartStackSegment[];
}

export interface ChartStackSegment {
    label?: string;
    value: number;
    color?: string;
    opacity?: number;
    fontColor?: string;
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

export type ChartLegendPosition = 'top' | 'bottom';

export type ChartType = 'bar' | 'stacked-bar' // | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';