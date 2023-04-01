export interface IIO {

    setContent: (icon?: string, label?: string, tooltip?: string) => void;

    setDisabled: (state: boolean) => void;

    setBorderedStyle: (borderColor?: string, backgroundColor?: string) => void;

    setColor: (color: string) => void;

    setLoading: (state: boolean, message?: string) => void;

    setId: (id: any) => void;

    setFilled: (state: boolean) => void;
}