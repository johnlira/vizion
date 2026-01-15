import { apiClient } from "./client";
import type { Image } from "./types";

export const imagesService = {
  /**
   * Upload an image
   * @param file - Image file to upload (max 10MB)
   * @returns Image with presigned URL
   */
  async uploadImage(file: File): Promise<Image> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.postFormData<Image>("/images", formData);
    return response.data;
  },

  /**
   * Get all images for the current user
   */
  async getImages(): Promise<Image[]> {
    const response = await apiClient.get<Image[]>("/images");
    return response.data;
  },

  /**
   * Get a specific image by ID
   */
  async getImageById(id: string): Promise<Image> {
    const response = await apiClient.get<Image>(`/images/${id}`);
    return response.data;
  },

  /**
   * Delete an image
   */
  async deleteImage(id: string): Promise<void> {
    await apiClient.delete(`/images/${id}`);
  },
};
