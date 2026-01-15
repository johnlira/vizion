import { ImagePreview } from "./image-preview";
import type { Image } from "@/lib/api";

interface ImageGridProps {
  images: Image[];
}

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-6">
      {images.map((image) => (
        <ImagePreview key={image.id} image={image} />
      ))}
    </div>
  );
}
