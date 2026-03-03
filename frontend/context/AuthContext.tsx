"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState } from "../types";
import { useRouter } from "next/navigation";

interface AuthContextType extends AuthState {
    login: (userData: User) => void;
    logout: () => void;
    register: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        if (userData.token) {
            localStorage.setItem("token", userData.token);
        }
        router.push("/");
    };

    const register = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        if (userData.token) {
            localStorage.setItem("token", userData.token);
        }
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
