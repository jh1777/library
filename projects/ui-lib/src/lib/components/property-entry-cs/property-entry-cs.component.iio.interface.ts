export interface IIO {

    setLoading: (state: boolean) => void;

    setSlotIcon: (
        slot: Slot,
        icon: string, 
        clickable?: boolean, 
        color?: string, 
        size?: number, 
        tooltip?: string,
        source?: "clarity" | "fontawesome") => void;

    setSlotContent: (
        slot: Slot,
        value: string, 
        style?: string) => void;

    setError: (
        message: string, 
        showLink?: boolean
    ) => void;
}

export enum Slot {
    LABEL = "Label",
    LABEL_SUBTITLE = "Label Subtitle",
    CONTENT = "Content",
    CONTENT_SUBTITLE = "Content Subtitle"
}