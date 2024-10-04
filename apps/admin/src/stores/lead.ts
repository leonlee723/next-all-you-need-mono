import { Lead } from '@/helper/types';
import { create } from "zustand";
import axios from 'axios';

// Define the return type of the async thunk
interface GetLeadsResponse {
    data: Lead[];
}

type LeadsState = {
    isLoading: boolean;
    leads: Lead[];
};

const initialState: LeadsState = {
    isLoading: false,
    leads: []
};

type LeadsAction = {
    addNewLead: (newLeadObj : Lead ) => void,
    deleteLead: (index : number) => void,
    getLeads: (index : number) => Promise<GetLeadsResponse>
}

type LeadsStore = LeadsState & LeadsAction

export const useLeadStore = create<LeadsStore>((set) => ({
    ...initialState,

    addNewLead:(newLeadObj: Lead) => {
        set(state => ({...state, leads: [...state.leads, newLeadObj] }));
    },

    deleteLead:(index: number) => {
        set(state => ({...state, leads: [...state.leads.slice(0, index),...state.leads.slice(index + 1)] }));
    },

    getLeads: async (index: number): Promise<GetLeadsResponse> => {
        set(state => ({...state, isLoading: true }));
        try {
            console.log("index:" + index);
            const response = await axios.get<GetLeadsResponse>("/api/users?page=" + (index + 1));
            const leadsResponse: GetLeadsResponse = response.data;
            set(state => ({...state, leads: leadsResponse.data, isLoading: false }));
            return response.data;
        } catch (error) {
            set(state => ({...state, isLoading: false }));
            throw error
        }
    },
}))