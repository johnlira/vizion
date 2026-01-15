"use client";

import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  createContext,
  type ReactNode,
} from "react";
import { imagesService } from "@/lib/api";
import type { Image } from "@/lib/api";
import { ApiError } from "@/lib/api/client";

interface ImagesContextType {
  images: Image[];
  filteredImages: Image[];
  searchQuery: string;
  isLoading: boolean;
  error: Error | null;
  setSearchQuery: (query: string) => void;
  loadImages: () => Promise<void>;
  uploadImage: (file: File) => Promise<Image>;
  deleteImage: (id: string) => Promise<void>;
  refreshImages: () => Promise<void>;
}

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export function ImagesProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Image[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadImages = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const loadedImages = await imagesService.getImages();
      setImages(loadedImages);
    } catch (err) {
      const error = err instanceof ApiError ? err : new Error("Failed to load images");
      setError(error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const filteredImages = useMemo(() => {
    if (!searchQuery.trim()) {
      return images;
    }
    const query = searchQuery.toLowerCase().trim();
    return images.filter((image) =>
      image.originalName.toLowerCase().includes(query)
    );
  }, [images, searchQuery]);

  const uploadImage = useCallback(async (file: File): Promise<Image> => {
    try {
      setError(null);
      const newImage = await imagesService.uploadImage(file);
      setImages((prev) => [newImage, ...prev]);
      return newImage;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
        throw err;
      }
      const error = new Error("Failed to upload image");
      setError(error);
      throw error;
    }
  }, []);

  const deleteImage = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      await imagesService.deleteImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
        throw err;
      }
      const error = new Error("Failed to delete image");
      setError(error);
      throw error;
    }
  }, []);

  const refreshImages = useCallback(async () => {
    await loadImages();
  }, [loadImages]);

  const value: ImagesContextType = useMemo(
    () => ({
      images,
      filteredImages,
      searchQuery,
      isLoading,
      error,
      setSearchQuery,
      loadImages,
      uploadImage,
      deleteImage,
      refreshImages,
    }),
    [
      images,
      filteredImages,
      searchQuery,
      isLoading,
      error,
      loadImages,
      uploadImage,
      deleteImage,
      refreshImages,
    ]
  );

  return (
    <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImagesContext);
  if (context === undefined) {
    throw new Error("useImages must be used within an ImagesProvider");
  }
  return context;
}
