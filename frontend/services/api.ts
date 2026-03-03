const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL.replace(/\/$/, "")}/api`;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const contentType = response.headers.get("content-type");
    let data;

    try {
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            const text = await response.text();
            data = { message: text || "Internal Server Error" };
        }
    } catch (parseError) {
        console.error("Parse error in apiFetch:", parseError);
        data = { message: "Error parsing server response" };
    }

    if (!response.ok) {
        const errorMessage = data?.message || `Error: ${response.status}`;
        throw new Error(errorMessage);
    }

    return data;
};
