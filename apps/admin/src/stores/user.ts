import { create } from "zustand";
import axios from 'axios';

import { APIResponse, UserProfile } from '@/helper/types';

type UserProfileState = {
    userProfile: UserProfile
    err: {
        message: string;
        show: boolean;
    },
}

type UserProfileAction = {
    getUserInfo:() => UserProfile;
    loginService:(email:string, password:string) => void;
}

const defaultInitUserProfileState: UserProfileState = {
    userProfile : {
        name: "",
        avatar: "",
        emailId: "",
    },
    err: {
        message: "",
        show: false,
    },   
};

type userProfileStore = UserProfileState & UserProfileAction

export const useUserProfileStore = create<userProfileStore>((set) => ({
    ...defaultInitUserProfileState,

    getUserInfo: ():UserProfile => {
            let userProfile: UserProfile = {
            name: "Alex", 
            avatar : "https://i.imgur.com/eLn5EI1.png", 
            emailId : ""
        }
        return userProfile
    },

    loginService: async (email:string, password:string) => {
        set(state=>({...state, isLoading: true}));
        try {
            console.log("login...");
            const response = await axios.post(
                'http://localhost/gateway/v1/auth/login',
                {
                    "email":email,
                    "password":password,
                }
            );

            if (response.status === 200) {
                const userProfile:UserProfile = {
                    name: response.data.user.email,
                    avatar: "https://i.imgur.com/eLn5EI1.png",
                    emailId: response.data.user.email,
                }
                set(state=>({...state, userProfile: userProfile, isLoading: false}));
            }
        }catch(errLogin:any) {
            console.error("Error in login: ", errLogin.message);
            set(state=>({
                ...state, 
                isLoading: false, 
                err: {
                    message: errLogin.response.data.error,
                    show: true,}
            }));
        }

    }
}));
