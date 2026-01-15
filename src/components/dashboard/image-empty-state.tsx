import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { ImageIcon } from "lucide-react";

export function ImageEmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ImageIcon className="size-6" />
          </EmptyMedia>
          <EmptyTitle>No images found</EmptyTitle>
          <EmptyDescription>
            No images were found to display.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
