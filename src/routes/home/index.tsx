import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";

export const Route = createFileRoute("/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { logout, user } = useUser();
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Home</h1>
        <p className="text-sm text-muted-foreground">Welcome, {user?.email}</p>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </ProtectedRoute>
  );
}
