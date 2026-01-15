import { apiClient } from "./client";
import type { CreateUserInput, LoginInput, User } from "./types";

export const authService = {
  /**
   * Register a new user
   */
  async register(data: CreateUserInput): Promise<User> {
    const response = await apiClient.post<User>("/auth/register", data);
    return response.data;
  },

  /**
   * Login user
   */
  async login(data: LoginInput): Promise<User> {
    const response = await apiClient.post<User>("/auth/login", data);
    return response.data;
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  },
};
