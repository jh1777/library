
export interface ListTextRecord {
    [key: string]: string;
}

/**
 * Interface for List component
 */
export interface ListComponentInterface  {
    textValues?: Array<ListTextRecord>;
    data?: any; // Add more properties as needed
}

export interface ListItemKpiEntry {
    label?: string | null;
    value?: number | null;
    style: 'positive' | 'negative' | 'neutral';
    percentage: number | null; // Optional percentage for progress bar
    refValue: number | null; // Optional reference value for delta calculation
    delta: number | null; // Optional delta value
}


/*
    value = input.required<number>();
    label = input<string>('');
    refValue = input<number | null>(null);
    showDelta = input<boolean>(false);
    showPercentage = input<boolean>(false);
    style = input<'positive' | 'negative' | 'neutral'>('neutral');
    currency = input<'EUR' | 'USD' | 'none'>('none');
    */