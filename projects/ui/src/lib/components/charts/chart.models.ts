export interface ChartDataPoint {
    label: string;
    value: number;
    color?: string;
}

export interface ChartDataSet {
    label: string;
    data: ChartDataPoint[];
}

export type ChartType = 'bar' // | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';