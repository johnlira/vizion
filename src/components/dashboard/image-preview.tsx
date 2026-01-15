import { Link } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import type { Image } from "@/lib/api";

interface ImagePreviewProps {
  image: Image;
}

export function ImagePreview({ image }: ImagePreviewProps) {
  return (
    <Link
      to="/home/image/$imageId"
      params={{ imageId: image.id }}
      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-muted block"
    >
      {image.url ? (
        <img
          src={image.url}
          alt={image.originalName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ImageIcon className="size-8 text-muted-foreground" />
        </div>
      )}
    </Link>
  );
}
