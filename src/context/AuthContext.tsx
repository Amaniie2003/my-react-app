// src/context/AuthContext.tsx
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
    const [email, setEmail] = useState<string | null>(
        localStorage.getItem("userEmail")
);

const login = async (emailInput: string, password: string) => {
    const data = await loginRequest({ email: emailInput, password });
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("userEmail", emailInput);
setEmail(emailInput);
};

const logout = () => {
    logoutRequest();
    localStorage.removeItem("userEmail");
    setEmail(null);
};

return (
    <AuthContext.Provider value={{ email, isAuthenticated: !!email, login, logout }}>
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
