import { create } from "zustand";
import axiosInstance from "./axiosInstance";

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
			const response = await axiosInstance.post("/signup", {
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
			set({ error: `Error occurred: ${error}` , isLoading: false });
		}
	},
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.post(`/login`, {
				email,
				password,
			});
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: `Error occurred: ${error}`, isLoading: false });
		}
	},
	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.post(`/logout`);
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
			const response = await axiosInstance.post(`/verify-email`, {
				code,
			});
			set({
				user: response.data.newUser,
				isAuthenticated: true,
				isLoading: false,
			});
			return response.data;
		} catch (error) {
			set({ error: `Error occurred: ${error}`, isLoading: false });
		}
	},

	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axiosInstance.get(`/check-auth`, {
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
			const response = await axiosInstance.post(`/forgot-password`, {
				email,
			});
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({ error: `Error occurred: ${error}`, isLoading: false });
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.post(
				`$/reset-password/${token}`,
				{
					password,
				}
			);
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({ error: `Error occurred: ${error}`, isLoading: false });
		}
	},
}));
