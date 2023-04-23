import { IconModel } from "../../models/shared/icon-model";

export interface IIO {

    setLoading: (state: boolean) => void;

    setId: (id: any) => void;

    setError: (
        message: string, 
        showLink?: boolean
    ) => void;

    setLabel: (
        value: string,
        icon?: IconModel,
        style?: string
    ) => void;

    setSubtitle: (
        value: string,
        icon?: IconModel,
        style?: string
    ) => void;

    setValue: (
        value: string,
        icon?: IconModel,
        style?: string
    ) => void;

    setValueSubtitle: (
        value: string,
        icon?: IconModel,
        style?: string
    ) => void;

}