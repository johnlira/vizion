import type { ApiErrorResponse, ApiResponse } from "./types";

type ValidationError = { field: string; message: string };

export class ApiError extends Error {
  code: string;
  status: number;
  errors: ValidationError[] | undefined;

  constructor(
    message: string,
    code: string,
    status: number,
    errors?: ValidationError[]
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.errors = errors;
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Important: sends cookies (httpOnly JWT)
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json().catch(() => ({
          code: "UNKNOWN_ERROR",
          message: response.statusText || "An error occurred",
        }));

        throw new ApiError(
          errorData.message,
          errorData.code,
          response.status,
          errorData.errors
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Network or other errors
      throw new ApiError(
        error instanceof Error ? error.message : "Network error",
        "NETWORK_ERROR",
        0
      );
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  async postFormData<T>(
    endpoint: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      method: "POST",
      headers: {
        // Don't set Content-Type, let browser set it with boundary
      },
      credentials: "include",
      body: formData,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json().catch(() => ({
          code: "UNKNOWN_ERROR",
          message: response.statusText || "An error occurred",
        }));

        throw new ApiError(
          errorData.message,
          errorData.code,
          response.status,
          errorData.errors
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        error instanceof Error ? error.message : "Network error",
        "NETWORK_ERROR",
        0
      );
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
