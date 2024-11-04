import {create} from 'zustand'
import axios from 'axios'

const API_URL = "http://localhost:5000/api/auth"

axios.defaults.withCredentials = true;
export const useAuthStore = create((set => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async(email:string,password:string,name:string) => {
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${API_URL}/signup`,{email,password,name})
            set({user: response.data.newUser,isAuthenticated:true,isLoading:false})
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                set({ error: error.response?.data?.message || 'Error signing up', isLoading: false });
            } else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
            throw error;
        }}
})))
