import { create } from "zustand";

type HeaderState = {
    pageTitle: string;
    noOfNotifications: number;
    newNotificationMessage: string;
    newNotificationStatus: number;
} 

type HeaderActions = {
    setPageTitle: (title: string) => void;
    removeNotificationMessage:() => void;
    showNotificationMessage: (message: string, status: number) => void;  // 0 = success, 1 = info, 2 = warning, 3 = error
}

const defaultInitHeaderState: HeaderState = {
    pageTitle: "Home",
    noOfNotifications: 15,
    newNotificationMessage: "",
    newNotificationStatus: 1,
};
type headerStore = HeaderState & HeaderActions

export const useHeaderStore = create<headerStore>((set) => ({
    ...defaultInitHeaderState,

    setPageTitle:(title: string) => {
        set({
            pageTitle : title,
        });
    },
    removeNotificationMessage:() => {
        set({
            newNotificationMessage : "",
        });
    },
    showNotificationMessage:(message: string, status: number) =>{
        set({
            newNotificationMessage : message,
            newNotificationStatus : status,
        });
    }
 }));

//  https://zustand.docs.pmnd.rs/getting-started/introduction
//  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//  removeAllBears: () => set({ bears: 0 }),
//  updateBears: (newBears) => set({ bears: newBears }),

// set((state) => ({
//     state.pageTitle = title }))},

// setNoOfNotifications: (noOfNotifications) => set((state) => ({...state, noOfNotifications })),
// setNewNotificationMessage: (newNotificationMessage) => set((state) => ({...state, newNotificationMessage })),
// setNewNotificationStatus: (newNotificationStatus) => set((state) => ({...state, newNotificationStatus })),
// clearNewNotification: () => set((state) => ({...state, newNotificationMessage: "", newNotificationStatus: 0 })),
