import { useImages } from "@/contexts/images-context";
import { ImageGrid } from "./image-grid";
import { ImageEmptyState } from "./image-empty-state";
import { ImageLoadingState } from "./image-loading-state";

export default function ImagesContainer() {
  const { filteredImages, isLoading } = useImages();

  if (isLoading) {
    return <ImageLoadingState />;
  }

  if (filteredImages.length === 0) {
    return <ImageEmptyState />;
  }

  return <ImageGrid images={filteredImages} />;
}
