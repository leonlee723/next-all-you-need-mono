import { create } from "zustand";
import axios from 'axios';

import { APIResponse, UserProfile } from '@/helper/types';

type UserProfileState = {
    userProfile: UserProfile
}

type UserProfileAction = {
    getUserInfo:() => UserProfile;
    loginService:() => void;
}

const defaultInitUserProfileState: UserProfileState = {
    userProfile : {
        name: "",
        avatar: "",
        emailId: "",
    }
    
};

type userProfileStore = UserProfileState & UserProfileAction

export const useUserProfileStore = create<userProfileStore>((set) => ({
    ...defaultInitUserProfileState,

    getUserInfo: ():UserProfile => {
            let userProfile: UserProfile = {
            name: "Alex", 
            avatar : "https://reqres.in/img/faces/7-image.jpg", 
            emailId : ""
        }
        return userProfile
    },

    loginService: async () => {
        set(state=>({...state, isLoading: true}));
        try {
            console.log("login...");
            const response = await axios.post(
                'http://localhost/gateway/v1/auth/login',
                {
                    "email":"abc@456.com",
                    "password":"12345678Ab",
                }
            );
            const userProfile:UserProfile = {
                name: response.data.user.email,
                avatar: "https://reqres.in/img/faces/7-image.jpg",
                emailId: response.data.user.email,
            }

            set(state=>({...state, userProfile: userProfile, isLoading: false}));
        }catch(err) {
        }

    },
}));
