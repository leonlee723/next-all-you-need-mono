import { create } from "zustand";

type RightDrawerState = {
    header: string;
    isOpen?: boolean;
    bodyType: string;
    extraObject: Record<string, any>;
}

const defaultInitRightDrawerState: RightDrawerState = {
    header: "",
    isOpen: false,
    bodyType: "",
    extraObject: {},
};

type RightDrawerActions = {
    openRightDrawer: (rightDrawerState: RightDrawerState) => void;
    closeRightDrawer: () => void;
}

type RightDrawerStore = RightDrawerState & RightDrawerActions

export const useRightDrawerStore = create<RightDrawerStore>((set) => ({
    ...defaultInitRightDrawerState,

    openRightDrawer:(rightDrawerState: RightDrawerState) => {
        set({
            isOpen : true,
            bodyType : rightDrawerState.bodyType,
            header : rightDrawerState.header,
            extraObject : rightDrawerState.extraObject
        });
    },

    closeRightDrawer:()=>{
        set({
            isOpen : false,
            bodyType : "",
            header : "",
            extraObject : {}
        });
    },
}))