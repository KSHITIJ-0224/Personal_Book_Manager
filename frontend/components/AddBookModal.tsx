"use client";

import React, { useState } from "react";
import { BookStatus } from "../types";

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (book: { title: string; author: string; tags: string[]; status: BookStatus }) => void;
    loading: boolean;
}

export default function AddBookModal({ isOpen, onClose, onSubmit, loading }: AddBookModalProps) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState("");
    const [status, setStatus] = useState<BookStatus>("Want to Read");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tagArray = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");
        onSubmit({ title, author, tags: tagArray, status });
        // Reset form after submit (optional, or wait for success)
        setTitle("");
        setAuthor("");
        setTags("");
        setStatus("Want to Read");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/20 backdrop-blur-md dark:bg-black/40">
            <div className="modern-shadow w-full max-w-md animate-in fade-in zoom-in duration-300 rounded-3xl bg-card p-10 ring-1 ring-border">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Add New Book</h2>
                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-zinc-400 transition-all hover:bg-secondary hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Book Title</label>
                        <input
                            type="text"
                            required
                            className="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground placeholder-zinc-400 transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                            placeholder="The Great Gatsby"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Author</label>
                        <input
                            type="text"
                            required
                            className="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground placeholder-zinc-400 transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                            placeholder="F. Scott Fitzgerald"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Tags (comma separated)</label>
                        <input
                            type="text"
                            className="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground placeholder-zinc-400 transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                            placeholder="Classic, Fiction, Drama"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Reading Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as BookStatus)}
                            className="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-bold text-foreground transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        >
                            <option value="Want to Read">📖 Want to Read</option>
                            <option value="Reading">📘 Reading</option>
                            <option value="Completed">✅ Completed</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center rounded-2xl bg-black px-4 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            {loading ? "Adding..." : "Add to Collection"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
