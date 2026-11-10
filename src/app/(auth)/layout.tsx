import { getCurrentUser } from "@/server-actions/auth/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/account");
  }
  return <>{children}</>;
}
