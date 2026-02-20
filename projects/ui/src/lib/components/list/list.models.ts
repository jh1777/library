
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
