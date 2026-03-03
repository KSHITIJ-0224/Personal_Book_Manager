"use client";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="glass sticky top-0 z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                <Link href="/" className="group flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-95">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white shadow-lg ring-1 ring-white/20 dark:bg-white dark:text-black dark:ring-black/20">
                        <span className="text-2xl font-black">B</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Library
                    </span>
                </Link>

                {user && (
                    <div className="flex items-center gap-6">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</p>
                            <p className="text-[11px] font-medium tracking-wide uppercase text-zinc-500/80 dark:text-zinc-400/80">{user.email}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="rounded-xl border border-zinc-200/60 bg-white px-5 py-2.5 text-sm font-bold text-zinc-900 transition-all hover:bg-zinc-50 hover:shadow-sm active:scale-95 dark:border-zinc-800/60 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                        >
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
