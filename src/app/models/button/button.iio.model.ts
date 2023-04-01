export interface ButtonIIOModel {
    id: string;
    label: string;
    loading: boolean;
    icon?: string;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    filled?: boolean;

    $output?: any;
    $description?: string;
}