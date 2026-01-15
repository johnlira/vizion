// API Response Types
export interface ApiResponse<T> {
  message: string;
  data: T;
}

// Error response format from API
export interface ApiErrorResponse {
  code: string;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

// Auth Types
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

// Image Types
export interface ImageDimensions {
  width: number;
  height: number;
  format: string;
}

export interface Image {
  id: string;
  userId: string;
  originalName: string;
  storageKey: string;
  mimeType: string;
  size: number;
  dimensions: ImageDimensions;
  createdAt: string;
  url?: string;
}
