import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { EyeIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[url(/src/assets/home-bg.png)] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center gap-8 p-10 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl max-w-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-4xl font-extrabold drop-shadow-md flex items-center gap-2">
              <EyeIcon className="w-10 h-10 text-primary" />
              <span>Vizion</span>
            </p>
          </div>
          <p className="text-lg max-w-md text-center italic text-foreground">
            Capture, organize, and rediscover your visual moments. Vizion brings
            all your images together in one beautiful, searchable space.
          </p>
        </div>
        <div className=" flex flex-col items-center gap-1">
          <Link to="/auth/sign-in">
            <Button className="w-full font-semibold">Get Started</Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Saving your images in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
