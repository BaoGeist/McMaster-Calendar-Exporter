import { useState } from "react";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <HomePage />
    </main>
  );
}
