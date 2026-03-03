"use client";

import { Book, BookStatus } from "../types";
import { formatDistanceToNow } from "date-fns";

interface BookCardProps {
    book: Book;
    onUpdateStatus: (id: string, status: BookStatus) => void;
    onDelete: (id: string) => void;
}

const statusColors = {
    "Want to Read": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "Reading": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "Completed": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function BookCard({ book, onUpdateStatus, onDelete }: BookCardProps) {
    const dateStr = book.createdAt ? formatDistanceToNow(new Date(book.createdAt), { addSuffix: true }) : "";

    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-xl dark:shadow-none dark:hover:ring-white/20">
            <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-zinc-900 dark:text-zinc-50" title={book.title}>
                            {book.title}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-zinc-500/90 dark:text-zinc-400">
                            {book.author}
                        </p>
                    </div>
                    <div className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${statusColors[book.status]}`}>
                        {book.status}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-bold text-secondary-foreground"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                <div className="flex items-center gap-2">
                    <select
                        value={book.status}
                        onChange={(e) => onUpdateStatus(book._id, e.target.value as BookStatus)}
                        className="cursor-pointer rounded-xl border border-border bg-background py-1.5 px-3 text-xs font-bold text-foreground transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                        <option value="Want to Read">Want to Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button
                    onClick={() => onDelete(book._id)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-zinc-400 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                    title="Remove book"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <p className="absolute bottom-2 left-6 text-[9px] font-bold uppercase tracking-tighter text-zinc-300 dark:text-zinc-700">
                Added {dateStr}
            </p>
        </div>
    );
}
