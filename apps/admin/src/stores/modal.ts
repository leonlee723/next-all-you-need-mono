import { create } from "zustand";

type ModalState = {
    title: string;
    isOpen: boolean;
    bodyType: string;
    size?: string;
    extraObject?: Record<string, any>;
}

type ModalAction = {
    openModal: (modalState:ModalState) => void,
    closeModal: () => void,
}

type modalStore = ModalState & ModalAction

const initialState: ModalState = {
    title: "",
    isOpen: false,
    bodyType: "",
    size: "",
    extraObject: {},
};

export const useModelStore = create<modalStore>((set) => ({
    ...initialState,

    openModal:(modalState:ModalState) => {
        set({
            isOpen : true,
            bodyType : modalState.bodyType,
            title : modalState.title,
            size : modalState.size || 'md',
            extraObject : modalState.extraObject,
        })
    },

    closeModal: () => {
        set({
            isOpen : false,
            bodyType : "",
            title : "",
            extraObject : {},
        })
    },
}));