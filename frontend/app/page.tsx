"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import AddBookModal from "../components/AddBookModal";
import { Book, BookStatus } from "../types";
import { apiFetch } from "../services/api";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    } else if (user) {
      fetchBooks();
    }
  }, [user, authLoading, router]);

  const fetchBooks = async () => {
    try {
      const data = await apiFetch("/books");
      if (data && Array.isArray(data)) {
        setBooks(data);
      } else {
        console.warn("Expected an array of books, but received:", data);
        setBooks([]);
      }
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookData: { title: string; author: string; tags: string[]; status: BookStatus }) => {
    try {
      setLoading(true);
      console.log("Adding book:", bookData);
      const data = await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify(bookData),
      });
      console.log("Add book response:", data);
      setIsModalOpen(false);
      fetchBooks();
    } catch (err) {
      console.error("Failed to add book", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: BookStatus) => {
    try {
      await apiFetch(`/books/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      setBooks((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm("Are you sure you want to remove this book?")) return;
    try {
      await apiFetch(`/books/${id}`, {
        method: "DELETE",
      });
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Failed to delete book", err);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesStatus = filterStatus === "All" || book.status === filterStatus;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent dark:border-zinc-50"></div>
      </div>
    );
  }

  return (
    <div className="subtle-grid min-h-screen pb-20 font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 lg:text-5xl">
              Library
            </h1>
            <p className="mt-2 text-base font-semibold text-zinc-500">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} in your collection
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex rounded-2xl bg-secondary p-1 ring-1 ring-border shadow-sm">
              {['All', 'Want to Read', 'Reading', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${filterStatus === status
                      ? "bg-white text-black shadow-sm dark:bg-zinc-800 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-95 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Book
            </button>
          </div>
        </header>

        <section className="mt-12">
          <div className="relative max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search titles, authors..."
              className="block w-full rounded-2xl border border-border bg-card px-10 py-3 text-sm font-semibold text-foreground placeholder-zinc-400 transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {loading && !books.length ? (
          <div className="mt-24 flex flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-accent"></div>
            <p className="text-sm font-bold text-zinc-400">Syncing your library...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        ) : (
          <div className="mt-20 flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-border bg-secondary/20 py-32 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary text-zinc-300">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="mt-8 text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Empty Shelves</h3>
            <p className="mx-auto mt-3 max-w-[280px] text-base font-semibold text-zinc-500">
              {filterStatus === "All" && !searchQuery
                ? "Your library is ready for its first arrival."
                : `We couldn't find any matches for your current view.`}
            </p>
            {(filterStatus === "All" && !searchQuery) && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-10 rounded-2xl bg-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Add Your First Book
              </button>
            )}
          </div>
        )}
      </main>

      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBook}
        loading={loading}
      />
    </div>
  );
}
