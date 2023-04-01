export interface IIO {

    setLoading: (state: boolean) => void;

    setTitleIcon: (
        icon: string, 
        clickable?: boolean, 
        color?: string, 
        size?: number, 
        tooltip?: string,
        source?: "clarity" | "fontawesome") => void;

    setError: (
        message: string, 
        showLink?: boolean
    ) => void;

    setData: (
        title: string,
        subtitle?: string,
        description?: string
    ) => void;

    setProgress: (
        showProgress: boolean, 
        percent: number, 
        progressStatusLabel: string, 
        progressColor?: string
    ) => void;
}