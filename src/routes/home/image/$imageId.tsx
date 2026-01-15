import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/protected-route";
import Navbar from "@/components/dashboard/navbar";
import { useImages } from "@/contexts/images-context";
import { Button } from "@/components/ui/button";
import { DownloadIcon, TrashIcon, ImageIcon, ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

export const Route = createFileRoute("/home/image/$imageId")({
  component: ImagePage,
});

function ImagePage() {
  const { imageId } = Route.useParams();
  const navigate = useNavigate();
  const { images, deleteImage, loadImages } = useImages();
  const image = images.find((img) => img.id === imageId);

  useEffect(() => {
    if (images.length === 0) {
      loadImages();
    }
  }, [images.length, loadImages]);

  const handleDownload = async () => {
    if (!image?.url) {
      toast.error("Image URL not available");
      return;
    }

    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.originalName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Image downloaded successfully");
    } catch (error) {
      toast.error("Error downloading image");
    }
  };

  const handleDelete = async () => {
    if (!image) return;

    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      await deleteImage(image.id);
      toast.success("Image deleted successfully");
      navigate({ to: "/home" });
    } catch (error) {
      toast.error("Error deleting image");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!image) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col h-screen bg-zinc-50 overflow-hidden">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Loading image...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-zinc-50 overflow-hidden">
        <Navbar />
        <div className="flex-1 flex overflow-hidden">
          {/* Image Section - 4 parts (80%) */}
          <div className="flex-[4] h-full bg-muted flex items-center justify-center p-8">
            {image.url ? (
              <img
                src={image.url}
                alt={image.originalName}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center">
                <ImageIcon className="size-32 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Info Section - 1 part (20%) */}
          <div className="flex-[1] h-full bg-background border-l border-border overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => navigate({ to: "/home" })}
                className="w-full justify-start"
              >
                <ArrowLeftIcon className="size-4" />
                Back to Gallery
              </Button>

              {/* Image Info */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Image Details</h2>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-medium break-words">{image.originalName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Format</p>
                      <p className="font-medium">{image.dimensions.format.toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Dimensions</p>
                      <p className="font-medium">
                        {image.dimensions.width} × {image.dimensions.height}px
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Size</p>
                      <p className="font-medium">{formatFileSize(image.size)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Uploaded</p>
                      <p className="font-medium">{formatDate(image.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t">
                  <Button
                    variant="default"
                    onClick={handleDownload}
                    className="w-full"
                  >
                    <DownloadIcon className="size-4" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="w-full"
                  >
                    <TrashIcon className="size-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
