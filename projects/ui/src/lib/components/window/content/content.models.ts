export interface BannerMessage {
    text: string;
    type: 'info' | 'warning' | 'error' | 'success';
    showCloseButton?: boolean;
    //buttons?: { label: string; action: () => void }[];
}