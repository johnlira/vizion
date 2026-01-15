import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/protected-route";
import Navbar from "@/components/dashboard/navbar";
import ImagesContainer from "@/components/dashboard/images-container";

export const Route = createFileRoute("/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-zinc-50 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <ImagesContainer />
        </div>
      </div>
    </ProtectedRoute>
  );
}
