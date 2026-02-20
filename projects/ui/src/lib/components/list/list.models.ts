
/**
 * Interface for List component
 */
export interface ListComponentInterface  {
    text: string;
    id: string;
    data?: ListItemKpiEntry; 
}

export interface ListItemKpiEntry {
    label?: string | null;
    value?: number | null;
    style: 'positive' | 'negative' | 'neutral';
    percentage: number | null; // Optional percentage for progress bar
    refValue: number | null; // Optional reference value for delta calculation
    delta: number | null; // Optional delta value
}

export type KpiSummaryMode = 'sum' | 'avg';
export type KpiSummaryCurrency = 'EUR' | 'USD' | 'none';

export interface KpiSummaryEntry {
    key: string;
    label: string | null;
    value: number;
    style: 'positive' | 'negative' | 'neutral';
    refValue: number | null;
    showDelta: boolean;
    showPercentage: boolean;
    currency: KpiSummaryCurrency;
}
