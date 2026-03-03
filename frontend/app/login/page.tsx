"use client";

import React, { useState } from "react";
import Link from "next/link";
import { apiFetch } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            login(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="subtle-grid flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-black text-white shadow-2xl ring-1 ring-white/20 dark:bg-white dark:text-black dark:ring-black/20 mb-8">
                        <span className="text-3xl font-black">B</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                        Welcome back
                    </h2>
                    <p className="mt-3 text-base font-semibold text-zinc-500">
                        Continue your reading journey
                    </p>
                </div>

                <div className="mt-12 rounded-[2.5rem] bg-card p-10 shadow-sm ring-1 ring-border">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600 dark:bg-red-900/20 dark:text-red-400 animate-in shake duration-300">
                                {error}
                            </div>
                        )}
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="block w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold text-foreground placeholder-zinc-400 transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent shadow-sm"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="block w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold text-foreground placeholder-zinc-400 transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent shadow-sm"
                                    placeholder="Your secure password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-2xl bg-black px-4 py-4 text-sm font-black text-white transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-10 text-center text-sm font-bold text-zinc-500">
                    New here?{" "}
                    <Link href="/register" className="text-accent underline-offset-4 hover:underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
