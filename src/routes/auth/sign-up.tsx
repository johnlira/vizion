import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url(/src/assets/auth-bg.jpg)] bg-cover bg-center bg-no-repeat">
      <SignUpForm />
    </div>
  );
}
