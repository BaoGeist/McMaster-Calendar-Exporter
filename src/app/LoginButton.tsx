"use client";

import React, { useState } from "react";
import { supabaseBrowser } from "./lib/browser";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type LoginButtonProps = {
  className?: string;
};

const LoginButton = ({ className }: LoginButtonProps) => {
  const supabase = supabaseBrowser();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/",
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
  };

  return (
    <Button onClick={handleLogin} className={className ?? ""}>
      Log into Google
    </Button>
  );
};

export default LoginButton;
