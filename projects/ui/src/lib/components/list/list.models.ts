import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { UIBaseComponentInterface } from "../../shared/ui-base.models";

/**
 * Interface for List component
 */
export interface ListComponentInterface extends UIBaseComponentInterface  {
    text: string;
    icon?: IconDefinition;
    id: string;
    data?: ListItemKpiEntry; 
}

export interface ListItemKpiEntry {
    label?: string | null;
    value?: number | null;
    style: 'positive' | 'negative' | 'neutral' | 'auto';
    percentage: number | null; // Optional percentage for progress bar
    refValue: number | null; // Optional reference value for delta calculation
    delta: number | null; // Optional delta value
}
