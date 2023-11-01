"use client";
import SubjectsProvider from "../context/subjectsContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SubjectsProvider>{children}</SubjectsProvider>
    </SessionProvider>
  );
}
