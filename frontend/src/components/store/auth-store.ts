import { create } from "zustand";
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();
const API_URL = process.env.API_URL;
axios.defaults.withCredentials = true;

interface User {
  id: string;
  email: string;
  name: string;
  isVerified?: boolean;
  createdAt: Date;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message?: string;
  signup: (email: string, password: string, name: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<{ newUser: User }>;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({
          error: error.response?.data?.message || "Error signing up",
          isLoading: false,
        });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({
          error: error.response?.data?.message || "Error verifying email",
          isLoading: false,
        });
        console.log(error);
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
        console.log(error);
      }
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        isLoading: false,
        error: null,
        isAuthenticated: false,
        user: null,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.newUser,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({
          error: error.response?.data?.message || "Error verifying email",
          isLoading: false,
        });
      } else {
        set({ error: "An unknown error occurred", isLoading: false });
      }
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log("Error sending reset password email");
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log("Error resetting password");
    }
  },
}));
