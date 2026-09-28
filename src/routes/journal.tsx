import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  beforeLoad: () => {
    throw redirect({ to: "/blogs" });
  },
  component: () => null,
});
