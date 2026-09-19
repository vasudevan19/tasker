import axiosInstance from "./axiosInstance";

let csrfToken: string | null = null;

export async function getCsrfToken(): Promise<string> {
    if (csrfToken) {
        return csrfToken;
    }

    const response = await axiosInstance.get("/csrf-token");

    const fetchedToken = response.data.csrf_token;

    if (!fetchedToken) {
        throw new Error("Failed to retrieve a valid CSRF token.");
    }

    csrfToken = fetchedToken;

    return fetchedToken;
}

export function clearCsrfToken(): void {
    csrfToken = null;
}