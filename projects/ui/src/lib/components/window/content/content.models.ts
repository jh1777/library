export interface BannerMessage {
    text: string;
    type: 'info' | 'warning' | 'error' | 'success';
    //buttons?: { label: string; action: () => void }[];
}