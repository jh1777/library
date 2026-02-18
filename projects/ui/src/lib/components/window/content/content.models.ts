export interface BannerMessage {
    text: string;
    type: 'info' | 'warning' | 'error' | 'success';
    showCloseButton?: boolean;
    duration?: number;
    action?: () => void;
    actionLabel?: string;
}