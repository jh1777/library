export interface ChartDataPoint {
    label: string;
    value: number;
    color?: string;
    opacity?: number;
    fontColor?: string;
    stacks?: ChartStackSegment[];
}

export interface ChartStackSegment {
    value: number;
    color?: string;
    opacity?: number;
    fontColor?: string;
}

export interface ChartDataSet {
    label: string;
    data: ChartDataPoint[];
}

export type ChartType = 'bar' | 'stacked-bar' // | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';