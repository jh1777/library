
export interface IIO {
    
    setLoading: (state: boolean) => void;

    setError: (
        message: string, 
        showLink?: boolean
    ) => void;

    setValue: (
        label: string, 
        value: number, 
        percent?: number,
        labelStyle?: string,
        valueColor?: string
        ) => void;

    setIcon: (
        icon: string, 
        clickable?: boolean, 
        color?: string, 
        size?: number, 
        tooltip?: string,
        source?: "clarity" | "fontawesome"
        ) => void;
}