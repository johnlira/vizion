import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "@/components/auth/sign-in-form";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url(/src/assets/auth-bg.jpg)] bg-cover bg-center bg-no-repeat">
      <SignInForm />
    </div>
  );
}
