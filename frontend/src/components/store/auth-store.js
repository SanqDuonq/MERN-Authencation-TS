"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthStore = void 0;
const zustand_1 = require("zustand");
const axios_1 = __importDefault(require("axios"));
const API_URL = "http://localhost:5000/api/auth";
axios_1.default.defaults.withCredentials = true;
exports.useAuthStore = (0, zustand_1.create)((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    signup: (email, password, name) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        set({ isLoading: true, error: null });
        try {
            const response = yield axios_1.default.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.newUser, isAuthenticated: true, isLoading: false });
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response) {
                set({ error: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Error signing up', isLoading: false });
            }
            else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
            throw error;
        }
    }),
    login: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        set({ isLoading: true, error: null });
        try {
            const response = yield axios_1.default.post(`${API_URL}/login`, { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false
            });
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response) {
                set({ error: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Error verifying email', isLoading: false });
            }
            else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
            throw error;
        }
    }),
    logout: () => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true, error: null });
        try {
            yield axios_1.default.post(`${API_URL}/logout`);
            set({ isLoading: false, error: null, isAuthenticated: false, user: null });
        }
        catch (error) {
            set({ error: 'Error logging out', isLoading: false });
        }
    }),
    verifyEmail: (code) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        set({ isLoading: true, error: null });
        try {
            const response = yield axios_1.default.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.newUser, isAuthenticated: true, isLoading: false });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response) {
                set({ error: ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Error verifying email', isLoading: false });
            }
            else {
                set({ error: 'An unknown error occurred', isLoading: false });
            }
            throw error;
        }
    }),
    checkAuth: () => __awaiter(void 0, void 0, void 0, function* () {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = yield axios_1.default.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        }
        catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    }),
    forgotPassword: (email) => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true, error: null });
        try {
            const response = yield axios_1.default.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        }
        catch (error) {
            set({ isLoading: false });
            console.log('Error sending reset password email');
            throw error;
        }
    }),
    resetPassword: (token, password) => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true, error: null });
        try {
            const response = yield axios_1.default.post(`${API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        }
        catch (error) {
            set({ isLoading: false });
            console.log('Error resetting password');
            throw error;
        }
    })
}));
