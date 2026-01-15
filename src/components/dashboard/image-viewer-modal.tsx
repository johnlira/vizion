import type { Image } from "@/lib/api";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DownloadIcon, TrashIcon, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useImages } from "@/contexts/images-context";

interface ImageViewerModalProps {
  image: Image | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageViewerModal({
  image,
  open,
  onOpenChange,
}: ImageViewerModalProps) {
  const { deleteImage } = useImages();

  const handleDownload = async (image: Image) => {
    if (!image.url) {
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

  const handleDelete = async (image: Image) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      await deleteImage(image.id);
      toast.success("Image deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Error deleting image");
    }
  };

  if (!image) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-7xl w-full p-0 gap-0"
          showCloseButton={true}
        >
          <div className="relative w-full aspect-square max-h-[95vh] rounded-lg overflow-hidden bg-muted">
            {image.url ? (
              <img
                src={image.url}
                alt={image.originalName}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="size-16 text-muted-foreground" />
              </div>
            )}

            {/* Action buttons in corner */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                onClick={() => handleDownload(image)}
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              >
                <DownloadIcon className="size-4" />
                Download
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(image)}
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              >
                <TrashIcon className="size-4" />
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
