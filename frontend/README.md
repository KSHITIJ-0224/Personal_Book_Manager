# Personal Book Manager - Frontend

A professional, intuitive, and elegant web application for managing your personal book collection. Built with **Next.js 15**, **Tailwind CSS**, and **TypeScript**.

## 🚀 Application Flow

### 1. Authentication Layer
The application uses a centralized `AuthContext` to manage user sessions and state.
- **Registration/Login**: Users authenticate with the backend via JWT.
- **Token Management**: JWT tokens are securely stored in `localStorage` and managed through the `AuthContext` provider.
- **Implicit Protection**: The root layout is wrapped in the `AuthProvider`, ensuring auth state is consistent across all routes.

### 2. Route Protection
- **Client-Side Guards**: Routes are protected using `useEffect` hooks in page components.
- **Redirects**: Unauthenticated users are gracefully redirected to the `/login` page if they attempt to access protected resources.

### 3. Dashboard & Book Management
- **Centralized Fetching**: Books are fetched on component mount and synchronized across the UI.
- **CRUD Operations**: Users can Add, Update (Status), and Delete books through modular components:
    - `AddBookModal`: A clean, focused interface for submitting new book entries.
    - `BookCard`: Displays book metadata with real-time status updates via a specialized dropdown.
    - `Navbar`: Provides user info and session management (Logout).

### 4. API Service Layer
- **Standardized Fetching**: A custom `apiFetch` wrapper handles base URLs, authorization headers, and standardized error response parsing.
- **Defensive Error Handling**: Built-in guards prevent UI crashes by validating API response structures before updating state.


## 🚦 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

---
*Created with focus on clarity, aesthetics, and performance.*
