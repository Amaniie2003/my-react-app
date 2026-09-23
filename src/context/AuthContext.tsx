import { createContext, useContext, useState, ReactNode } from "react";
import { login as loginRequest, logout as logoutRequest } from "../services/authService";

interface AuthContextType {
    email: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [email, setEmail] = useState<string | null>(() => localStorage.getItem("userEmail"));
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("accessToken"));

    const login = async (emailInput: string, password: string) => {
        const data = await loginRequest({ email: emailInput, password });
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("userEmail", emailInput);
        setToken(data.token);
        setEmail(emailInput);
    };

    const logout = () => {
        logoutRequest();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("custom_users");
        setToken(null);
        setEmail(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ email, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}